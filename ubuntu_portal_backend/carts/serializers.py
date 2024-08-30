from .models import Cart, CartItem
from rest_framework import serializers


class CartItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'product_name', 'quantity', 'variation', 'total_price']

    def get_total_price(self, obj):
        price = obj.product.price
        if obj.variation:
            price += obj.variation.price_modifier
        return price * obj.quantity

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    cart_total = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ['items', 'cart_total']

    def get_cart_total(self, obj):
        return sum([item.get_total_price() for item in obj.items.all()])
