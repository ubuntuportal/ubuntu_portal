from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model
import uuid
from django.core.exceptions import ValidationError
from decimal import Decimal, ROUND_HALF_UP


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
        price = Decimal(self.price)  # Ensure price is Decimal
        applicable_discount = 0

        # print(f"Original Price: {price}")

        for tier, discount in self.discount_tiers.items():
            if isinstance(tier, str) and '-' in tier:
                lower, upper = map(int, tier.split('-'))
                if lower <= quantity <= upper:
                    applicable_discount = max(applicable_discount, discount)
            elif isinstance(tier, int):
                if quantity >= tier:
                    applicable_discount = max(applicable_discount, discount)

        # print(f"Applicable Discount: {applicable_discount}")

        # Apply the largest applicable discount
        price -= (price * Decimal(applicable_discount) / Decimal(100))
        # print(f"Discounted Price: {price}")

        # Ensure proper rounding (to 2 decimal places for currency)
        final_price = price.quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)
        # print(f"Final Price (rounded): {final_price}")

        return final_price


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
