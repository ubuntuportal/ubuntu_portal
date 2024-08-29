from django.db import models
from django.contrib.auth import get_user_model
from products.models import Product
from django.core.exceptions import ValidationError
import uuid


User = get_user_model()

class RFQ(models.Model):

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

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    buyer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='buyer_rfq')
    rfq_date =models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)  # Use ForeignKey to Product instead of product_name
    sourcing_quantity = models.IntegerField()
    quantities_measurements = models.CharField(max_length=255, choices=MEASUREMENT_CHOICES, default='pieces')
    detailed_requirements = models.TextField()
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    media = models.FileField(upload_to='medial/', blank=True, null=True)

    class Meta:
        indexes = [
            models.Index(fields=['product', 'buyer', 'rfq_date'])
        ]

    def clean(self):
        super.clean()

        # Ensuring sourcing quantity is non-negative
        if self.sourcing_quantity < 0:
            raise ValidationError({'sourcing_quantity': 'Sourcing quantity must be a non-negative value.'})

        if self.unit_price < 0:
            raise ValidationError({'unit_price': 'Unit price must be a non-negative value.'})

    def __str__(self):
        return f"RFQ for {self.product} by Buyer {self.buyer}"



class Quotation(models.Model):
    QUOTED = 1
    REJECTED = 2
    ACCEPTED = 3

    STATUS_CHOICES = [
        (QUOTED, 'Quoted'),
        (REJECTED, 'Rejected'),
        (ACCEPTED, 'Accepted'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    status = models.IntegerField(choices=STATUS_CHOICES, default=QUOTED, db_index=True)
    rfq = models.ForeignKey(RFQ, on_delete=models.CASCADE, related_name='quotations')
    seller = models.ForeignKey(User, on_delete=models.CASCADE, related_name='quotations', null=True, blank=True)
    quotation_date = models.DateField(auto_now_add=True)
    quoted_price_per_unit = models.DecimalField(max_digits=10, decimal_places=2)
    delivery_time = models.DateField()
    total_price = models.DecimalField(max_digits=15, decimal_places=2)
    additional_notes = models.TextField(null=True, blank=True)
    attachments = models.FileField(upload_to='quotation_attachments/', null=True, blank=True)

    class Meta:
        indexes = [
            models.Index(fields=['rfq', 'quotation_date']),
        ]

    def __str__(self):
        return f"Quotation {self.id} for RFQ {self.rfq.id}"


    def calculate_total_price(self):
        self.total_price = self.quoted_price_per_unit * self.rfq.sourcing_quantity
        self.save(update_fields=['total_price'])

    def save(self, *args, **kwargs):
        if not self.total_price:
            self.calculate_total_price()
        super().save(*args, **kwargs)
