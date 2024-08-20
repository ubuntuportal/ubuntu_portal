from django.db import models
from django.utils.translation import gettext_lazy as _
from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
import uuid
# from django.db.models.signals import post_save
# from django.dispatch import receiver
from decimal import Decimal

# Get the user model
User = get_user_model()

class Category(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)

    class Meta:
        indexes = [
            models.Index(fields=['name']),
        ]

    def __str__(self):
        return self.name

class Product(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    description = models.TextField()
    stock = models.PositiveIntegerField(default=0)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    seller = models.ForeignKey(User, on_delete=models.CASCADE, related_name='products', default=1)
    category = models.ManyToManyField(Category, related_name='products')
    rating = models.FloatField(default=0.0)
    image = models.ImageField(upload_to='products/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        indexes = [
            models.Index(fields=['price']),
            models.Index(fields=['title', 'description']),
        ]

class ProductVariation(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='variations')
    attribute = models.CharField(max_length=255)
    value = models.CharField(max_length=255)
    price_modifier = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    stock = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.attribute}: {self.value}"

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

    # def update_total_amount(self):
    #     total = Decimal('0.00')
    #     for item in self.items.all():
    #         item_total = Decimal(item.price_at_purchase)
    #         if item.variation and item.variation.price_modifier:
    #             item_total += Decimal(item.variation.price_modifier)
    #         item_total *= Decimal(item.quantity)
    #         total += item_total
    #     self.total_amount = total
    #     self.save(update_fields=['total_amount'])
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

    # def save(self, *args, **kwargs):
    #     if not self.price_at_purchase:
    #         self.price_at_purchase = self.product.price
    #     super().save(*args, **kwargs)
    #     if not kwargs.get('update_fields'):
    #         self.order.update_total_amount()

# Register the signal after defining the OrderItem model
# @receiver(post_save, sender=OrderItem)
# def update_order_total(sender, instance, **kwargs):
#     instance.order.update_total_amount()

class Cart(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='cart')

class CartItem(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    variation = models.ForeignKey(ProductVariation, on_delete=models.SET_NULL, null=True, blank=True)
    quantity = models.PositiveIntegerField(default=1)

    def get_total_price(self):
        price = self.variation.price if self.variation else self.product.price
        return price * self.quantity


class BuyerRFQ(models.Model):
    
    # Measurements choices
    MEASUREMENT_CHOICES = [
        ('pieces', 'pieces'),
        ('kg', 'kilograms'),
        ('liters', 'liters'),
        ('meters', 'meters'),
        ('boxes', 'boxes'),
        ('acres', 'acres'),
        ('amperes', 'amperes'),
        ('bags', 'bags'),
        ('barrels', 'barrels'),
        ('blades', 'blades'),
        ('bushels', 'bushels'),
        ('carats', 'carats'),
        ('cartons', 'cartons'),
        ('cases', 'cases'),
        ('centimeters', 'centimeters'),
        ('chains', 'chains'),
        ('combos', 'combos'),
        ('cubic centimeters', 'cubic centimeters'),
        ('cubic feet', 'cubic feet'),
        ('cubic inches', 'cubic inches'),
        ('cubic meters', 'cubic meters'),
        ('cubic yards', 'cubic yards'),
        ('celsius', 'Celsius'),
        ('fahrenheit', 'Fahrenheit'),
        ('dozens', 'dozens'),
        ('drams', 'drams'),
        ('fluid ounces', 'fluid ounces'),
        ('feet', 'feet'),
        ('forty-foot container', 'forty-foot container'),
        ('furlongs', 'furlongs'),
        ('gallons', 'gallons'),
        ('gills', 'gills'),
        ('grains', 'grains'),
        ('grams', 'grams'),
        ('gross', 'gross'),
        ('hectares', 'hectares'),
        ('hertz', 'hertz'),
        ('inches', 'inches'),
        ('kiloamperes', 'kiloamperes'),
        ('kilohertz', 'kilohertz'),
        ('kiloohms', 'kiloohms'),
        ('kilovolts', 'kilovolts'),
        ('kilowatts', 'kilowatts'),
        ('liters', 'liters'),
        ('long tons', 'long tons'),
        ('megahertz', 'megahertz'),
        ('metric tons', 'metric tons'),
        ('miles', 'miles'),
        ('milliamperes', 'milliamperes'),
        ('milligrams', 'milligrams'), 
        ('millihertz', 'millihertz'),
        ('milliliters', 'milliliters'),
        ('millimeters', 'millimeters'),
        ('milliohms', 'milliohms'),
        ('millivolts', 'millivolts'),
        ('milliwatts', 'milliwatts'),
        ('nauctical miles', 'nautical miles'),
        ('ohms', 'ohms'),
        ('ounces', 'ounces'),
        ('packs', 'packs'),
        ('pairs', 'pairs'),
        ('pallets', 'pallets'),
        ('parcels', 'parcels'),
        ('perches', 'perches'),
        ('pieces', 'pieces'),
        ('pints', 'pints'),
        ('plants', 'plants'),
        ('poles', 'poles'),
        ('pounds', 'pounds'),
        ('quarts', 'quarts'),
        ('quarters', 'quarters'),
        ('rods', 'rods'),
        ('rolls', 'rolls'),
        ('sets', 'sets'),
        ('sheets', 'sheets'),
        ('short tons', 'short tons'),
        ('square centimeters', 'square centimeters'),
        ('square feet', 'square feet'),
        ('square inches', 'square inches'),
        ('square meters', 'square meters'),
        ('square miles', 'square miles'),
        ('square yards', 'square yards'),
        ('stones', 'stones'),
        ('strands', 'strands'),
        ('tons', 'tons'),
        ('tonnes', 'tonnes'),
        ('trays', 'trays'),
        ('twenty-foot container', 'twenty-foot container'),
        ('units', 'units'),
        ('volts', 'volts'),
        ('watts', 'watts'),
        ('Wp', 'Wp'),
        ('yards', 'yards')
    ]
    
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Approved', 'Approved'),
        ('Rejected', 'Rejected'),
    ]
    
    buyer_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='buyer_rfq')
    rfq_date = models.DateField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')
    product_name = models.CharField(max_length=255, blank=False)
    sourcing_quantity = models.IntegerField()
    quantities_measurements = models.CharField(max_length=255, choices=MEASUREMENT_CHOICES, default='pieces')
    detailed_requirements = models.TextField()
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    media = models.FileField(upload_to='medial/', blank=True, null=True)
    
    class Meta:
        indexes = [
            models.Index(fields=['product_name', 'buyer_id', 'rfq_date'])
        ]
    
    def clean(self):
        super.clean()
        
        # Ensuring sourcing quantity is non-negative
        if self.sourcing_quantity < 0:
            raise ValidationError({'sourcing_quantity': 'Sourcing quantity must be a non-negative value.'})
        
        if self.unit_price < 0:
            raise ValidationError({'unit_price': 'Unit price must be a non-negative value.'})
    
    def __str__(self):
        return f"RFQ for {self.product_name} by Buyer {self.buyer_id}"
    