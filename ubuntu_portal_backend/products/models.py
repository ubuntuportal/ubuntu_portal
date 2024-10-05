from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model
import uuid
from decimal import Decimal
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
        Returns the price of a product given a quantity.

        This method takes into account any applicable discounts from the product's
        discount tiers.

        :param quantity: The quantity of the product to calculate the price for.
        :type quantity: int
        :return: The price of the product given the quantity.
        :rtype: decimal.Decimal
        """
        price = self.price
        applicable_discount = 0  # Keep track of the largest applicable discount

        for tier, discount in self.discount_tiers.items():
            if isinstance(tier, str) and '-' in tier:  # Handle range tiers like "6-10"
                lower, upper = map(int, tier.split('-'))
                if lower <= quantity <= upper:
                    applicable_discount = max(applicable_discount, discount)
            # Handle single-value tiers like {5: 10}
            elif isinstance(tier, int):
                if quantity >= tier:
                    applicable_discount = max(applicable_discount, discount)

        # Apply the largest applicable discount
        price -= (price * applicable_discount / 100)
        return price


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

        # Validate that stock is not negative

        if self.stock < 0:
            raise ValidationError("Stock cannot be negative")

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)
