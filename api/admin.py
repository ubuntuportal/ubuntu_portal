from django.contrib import admin
from .models import Product

class ProductAdmin(admin.ModelAdmin):
    # Specify the fields to display in the list view
    list_display = ('id', 'title', 'description', 'price', 'created_at', 'updated_at')

    # Optional: Add search fields to allow searching in the admin interface
    search_fields = ('title', 'description')

    # Optional: Add filter options in the admin interface
    list_filter = ('created_at', 'updated_at')

# Register the Product model with the custom admin configuration
admin.site.register(Product, ProductAdmin)
