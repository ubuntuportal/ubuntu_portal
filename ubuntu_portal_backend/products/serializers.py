from rest_framework import serializers
from .models import Product, ProductVariation, Category, Review


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
                  'value', 'price_modifier', 'stock', 'views_count',
                  'sales_count', 'created_at', 'reviews_count']


class ProductSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), many=True)
    variations = ProductVariationSerializer(many=True, read_only=True)
    price_by_quantity = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ('id', 'title', 'description', 'stock', 'manufactured_country',
                  'price', 'discount_tiers', 'price_by_quantity', 'image', 'category', 'variations', 'seller', 'rating')
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

    def get_price_by_quantity(self, obj):
        # Get the requested quantity from the context or default to 1
        quantity = self.context.get('quantity', 1)
        return obj.get_price_by_quantity(quantity)
    

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'product', 'user', 'rating', 'comment', 'created_at']
        read_only_fields = ('user', 'created_at')

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)
