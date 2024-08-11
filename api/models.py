from django.db import models
from django.contrib.auth import get_user_model

# Create your models here.

User = get_user_model()
class Product(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    seller = models.ForeignKey(User, on_delete=models.CASCADE, related_name='products', default=1)
    image = models.ImageField(upload_to='products/', null=True, blank=True)  # Add image field
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
