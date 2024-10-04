from django.db import models
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _
from products.models import Product, ProductVariation
from decimal import Decimal
import uuid


User = get_user_model()


class BillingInfo(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='billing_info')
    company_name = models.CharField(max_length=255, null=True, blank=True)
    address = models.CharField(max_length=255)
    country = models.CharField(max_length=100)
    region_state = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    zip_code = models.CharField(max_length=20)
    email = models.EmailField()
    phone_number = models.CharField(max_length=20)


class ShippingInfo(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    reciepient_first_name = models.CharField(max_length=100)
    reciepient_last_name = models.CharField(max_length=100)
    address = models.CharField(max_length=255)
    country = models.CharField(max_length=100)
    region_state = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    zip_code = models.CharField(max_length=20)
    email = models.EmailField()
    phone_number = models.CharField(max_length=20)


class ContactInfo(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email_address = models.EmailField()
    phone_number = models.CharField(max_length=20)
    preferred_contact_method = models.CharField(max_length=50)
    best_time_to_contact = models.CharField(
        max_length=50, blank=True, null=True)


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
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='orders', default=None)
    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES, default='pending')
    billing_info = models.ForeignKey(
        BillingInfo, on_delete=models.CASCADE, null=True, blank=True)
    shipping_info = models.ForeignKey(
        ShippingInfo, on_delete=models.CASCADE, null=True, blank=True)
    contact_info = models.ForeignKey(
        ContactInfo, on_delete=models.CASCADE, null=True, blank=True)
    payment_method = models.CharField(
        max_length=50, choices=PAYMENT_METHOD_CHOICES, null=True, blank=True)
    total_amount = models.DecimalField(
        max_digits=10, decimal_places=2, default=Decimal('0.00'))
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
    order = models.ForeignKey(
        Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    variation = models.ForeignKey(
        ProductVariation, on_delete=models.CASCADE, null=True, blank=True)
    quantity = models.PositiveIntegerField(default=1)
    price_at_purchase = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.product.title} ({self.variation.value if self.variation else ''})"

    def calculate_total(self):
        # Calculate total price based on quantity
        total_price = self.price_at_purchase * self.quantity

        # Apply discount if 5 or more items are purchased
        if self.quantity >= 5:
            discount = Decimal('0.10')  # Example: 10% discount
            total_price -= total_price * discount

        return total_price

    def save(self, *args, **kwargs):
        # Save the item and update the order total
        super().save(*args, **kwargs)
        self.order.update_total_amount()
