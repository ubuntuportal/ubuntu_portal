from rest_framework import serializers
from .models import (Product, Category, Cart, CartItem, ProductVariation, Order, OrderItem,
    Quotation, RFQ)
from django.db.models import F, Sum, ExpressionWrapper, DecimalField

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

class ProductVariationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductVariation
        fields = ['id', 'product', 'attribute', 'value', 'price_modifier', 'stock']

class ProductSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(), many=True)
    variations = ProductVariationSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = ('id', 'title', 'description', 'stock', 'price', 'image', 'category', 'variations')
        read_only_fields = ('seller', 'variations')

    def create(self, validated_data):
        category_data = validated_data.pop('category', [])
        validated_data['seller'] = self.context['request'].user
        product = Product.objects.create(**validated_data)
        product.category.set(category_data)
        return product

    def update(self, instance, validated_data):
        category_data = validated_data.pop('category', None)
        instance = super().update(instance, validated_data)
        if category_data is not None:
            instance.category.set(category_data)
        return instance



class OrderItemSerializer(serializers.ModelSerializer):
    # product = ProductSerializer(read_only=True)
    # product_id = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all(), write_only=True)
    # variation = ProductVariationSerializer(read_only=True)
    # variation_id = serializers.PrimaryKeyRelatedField(queryset=ProductVariation.objects.all(), write_only=True, allow_null=True)
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

    # def create(self, validated_data):
    #     product = validated_data.get('product_id')
    #     variation = validated_data.get('variation_id')
    #     price_at_purchase = variation.price_modifier if variation else product.price
    #     return OrderItem.objects.create(price_at_purchase=price_at_purchase, **validated_data)


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

    # def update(self, instance, validated_data):
    #     items_data = validated_data.pop('items', None)
    #     instance = super().update(instance, validated_data)

    #     if items_data is not None:
    #         instance.items.all().delete()  # Remove existing items
    #         for item_data in items_data:
    #             OrderItem.objects.create(order=instance, **item_data)
    #         instance.update_total_amount()
    #     return instance

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


class RFQSerializer(serializers.ModelSerializer):
    class Meta:
        model = RFQ
        fields = '__all__'


class QuotationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quotation
        fields = '__all__'
        read_only_fields = ['rfq', 'seller', 'quotation_date']

    def create(self, validated_data):
        # Automatically set the supplier as the logged-in user
        validated_data['seller'] = self.context['request'].user
        # Automatically set the rfq from the request data if provided
        validated_data['rfq'] = validated_data.get('rfq')
        return super().create(validated_data)

