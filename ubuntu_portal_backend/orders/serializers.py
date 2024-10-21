from rest_framework import serializers
from .models import Order, OrderItem, BillingInfo, ShippingInfo, ContactInfo
from products.models import Product, ProductVariation


class BillingInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = BillingInfo
        fields = ['company_name', 'address', 'country', 'region_state', 'city', 'zip_code', 'email', 'phone_number']

    def validate_user(self, value):
        # Assuming 'value' is a CustomUser object, access the email field
        email = getattr(value, 'email', None)
        if email is None or '@' not in email:
            raise serializers.ValidationError("Invalid email address.")
        return value


class ShippingInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingInfo
        fields = ['reciepient_first_name', 'reciepient_last_name', 'address', 'country', 'region_state', 'city', 'zip_code', 'email', 'phone_number']

    def validate_user(self, value):
        # Assuming 'value' is a CustomUser object, access the email field
        email = getattr(value, 'email', None)
        if email is None or '@' not in email:
            raise serializers.ValidationError("Invalid email address.")
        return value


class ContactInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactInfo
        fields = ['first_name', 'last_name', 'email_address', 'phone_number', 'preferred_contact_method', 'best_time_to_contact']

    def validate_user(self, value):
        # Assuming 'value' is a CustomUser object, access the email field
        email = getattr(value, 'email', None)
        if email is None or '@' not in email:
            raise serializers.ValidationError("Invalid email address.")
        return value


class OrderItemSerializer(serializers.ModelSerializer):
    product_id = serializers.UUIDField()
    variation_id = serializers.UUIDField(required=False, allow_null=True)
    price_at_purchase = serializers.DecimalField(
        max_digits=10, decimal_places=2)

    class Meta:
        model = OrderItem
        fields = ['product_id', 'variation_id',
                  'quantity', 'price_at_purchase']

    def validate_product_id(self, value):
        try:
            Product.objects.get(id=value)
        except Product.DoesNotExist:
            raise serializers.ValidationError(
                "Product with this ID does not exist.")
        return value

    def validate_variation_id(self, value):
        if value:
            try:
                ProductVariation.objects.get(id=value)
            except ProductVariation.DoesNotExist:
                raise serializers.ValidationError(
                    "Product variation with this ID does not exist.")
        return value


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)
    user = serializers.ReadOnlyField(source='user.username')
    total_amount = serializers.DecimalField(
        max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'user', 'billing_info', 'shipping_info',
                  'contact_info', 'payment_method', 'total_amount', 'items']
        read_only_fields = ['total_amount', 'created_at']

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        order = Order.objects.create(**validated_data)
        for item_data in items_data:
            product = Product.objects.get(id=item_data['product_id'])
            variation = None
            if item_data.get('variation_id'):
                variation = ProductVariation.objects.get(
                    id=item_data['variation_id'])
            OrderItem.objects.create(
                order=order, product=product, variation=variation, **item_data)
        return order
