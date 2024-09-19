from django.test import TestCase
from django.core.exceptions import ValidationError
from products.models import Product, Category, ProductVariation
from django.contrib.auth import get_user_model

User = get_user_model()


class CategoryModelTest(TestCase):

    def setUp(self):
        # Set up a category instance for testing
        self.category = Category.objects.create(name="Electronics")

    def test_category_name_not_empty(self):
        # Test that a category name cannot be empty
        with self.assertRaises(ValidationError):
            category = Category(name="")
            category.full_clean()

    def test_category_name_unique(self):
        # Test that category names must be unique
        with self.assertRaises(ValidationError):
            Category.objects.create(name="Electronics")

    def test_category_parent_relationship(self):
        # Test the parent-child relationship in categories
        parent_category = Category.objects.create(name="Parent Category")
        child_category = Category.objects.create(
            name="Child Category", parent=parent_category)
        self.assertEqual(child_category.parent, parent_category)


class ProductModelTest(TestCase):

    def setUp(self):
        # Set up a user, category, and product instance for testing
        self.user = User.objects.create_user(
            email="testuser@example.com", password="testpass")
        self.category = Category.objects.create(name="Electronics")
        self.product = Product.objects.create(
            title="Smartphone",
            description="Latest model",
            stock=100,
            price=299.99,
            seller=self.user,
            rating=4.5
        )
        self.product.category.add(self.category)

    def test_product_stock_is_positive(self):
        # Test that product stock must be positive
        with self.assertRaises(ValidationError):
            product = Product(title="Invalid Product", stock=-
                              10, price=100.00, seller=self.user)
            product.full_clean()

    def test_product_price_constraints(self):
        # Test that product price must be positive
        with self.assertRaises(ValidationError):
            product = Product(title="Invalid Product", stock=10,
                              price=-100.00, seller=self.user)
            product.full_clean()

    def test_rating_bounds(self):
        # Test that product rating must be within valid bounds
        self.product.rating = 6.0  # Invalid rating
        with self.assertRaises(ValidationError):
            self.product.full_clean()

    def test_product_category_many_to_many_relationship(self):
        # Test the many-to-many relationship between products and categories
        self.assertEqual(self.product.category.count(), 1)
        self.product.category.add(Category.objects.create(name="Tablets"))
        self.assertEqual(self.product.category.count(), 2)

    def test_product_title_not_empty(self):
        # Test that product title cannot be empty
        with self.assertRaises(ValidationError):
            product = Product(title="", stock=10,
                              price=100.00, seller=self.user)
            product.full_clean()

    def test_product_description_not_empty(self):
        # Test that product description cannot be empty
        with self.assertRaises(ValidationError):
            product = Product(title="Valid Product", description="",
                              stock=10, price=100.00, seller=self.user)
            product.full_clean()

    def test_product_stock_not_zero(self):
        # Test that product stock cannot be zero
        with self.assertRaises(ValidationError):
            product = Product(title="Valid Product", stock=0,
                              price=100.00, seller=self.user)
            product.full_clean()

    def test_product_price_not_zero(self):
        # Test that product price cannot be zero
        with self.assertRaises(ValidationError):
            product = Product(title="Valid Product", stock=10,
                              price=0.00, seller=self.user)
            product.full_clean()

    def test_product_rating_not_negative(self):
        # Test that product rating cannot be negative
        with self.assertRaises(ValidationError):
            product = Product(title="Valid Product", stock=10,
                              price=100.00, seller=self.user, rating=-1.0)
            product.full_clean()

    def test_product_image_upload(self):
        # Test that product image can be uploaded
        product = Product.objects.create(
            title="Product with Image",
            description="Product description",
            stock=10,
            price=100.00,
            seller=self.user,
            rating=4.0,
            image="path/to/image.jpg"
        )
        self.assertEqual(product.image, "path/to/image.jpg")


class ProductVariationModelTest(TestCase):

    def setUp(self):
        # Set up a user, category, product, and product variation instance for testing
        self.user = User.objects.create_user(
            email="testuser@example.com", password="testpass")
        self.category = Category.objects.create(name="Electronics")
        self.product = Product.objects.create(
            title="Smartphone",
            description="Latest model",
            stock=100,
            price=299.99,
            seller=self.user,
            rating=4.5
        )
        self.product.category.add(self.category)
        self.variation = ProductVariation.objects.create(
            product=self.product,
            attribute="Color",
            value="Red",
            price_modifier=10.00,
            stock=50
        )

    def test_variation_attribute_not_empty(self):
        # Test that variation attribute cannot be empty
        with self.assertRaises(ValidationError):
            variation = ProductVariation(
                product=self.product, attribute="", value="Red", stock=50)
            variation.full_clean()

    def test_variation_value_not_empty(self):
        # Test that variation value cannot be empty
        with self.assertRaises(ValidationError):
            variation = ProductVariation(
                product=self.product, attribute="Color", value="", stock=50)
            variation.full_clean()

    def test_variation_stock_not_negative(self):
        # Test that variation stock cannot be negative
        with self.assertRaises(ValidationError):
            variation = ProductVariation(
                product=self.product, attribute="Color", value="Red", stock=-10)
            variation.full_clean()

    def test_variation_price_modifier_not_negative(self):
        # Test that variation price modifier cannot be negative
        with self.assertRaises(ValidationError):
            variation = ProductVariation(
                product=self.product, attribute="Color", value="Red", price_modifier=-10.00, stock=50)
            variation.full_clean()

    def test_variation_price_modifier_null(self):
        # Test that variation price modifier can be null
        variation = ProductVariation.objects.create(
            product=self.product,
            attribute="Size",
            value="Large",
            stock=20
        )
        self.assertIsNone(variation.price_modifier)
