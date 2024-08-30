from rest_framework import serializers
from .models import Product, ProductVariation, Category
from django.db.models import F, Sum, ExpressionWrapper, DecimalField


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']


class ProductVariationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductVariation
        fields = ['id', 'product', 'attribute',
                  'value', 'price_modifier', 'stock']


class ProductSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), many=True)
    variations = ProductVariationSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = ('id', 'title', 'description', 'stock',
                  'price', 'image', 'category', 'variations')
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
