from django.contrib.auth import get_user_model
from products.serializers import ProductSerializer
from products.models import Product, Category
from django.test import TestCase
from unittest.mock import Mock
from decimal import Decimal


User = get_user_model()


class ProductSerializerTest(TestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            email="testuser@example.com", password="testpass")
        self.category1 = Category.objects.create(name="Test Category 1")
        self.category2 = Category.objects.create(name="Test Category 2")
        self.product = Product.objects.create(
            title="Smartphone",
            description="Latest model",
            stock=100,
            price=299.99,
            seller=self.user,
            rating=4.5,
            discount_tiers={5: 10.99, 20: 12.99},
            manufactured_country="USA"
        )
        self.product.category.set([self.category1, self.category2])

    def test_product_serializer_fields(self):
        serializer = ProductSerializer(instance=self.product)
        self.assertCountEqual(serializer.data.keys(), [
            'id', 'title', 'description', 'stock', 'price', 'seller', 'category',
            'rating', 'image', 'created_at', 'updated_at', 'discount_tiers',
            'manufactured_country', 'price_by_quantity', 'variations'
        ])

    def test_product_serializer_category(self):
        serializer = ProductSerializer(instance=self.product)
        self.assertEqual(serializer.data['category'], [
                         self.category1.id, self.category2.id])

    def test_product_serializer_title(self):
        serializer = ProductSerializer(instance=self.product)
        self.assertEqual(serializer.data['title'], self.product.title)

    def test_product_serializer_price(self):
        serializer = ProductSerializer(instance=self.product)
        self.assertEqual(float(serializer.data['price']), self.product.price)

    def test_product_serializer_stock(self):
        serializer = ProductSerializer(instance=self.product)
        self.assertEqual(serializer.data['stock'], self.product.stock)

    def test_product_serializer_rating(self):
        serializer = ProductSerializer(instance=self.product)
        self.assertEqual(serializer.data['rating'], self.product.rating)

    def test_product_serializer_image(self):
        serializer = ProductSerializer(instance=self.product)
        self.assertEqual(serializer.data['image'], None)

    def test_product_serializer_variations(self):
        serializer = ProductSerializer(instance=self.product)
        self.assertEqual(serializer.data['variations'], [])

    def test_product_serializer_seller(self):
        serializer = ProductSerializer(instance=self.product)
        self.assertEqual(serializer.data['seller'], self.user.id)

    def test_product_serializer_price_by_quantity(self):
        serializer = ProductSerializer(instance=self.product)
        self.assertEqual(serializer.data['price_by_quantity'], 10.99)

    def test_product_serializer_discount_tiers(self):
        serializer = ProductSerializer(instance=self.product)
        self.assertEqual(serializer.data['discount_tiers'], {
                         5: 10.99, 20: 12.99})

    def test_product_serializer_create(self):
        request = Mock()
        request.user = self.user

        data = {
            'title': 'New Product',
            'description': 'New product description',
            'stock': 50,
            'price': 199.99,
            'seller': self.user.id,
            'category': [self.category1.id],
            'rating': 4.0,
            'discount_tiers': {5: 10.99, 20: 12.99},
            'manufactured_country': 'China'
        }
        serializer = ProductSerializer(data=data, context={'request': request})
        self.assertTrue(serializer.is_valid())
        product = serializer.save()
        self.assertEqual(product.title, 'New Product')
        self.assertEqual(product.manufactured_country, 'China')

    def test_product_serializer_update(self):
        data = {
            'title': 'Updated Product',
            'description': 'Updated product description',
            'stock': 75,
            'price': 249.99,
            'seller': self.user.id,
            'category': [self.category1.id, self.category2.id],
            'rating': 4.2,
            'discount_tiers': {5: 9.99, 20: 11.99},
            'manufactured_country': 'Germany'
        }
        serializer = ProductSerializer(instance=self.product, data=data)
        self.assertTrue(serializer.is_valid())
        product = serializer.save()
        self.assertEqual(product.title, 'Updated Product')
        self.assertEqual(product.manufactured_country, 'Germany')

    def test_product_serializer_delete(self):
        # serializer = ProductSerializer(instance=self.product)
        # self.assertTrue(serializer.is_valid())
        self.product.delete()
        self.assertFalse(Product.objects.filter(id=self.product.id).exists())

    def test_product_serializer_discount_tiers(self):
        serializer = ProductSerializer(instance=self.product)
        self.assertEqual(serializer.data['discount_tiers'], {
                         5: 10.99, 20: 12.99})

    def test_product_serializer_price_by_quantity(self):
        quantity = 5  # Set the test quantity
        serializer = ProductSerializer(
            instance=self.product, context={'quantity': quantity})

        # Calculate the expected price with the discount for the test quantity
        expected_price = self.product.price - \
            (self.product.price * 10.99 / 100)

        # Compare the rounded values (round to 2 decimal places for currency precision)
        self.assertEqual(
            round(Decimal(serializer.data['price_by_quantity']), 2), round(
                Decimal(expected_price), 2)
        )

    # def test_product_serializer_price_by_quantity(self):
    #     serializer = ProductSerializer(self.product)
    #     self.assertEqual(serializer.data['price_by_quantity'], {
    #                      5: 10.99, 20: 12.99})

    # def test_product_serializer_title(self):
    #     serializer = ProductSerializer(self.product)
    #     self.assertEqual(serializer.data['title'], self.product.title)

    # def test_product_serializer_price(self):
    #     serializer = ProductSerializer(self.product)
    #     self.assertEqual(float(serializer.data['price']), self.product.price)

    # def test_product_serializer_stock(self):
    #     serializer = ProductSerializer(self.product)
    #     self.assertEqual(serializer.data['stock'], self.product.stock)

    # def test_product_serializer_rating(self):
    #     serializer = ProductSerializer(self.product)
    #     self.assertEqual(serializer.data['rating'], self.product.rating)

    # def test_product_serializer_image(self):
    #     serializer = ProductSerializer(self.product)
    #     self.assertEqual(serializer.data['image'], None)

    # def test_product_serializer_variations(self):
    #     serializer = ProductSerializer(self.product)
    #     self.assertEqual(serializer.data['variations'], [])

    # def test_product_serializer_seller(self):
    #     serializer = ProductSerializer(self.product)
    #     self.assertEqual(serializer.data['seller'], self.user.id)
