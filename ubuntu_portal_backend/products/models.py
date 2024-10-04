from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model
import uuid
from django.core.exceptions import ValidationError


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
    rating = models.FloatField(default=0.0)
    image = models.ImageField(upload_to='products/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

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
                    # Apply the discount percentage
                    discounted_price = self.price * (1 - (discount / 100))
                    return discounted_price

            # Handle cases where the tier is a single quantity
            elif int(tier) <= quantity:
                discounted_price = self.price * (1 - (discount / 100))
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
