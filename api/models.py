from django.db import models
from django.contrib.auth import get_user_model

# Create your models here.

User = get_user_model()
class Product(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    seller = models.ForeignKey(User, on_delete=models.CASCADE, related_name='products', default=1)
    category = models.ManyToManyField('Category', related_name='products')
    rating = models.FloatField(default=0.0)
    image = models.ImageField(upload_to='products/', null=True, blank=True)  # Add image field
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        indexes = [
            models.Index(fields=['price']),
            models.Index(fields=['title', 'description']),
        ]


class Category(models.Model):
    name = models.CharField(max_length=255)
    # product = models.ManyToManyField(Product, related_name='categories')

    class Meta:
        indexes = [
            models.Index(fields=['name']),
        ]

    def __str__(self):
        return self.name

class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='cart')

    def __str__(self):
        return f"Cart of {self.user.first_name}"

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    variation = models.ForeignKey(ProductVariation, on_delete=models.SET_NULL, null=True, blank=True)
    quantity = models.PositiveIntegerField(default=1)

    @property
    def total_price(self):
        base_price = self.product.price
        variation_price = self.variation.additional_price if self.variation else 0
        return (base_price + variation_price) * self.quantity  


    def __str__(self):
        return f"{self.product.title} x {self.quantity} pcs"
