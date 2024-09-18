from rest_framework import serializers
from .models import Order, OrderItem
from products.models import Product, ProductVariation

class OrderItemSerializer(serializers.ModelSerializer):
    product_id = serializers.UUIDField()
    variation_id = serializers.UUIDField(required=False, allow_null=True)
    price_at_purchase = serializers.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        model = OrderItem
        fields = ['product_id', 'variation_id', 'quantity', 'price_at_purchase']

    def validate_product_id(self, value):
        try:
            Product.objects.get(id=value)
        except Product.DoesNotExist:
            raise serializers.ValidationError("Product with this ID does not exist.")
        return value

    def validate_variation_id(self, value):
        if value:
            try:
                ProductVariation.objects.get(id=value)
            except ProductVariation.DoesNotExist:
                raise serializers.ValidationError("Product variation with this ID does not exist.")
        return value


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)
    user = serializers.ReadOnlyField(source='user.username')
    total_amount = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'user', 'shipping_address', 'payment_method', 'total_amount', 'items']
        read_only_fields = ['total_amount', 'created_at']

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        order = Order.objects.create(**validated_data)
        for item_data in items_data:
            product = Product.objects.get(id=item_data['product_id'])
            variation = None
            if item_data.get('variation_id'):
                variation = ProductVariation.objects.get(id=item_data['variation_id'])
            OrderItem.objects.create(order=order, product=product, variation=variation, **item_data)
        return order
