from rest_framework import serializers
from .models import Product, Category, Cart, CartItem

class ProductSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(), many=True)

    class Meta:
        model = Product
        fields = ('id', 'title', 'description', 'price', 'image', 'category')
        # read_only_fields = ('seller',)

    def create(self, validated_data):
        categories =  validated_data.pop('category', [])
        validated_data['seller'] = self.context['request'].user
        product = Product.objects.create(**validated_data)
        product.category.set(categories)
        return product


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

class CartItemSerializer(serializers.ModelSerializer):
    product_name = serializers.ReadOnlyField(source='product.name')
    total_price = serializers.SerializerMethodField()
    variation = ProductVariationSerializer()

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'product_name', 'quantity', 'price', 'total_price', 'variation']

    def get_total_price(self, obj):
        # Calculate the total price including any variation price modifiers
        base_price = obj.product.price
        variation_modifier = obj.variation.price_modifier if obj.variation else 0
        return (base_price + variation_modifier) * obj.quantity

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    cart_total = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ['id', 'user', 'items', 'cart_total']
    
    def get_cart_total(self, obj):
        return sum([item.get_total_price() for item in obj.items.all()])