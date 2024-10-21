from django.contrib import admin
from products.models import Product, Category, ProductVariation
from carts.models import Cart, CartItem
from orders.models import Order, OrderItem
from rfqs.models import RFQ, Quotation


class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'description', 'price', 'stock',
                    'manufactured_country', 'discount_tiers', 'created_at', 'updated_at')
    search_fields = ('title', 'description')
    list_filter = ('created_at', 'updated_at')


class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)


class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'status', 'shipping_info', 'billing_info',
                    'contact_info', 'payment_method', 'total_amount', 'created_at')
    search_fields = ('user__email', 'status', 'shipping_info',
                     'billing_info', 'contact_info', 'payment_method')
    list_filter = ('status', 'payment_method', 'created_at')


class OrderItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'order', 'product', 'variation',
                    'quantity', 'price_at_purchase', 'created_at')
    search_fields = ('order__id', 'product__title', 'variation__name')
    list_filter = ('created_at',)


class ProductVariationAdmin(admin.ModelAdmin):
    list_display = ('id', 'product', 'attribute',
                    'value', 'price_modifier', 'stock')
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

# Admin configuration for RFQ


class RFQAdmin(admin.ModelAdmin):
    list_display = ('id', 'buyer_id', 'rfq_date', 'status',
                    'product', 'sourcing_quantity', 'quantities_measurements')
    search_fields = ('buyer_id__username', 'product')
    list_filter = ('status', 'rfq_date')

# Admin configuration for Quotation


class QuotationAdmin(admin.ModelAdmin):
    list_display = ('id', 'rfq', 'quotation_date', 'quoted_price_per_unit',
                    'delivery_time', 'total_price', 'status')
    search_fields = ('rfq__product', 'seller__username')
    list_filter = ('status', 'quotation_date', 'delivery_time')


# Register the models with their respective admin configurations
admin.site.register(Product, ProductAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Order, OrderAdmin)
admin.site.register(OrderItem, OrderItemAdmin)
admin.site.register(ProductVariation, ProductVariationAdmin)
admin.site.register(Cart, CartAdmin)
admin.site.register(CartItem, CartItemAdmin)
admin.site.register(RFQ, RFQAdmin)
admin.site.register(Quotation, QuotationAdmin)
