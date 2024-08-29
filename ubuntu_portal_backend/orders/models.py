from django.db import models
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _
from products.models import Product, ProductVariation
from decimal import Decimal
import uuid


User = get_user_model()

class Order(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    STATUS_CHOICES = [
        ('pending', _('Pending')),
        ('processing', _('Processing')),
        ('shipped', _('Shipped')),
        ('completed', _('Completed')),
        ('canceled', _('Canceled')),
    ]
    PAYMENT_METHOD_CHOICES = [
        ('credit_card', _('Credit Card')),
        ('paypal', _('PayPal')),
        ('bank_transfer', _('Bank Transfer')),
        ('cash_on_delivery', _('Cash on Delivery')),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    shipping_address = models.CharField(max_length=255, null=True, blank=True)
    payment_method = models.CharField(max_length=50, choices=PAYMENT_METHOD_CHOICES, null=True, blank=True)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, default=Decimal('0.00'))
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order {self.id} by {self.user.email}"

    def update_total_amount(self):
        total = Decimal('0.00')
        for item in self.items.all():
            total += item.calculate_total()
        self.total_amount = total
        self.save(update_fields=['total_amount'])



class OrderItem(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    variation = models.ForeignKey(ProductVariation, on_delete=models.CASCADE, null=True, blank=True)
    quantity = models.PositiveIntegerField(default=1)
    price_at_purchase = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.product.title} ({self.variation.value if self.variation else ''})"

    def calculate_total(self):
        if self.product:
            total_price = self.price_at_purchase
        elif self.variation:
            total_price = self.price_at_purchase + self.variation.price_modifier
        else:
            total_price = Decimal('0.00')

        return total_price * self.quantity

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        self.order.update_total_amount()


