from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model
import uuid
from decimal import Decimal
from django.core.exceptions import ValidationError
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db.models import F, Avg, Max, ExpressionWrapper, DecimalField
from math import log
from django.utils import timezone
from rfqs.constants import MAX_VIEW

# Get the user model
User = get_user_model()


class Category(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255, unique=True)
    parent = models.ForeignKey('self', on_delete=models.CASCADE,
                               null=True, blank=True, related_name='subcategories')

    class Meta:
        indexes = [
            models.Index(fields=['name']),
        ]
        verbose_name_plural = "Categories"
        ordering = ['name']

    def __str__(self):
        return self.name


class Product(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    description = models.TextField()
    stock = models.PositiveIntegerField(default=0)
    price = models.DecimalField(max_digits=10, decimal_places=2)  # Base price
    seller = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='products', default=1)

    manufactured_country = models.CharField(
        max_length=100, null=True, blank=True)

    category = models.ManyToManyField(Category, related_name='products')
    # rating = models.FloatField(validators=[MinValueValidator(0.0), MaxValueValidator(5.0)], default=0.0)
    image = models.ImageField(upload_to='products/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    views_count = models.PositiveIntegerField(default=0)
    reviews_count = models.PositiveIntegerField(default=0)
    sales_count = models.PositiveIntegerField(default=0)

    # Add discount tiers for quantity-based pricing
    # Stores quantity-based price tiers
    discount_tiers = models.JSONField(default=dict, blank=True)

    def __str__(self):
        return self.title

    class Meta:
        indexes = [
            models.Index(fields=['price']),
            models.Index(fields=['title', 'description']),
        ]

    @staticmethod
    def get_max_views(count_type):

        if count_type == 'views_count':
            return Product.objects.aggregate(max_views=Max('views_count'))['max_views'] or 1
        elif count_type == 'sales_count':
            return Product.objects.aggregate(max_sales=Max('sales_count'))['max_sales'] or 1
        elif count_type == 'reviews_count':
            return Product.objects.aggregate(max_reviews=Max('reviews_count'))['max_reviews'] or 1
        else:
            raise ValueError(
                "Invalid count_type. Must be 'views', 'sales', or 'reviews'.")
            
    @staticmethod
    def calculate_score(queryset):
        """
        Annotate queryset with calculated scores.
        """
        max_views = Product.get_max_views('views_count')
        max_sales = Product.get_max_views('sales_count')
        max_reviews = Product.get_max_views('reviews_count')
        
        # Calculate the recency by date
        recency_expr = ExpressionWrapper(
            1 - ((timezone.now() - F('created_at')).days / 30),
            output_field=DecimalField(max_digits=10, decimal_places=2)
        )
        
        return queryset.annotate(
            recency_score=recency_expr,
            popularity_score=ExpressionWrapper(
                (
                    F('reviews_count') / max_sales +
                    F('sales_count') / max_reviews +
                    ((log(1 + F('views_count')) / log(1 + max_views))
                        if max_views >= MAX_VIEW else F('views_count') / max_views)
                ),
                output_field=DecimalField(max_digits=10, decimal_places=2)
            ),
            rating_score=Avg('reviews__rating'),
            stock_score=ExpressionWrapper(
                F('stock'), output_field=DecimalField(max_digits=10, decimal_places=2)
            ),

            # Calcuate the total score
            total_score=ExpressionWrapper(
                recency_expr * 0.2 +
                F('popularity_score') * 0.5 +
                F('rating_score') * 0.2 +
                F('stock_score') * 0.1,
                output_field=DecimalField(max_digits=10, decimal_places=2)
            )
        )

    def get_price_by_quantity(self, quantity):
        """
        Calculate the price based on the quantity and discount tiers.
        """
        # Iterate through discount tiers to apply the correct discount
        for tier, discount in self.discount_tiers.items():
            # Split the range string (e.g., '5-10') into min_qty and max_qty
            if '-' in tier:
                min_qty, max_qty = tier.split('-')
                min_qty = int(min_qty.strip())
                max_qty = int(max_qty.strip())

                # Check if the quantity falls within this range
                if min_qty <= quantity <= max_qty:
                    # Convert discount to Decimal and calculate discounted price
                    discounted_price = self.price * \
                        (Decimal(1) - (Decimal(discount) / Decimal(100)))
                    return discounted_price

            # Handle cases where the tier is a single quantity
            elif int(tier) <= quantity:
                discounted_price = self.price * \
                    (Decimal(1) - (Decimal(discount) / Decimal(100)))
                return discounted_price

        # If no discount applies, return the regular price
        return self.price


class ProductVariation(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name='variations')
    attribute = models.CharField(max_length=255)
    value = models.CharField(max_length=255)
    price_modifier = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True)
    stock = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.attribute}: {self.value}"

    def clean(self):
        # Validate that price_modifier is not negative
        if self.price_modifier is not None and self.price_modifier < 0:
            raise ValidationError("Price modifier cannot be negative.")

        # Validate that price_modifier is not zero
        if self.price_modifier == 0:
            raise ValidationError("Price modifier cannot be zero.")


class Review(models.Model):
    product = models.ForeignKey(
        Product, related_name='reviews', on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.FloatField(
        validators=[MinValueValidator(0.0), MaxValueValidator(5.0)], default=0.0)
    comment = models.TextField()
    date_added = models.DateTimeField(auto_now_add=True)
