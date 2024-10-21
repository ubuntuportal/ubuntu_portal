from rest_framework import serializers
from .models import Product, ProductVariation, Category
from django.db.models import F, Sum, ExpressionWrapper, DecimalField


class SubCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        # parent is the ForeignKey in the Category model
        fields = ['id', 'name', 'parent']


class CategorySerializer(serializers.ModelSerializer):
    # Use the SubCategorySerializer for subcategories
    subcategories = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ['id', 'name', 'subcategories']

    def get_subcategories(self, obj):
        # Fetch subcategories where the current category is the parent
        subcategories = obj.subcategories.all()
        return SubCategorySerializer(subcategories, many=True).data


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
                  'price', 'image', 'category', 'variations', 'seller', 'rating')
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

    def to_representation(self, instance):
        """
        Ensure the price is a float in the JSON representation.
        """
        data = super().to_representation(instance)
        data['price'] = float(data['price'])
        return data
