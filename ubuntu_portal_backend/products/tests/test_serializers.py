from django.test import TestCase
from products.serializers import ProductSerializer, ProductVariationSerializer, CategorySerializer
from products.models import Product, ProductVariation, Category
from django.contrib.auth import get_user_model

User = get_user_model()


class ProductSerializerTest(TestCase):
    def setUp(self):
        # Create a user instance to be used in the tests
        self.user = User.objects.create_user(
            email='testuser@example.com', password='password123'
        )

        # Now you can use self.user in your test setup
        self.product = Product.objects.create(
            title="Test Product",
            description="Test Description",
            price=10.99,
            stock=5,
            seller=self.user,  # Assign the user here
            category=self.category
        )

    def test_product_serializer_fields(self):
        serializer = ProductSerializer(self.product)
        self.assertCountEqual(serializer.data.keys(), [
            'id', 'title', 'description', 'stock', 'price', 'seller', 'rating', 'image', 'category', 'variations'])

    def test_product_serializer_title(self):
        serializer = ProductSerializer(self.product)
        self.assertEqual(serializer.data['title'], self.product.title)

    def test_product_serializer_description(self):
        serializer = ProductSerializer(self.product)
        self.assertEqual(
            serializer.data['description'], self.product.description)

    def test_product_serializer_stock(self):
        serializer = ProductSerializer(self.product)
        self.assertEqual(serializer.data['stock'], self.product.stock)

    def test_product_serializer_price(self):
        serializer = ProductSerializer(self.product)
        self.assertEqual(serializer.data['price'], self.product.price)

    def test_product_serializer_seller(self):
        serializer = ProductSerializer(self.product)
        self.assertEqual(serializer.data['seller'], self.product.seller.email)

    def test_product_serializer_rating(self):
        serializer = ProductSerializer(self.product)
        self.assertEqual(serializer.data['rating'], self.product.rating)

    def test_product_serializer_image(self):
        serializer = ProductSerializer(self.product)
        self.assertEqual(serializer.data['image'], None)

    def test_product_serializer_category(self):
        serializer = ProductSerializer(self.product)
        self.assertEqual(serializer.data['category'], [])

    def test_product_serializer_variations(self):
        serializer = ProductSerializer(self.product)
        self.assertEqual(serializer.data['variations'], [])


class ProductVariationSerializerTest(TestCase):
    def setUp(self):
        # Create a user instance to be used in the tests
        self.user = User.objects.create_user(
            email='testuser@example.com', password='password123'
        )

        # Now you can use self.user in your test setup
        self.product = Product.objects.create(
            title="Test Product",
            description="Test Description",
            price=10.99,
            stock=5,
            seller=self.user,  # Assign the user here
            category=self.category
        )

        self.variation = ProductVariation.objects.create(
            product=self.product,
            attribute="Color",
            value="Red",
            price_modifier=2.99,
            stock=10
        )

    def test_product_variation_serializer_fields(self):
        serializer = ProductVariationSerializer(self.variation)
        self.assertCountEqual(serializer.data.keys(), [
            'id', 'product', 'attribute', 'value', 'price_modifier', 'stock'])

    def test_product_variation_serializer_product(self):
        serializer = ProductVariationSerializer(self.variation)
        self.assertEqual(serializer.data['product'], self.product.id)

    def test_product_variation_serializer_attribute(self):
        serializer = ProductVariationSerializer(self.variation)
        self.assertEqual(
            serializer.data['attribute'], self.variation.attribute)

    def test_product_variation_serializer_value(self):
        serializer = ProductVariationSerializer(self.variation)
        self.assertEqual(serializer.data['value'], self.variation.value)

    def test_product_variation_serializer_price_modifier(self):
        serializer = ProductVariationSerializer(self.variation)
        self.assertEqual(
            serializer.data['price_modifier'], self.variation.price_modifier)

    def test_product_variation_serializer_stock(self):
        serializer = ProductVariationSerializer(self.variation)
        self.assertEqual(serializer.data['stock'], self.variation.stock)


class CategorySerializerTest(TestCase):
    def setUp(self):
        self.category = Category.objects.create(name="Test Category")

    def test_category_serializer_fields(self):
        serializer = CategorySerializer(self.category)
        self.assertCountEqual(serializer.data.keys(), [
                              'id', 'name', 'subcategories'])

    def test_category_serializer_name(self):
        serializer = CategorySerializer(self.category)
        self.assertEqual(serializer.data['name'], self.category.name)

    def test_category_serializer_subcategories(self):
        serializer = CategorySerializer(self.category)
        self.assertEqual(serializer.data['subcategories'], [])
