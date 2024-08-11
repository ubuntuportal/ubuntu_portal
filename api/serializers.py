from rest_framework import serializers
from .models import Product, Category

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
