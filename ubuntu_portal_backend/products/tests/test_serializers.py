from django.test import TestCase
from products.serializers import ProductSerializer
from products.models import Product, Category
from django.contrib.auth import get_user_model

User = get_user_model()


class ProductSerializerTest(TestCase):
    def setUp(self):
        # Create category instances
        self.category1 = Category.objects.create(name="Test Category 1")
        self.category2 = Category.objects.create(name="Test Category 2")

        # Create a user instance
        self.user = User.objects.create_user(
            email='testuser@example.com', password='password123'
        )

        # Create a product instance
        self.product = Product.objects.create(
            title="Test Product",
            description="Test Description",
            price=10.99,
            stock=5,
            seller=self.user
        )

        # Assign categories to the product using .set()
        self.product.category.set([self.category1, self.category2])

    def test_product_serializer_fields(self):
        serializer = ProductSerializer(self.product)
        self.assertCountEqual(serializer.data.keys(), [
            'id', 'title', 'description', 'stock', 'price', 'seller', 'rating', 'image', 'category', 'variations'])

    def test_product_serializer_category(self):
        serializer = ProductSerializer(self.product)
        self.assertEqual(serializer.data['category'], [
                         self.category1.id, self.category2.id])

    def test_product_serializer_title(self):
        serializer = ProductSerializer(self.product)
        self.assertEqual(serializer.data['title'], self.product.title)

    def test_product_serializer_price(self):
        serializer = ProductSerializer(self.product)
        self.assertEqual(float(serializer.data['price']), self.product.price)

    def test_product_serializer_stock(self):
        serializer = ProductSerializer(self.product)
        self.assertEqual(serializer.data['stock'], self.product.stock)

    def test_product_serializer_rating(self):
        serializer = ProductSerializer(self.product)
        self.assertEqual(serializer.data['rating'], self.product.rating)

    def test_product_serializer_image(self):
        serializer = ProductSerializer(self.product)
        self.assertEqual(serializer.data['image'], None)

    def test_product_serializer_variations(self):
        serializer = ProductSerializer(self.product)
        self.assertEqual(serializer.data['variations'], [])

    def test_product_serializer_seller(self):
        serializer = ProductSerializer(self.product)
        self.assertEqual(serializer.data['seller'], self.user.id)
