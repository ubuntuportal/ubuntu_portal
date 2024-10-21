from django.db import models
from django.contrib.auth import get_user_model
from products.models import Product
from django.core.exceptions import ValidationError
from .constants import MEASUREMENT_CHOICES, STATUS_CHOICE
from django.db import transaction
import logging
import uuid


User = get_user_model()
logger = logging.getLogger(__name__)


class RFQ(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    buyer = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='buyer_rfq')
    rfq_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(
        max_length=20, choices=STATUS_CHOICE, default='Pending')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    sourcing_quantity = models.IntegerField()
    quantities_measurements = models.CharField(
        max_length=255, choices=MEASUREMENT_CHOICES, default='pieces')
    detailed_requirements = models.TextField()
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    media = models.FileField(upload_to='medial/', blank=True, null=True)
    suppliers_notified = models.ManyToManyField(User, blank=True)

    class Meta:
        indexes = [
            models.Index(fields=['product', 'buyer', 'rfq_date'])
        ]
        ordering = ['-rfq_date']
    
    def save(self, *args, **kwargs):
        if self.status not in dict(STATUS_CHOICE):
            raise ValueError('Invalid status provided')
        super().save(*args, **kwargs)

    def clean(self):
        # Ensuring sourcing quantity is non-negative
        if self.sourcing_quantity < 0:
            raise ValidationError(
                {'sourcing_quantity': 'Sourcing quantity must not be a non-negative value.'})

        if self.unit_price < 0:
            raise ValidationError(
                {'unit_price': 'Unit price must be a non-negative value.'})

        if self.quantities_measurements not in MEASUREMENT_CHOICES:
            raise ValidationError(
                {'quantities_measurements': 'Invalid measurement for this product.'})

    def __str__(self):
        return f"RFQ for {self.product} by Buyer {self.buyer}"

    def get_buyer_country(self):
        """Return the buyer's country from their profile or user model"""
        try:
            return self.buyer.country
        except AttributeError:
            return "Unknown"

    async def notify_suppliers(self):
        """Trigger real-time notification to relevant suppliers, including"""
        from channels.layers import get_channel_layer
        from asgiref.sync import sync_to_async

        channel_layer = get_channel_layer()
        suppliers = await sync_to_async(self.get_relevant_suppliers)()

        buyer_country = await sync_to_async(self.get_buyer_country)()

        for supplier in suppliers:
            await sync_to_async(self.suppliers_notified.add)(supplier)
            try:
                await channel_layer.group_send(
                    f"supplier_{supplier.id}",
                    {
                        'type': 'send_notification',
                        'notification': f"{self.rfq_date} {self.id} {self.product.title} {buyer_country}"
                    }
                )
            except Exception as e:
                logger.error(f"Error sending notification to supplier {supplier.id}: {e}")

    def get_relevant_suppliers(self):
        """Return a list of suppliers who can supply the requested product"""
        return User.objects.filter(
            role='Seller',
            country=self.get_buyer_country(),
            products__category__in=self.product.category.all()
        ).distinct()


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
    status = models.IntegerField(
        choices=STATUS_CHOICES, default=QUOTED, db_index=True)
    rfq = models.ForeignKey(RFQ, on_delete=models.CASCADE,
                            related_name='quotations')
    seller = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='quotations', null=True, blank=True)
    quotation_date = models.DateField(auto_now_add=True)
    quoted_price_per_unit = models.DecimalField(
        max_digits=10, decimal_places=2)
    delivery_time = models.DateField()
    total_price = models.DecimalField(max_digits=15, decimal_places=2)
    additional_notes = models.TextField(null=True, blank=True)
    attachments = models.FileField(
        upload_to='quotation_attachments/', null=True, blank=True)

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
        with transaction.atomic():
            if not self.total_price:
                self.calculate_total_price()
        super().save(*args, **kwargs)
