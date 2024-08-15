from django.contrib import admin
from .models import Product, Category, Order, OrderItem, ProductVariation, Cart, CartItem

class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'description', 'price', 'created_at', 'updated_at')
    search_fields = ('title', 'description')
    list_filter = ('created_at', 'updated_at')

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)

class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'status', 'shipping_address', 'payment_method', 'total_amount', 'created_at')
    search_fields = ('user__email', 'status', 'shipping_address', 'payment_method')
    list_filter = ('status', 'payment_method', 'created_at')

class OrderItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'order', 'product', 'variation', 'quantity', 'price_at_purchase', 'created_at')
    search_fields = ('order__id', 'product__title', 'variation__name')
    list_filter = ('created_at',)

class ProductVariationAdmin(admin.ModelAdmin):
    list_display = ('id', 'product', 'attribute', 'value', 'price_modifier', 'stock')
    search_fields = ('product__title', 'attribute', 'value')
    list_filter = ('product',)

class CartAdmin(admin.ModelAdmin):
    list_display = ('id', 'user')
    search_fields = ('user__email',)
    list_filter = ('user',)

class CartItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'cart', 'product', 'variation', 'quantity')
    search_fields = ('cart__user__email', 'product__title', 'variation__value')
    list_filter = ('cart__user', 'product')

# Register the models with their respective admin configurations
admin.site.register(Product, ProductAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Order, OrderAdmin)
admin.site.register(OrderItem, OrderItemAdmin)
admin.site.register(ProductVariation, ProductVariationAdmin)
admin.site.register(Cart, CartAdmin)
admin.site.register(CartItem, CartItemAdmin)
