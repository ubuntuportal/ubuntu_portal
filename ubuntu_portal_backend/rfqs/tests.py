from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase
from rest_framework.test import APITestCase, APIClient
from django.contrib.auth import get_user_model
from django.urls import reverse
from .models import RFQ, Quotation
from products.models import Product, Category
from decimal import Decimal
from django.core.exceptions import ValidationError
from datetime import date
import os


User = get_user_model()


class RFQTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            first_name='John',
            last_name='Doe',
            email='testing@gmail.com',
            country='NG',
            role='Buyer'
        )

        self.categories = Category.objects.create(
            name='Shoes'
        )
        self.product = Product.objects.create(
            title="Men Shoes",
            description="Men shoes for all occasions",
            price=100.00,
            # seller=self.user
        )
        self.product.category.set([self.categories])

    def tearDown(self):
        self.user.delete()
        self.product.delete()

    def test_rfq_creation(self):
        dummy_file = SimpleUploadedFile(
            'test_file.txt', b'This is a test file')

        rfq = RFQ.objects.create(
            buyer=self.user,
            product=self.product,
            sourcing_quantity=10,
            quantities_measurements='pieces',
            unit_price=50.00,
            detailed_requirements='Test RFQ',
            media=dummy_file,
            status='Pending'
        )

        print(rfq.media.name)
        self.assertEqual(rfq.buyer, self.user)
        self.assertEqual(rfq.sourcing_quantity, 10)
        self.assertNotEqual(rfq.product, None)
        self.assertNotEqual(rfq.product, 'New product sourcing',
                            msg=f'Not matched with the product create by {self.user}')
        self.assertEqual(rfq.unit_price, Decimal('50.00'))
        self.assertNotEqual(rfq.unit_price, Decimal('50.056'))
        self.assertEqual(rfq.detailed_requirements, 'Test RFQ')
        self.assertEqual(rfq.quantities_measurements, 'pieces')
        # self.assertTrue(rfq.media.name.startswith('media/test_file'))
        # self.assertTrue(rfq.media.name.endswith('.txt'))
        self.assertEqual(rfq.status, 'Pending')

    def test_rfq_invalid_status(self):
        with self.assertRaises(ValueError):
            RFQ.objects.create(
                buyer=self.user,
                product=self.product,
                sourcing_quantity=10,
                quantities_measurements='pieces',
                unit_price=50.00,
                detailed_requirements='Invalid status test',
                status='InvalidStatus'
            )

    def test_clean_validation_sourcing_error(self):
        rfq = RFQ.objects.create(
            buyer=self.user,
            product=self.product,
            sourcing_quantity=-10,
            quantities_measurements='pieces',
            unit_price=50.00,
            detailed_requirements='Test RFQ',
        )

        with self.assertRaises(ValidationError) as context:
            rfq.clean()

        errors = context.exception.message_dict
        self.assertIn('sourcing_quantity', errors)

        self.assertEqual(errors['sourcing_quantity'],
                         ['Sourcing quantity must not be a non-negative value.'])

    def test_clean_validation_unit_price_error(self):
        rfq = RFQ.objects.create(
            buyer=self.user,
            product=self.product,
            sourcing_quantity=10,
            quantities_measurements='pieces',
            unit_price=-50.00,
            detailed_requirements='Test RFQ',
        )

        with self.assertRaises(ValidationError) as context:
            rfq.clean()

        errors = context.exception.message_dict
        self.assertIn('unit_price', errors)

        self.assertEqual(errors['unit_price'],
                         ['Unit price must be a non-negative value.'])

    def test_clean_validation_error(self):
        rfq = RFQ.objects.create(
            buyer=self.user,
            product=self.product,
            sourcing_quantity=10,
            quantities_measurements='invalid_measurement',
            unit_price=50.00,
            detailed_requirements='Test RFQ',
        )

        with self.assertRaises(ValidationError) as context:
            rfq.clean()

        errors = context.exception.message_dict
        self.assertIn('quantities_measurements', errors)

        self.assertEqual(errors['quantities_measurements'],
                         ['Invalid measurement for this product.'])

    def test_get_buyer_country(self):
        rfq = RFQ.objects.create(
            buyer=self.user,
            product=self.product,
            sourcing_quantity=10,
            quantities_measurements='pieces',
            unit_price=50.00,
            detailed_requirements='Test RFQ',
        )

        self.assertEqual(rfq.get_buyer_country(), 'NG')


class QuotationTestModel(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            first_name='John',
            last_name='Doe',
            email='test@gmail.com',
            country='SA',
            role='Seller',
            phone_number='80854546178',
            password='testpass123'
        )

        self.product = Product.objects.create(
            title="Men Shoes",
            description="Men shoes for all occasions",
            price=100.00,
            seller=self.user
        )

        self.categories = Category.objects.create(
            name='Shoes'
        )

        self.product.category.set([self.categories])

        self.rfq = RFQ.objects.create(
            buyer=self.user,
            product=self.product,
            sourcing_quantity=100,
            quantities_measurements='pieces',
            unit_price=200.00,
            detailed_requirements='Test RFQ for quotation',
            status='Pending',
        )

        self.quotation = Quotation.objects.create(
            seller=self.user,
            rfq=self.rfq,
            delivery_time=date(2024, 9, 20),
            quoted_price_per_unit=250.00,
            total_price=25000.00,
            additional_notes='Test quotation to respond to RFQ',
            status=1
        )

    def test_quotation_creation(self):
        self.assertEqual(self.quotation.seller, self.user)
        self.assertEqual(self.quotation.rfq, self.rfq)
        self.assertEqual(self.quotation.quoted_price_per_unit,
                         Decimal('250.00'))
        self.assertEqual(self.quotation.delivery_time, date(2024, 9, 20))
        self.assertEqual(self.quotation.total_price, Decimal('25000.00'))
        self.assertEqual(self.quotation.additional_notes,
                         'Test quotation to respond to RFQ')
        self.assertEqual(self.quotation.status, 1)

    def test_quotation_calculate_total_price(self):
        self.assertEqual(self.quotation.total_price, Decimal('25000.00'))


class RFQSerializerTest(APITestCase):
    def setUp(self):
        self.buyer = User.objects.create_user(
            first_name='Ayuba',
            last_name='Naomi',
            email='naomi@gmail.com',
            country='NG',
            role='Buyer',
            phone_number='+2348085454617',
            password='testing'
        )

        self.seller = User.objects.create_user(
            first_name='John',
            last_name='Doe',
            email='john@gmail.com',
            country='SA',
            role='Seller',
            phone_number='+23448085454617',
            password='testing'
        )

        self.product = Product.objects.create(
            title="Women Shoes",
            description="Women shoes for all occasions",
            price=100.00,
            seller=self.seller
        )

        self.categories = Category.objects.create(
            name='Shoes'
        )

        self.product.category.set([self.categories])

        # Set up APIClient
        self.client_as_a_buyer = APIClient()
        self.client_as_a_buyer.force_authenticate(user=self.buyer)
        self.client_as_a_seller = APIClient()
        self.client_as_a_seller.force_authenticate(user=self.seller)

        self.valid_data = {
            'product': self.product.id,
            'sourcing_quantity': 100,
            'quantities_measurements': 'pieces',
            'unit_price': 200.00,
            'detailed_requirements': 'I need 100 pieces',
            'status': 'Pending',
        }

    def test_create_valid_rfq(self):
        self.rfq_url = reverse('buyer-rfqs-list')
        response = self.client_as_a_buyer.post(
            self.rfq_url, self.valid_data, format='json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(RFQ.objects.count(), 1)
        self.assertNotEqual(RFQ.objects.count(), 2)
        self.assertTrue(RFQ.objects.filter(sourcing_quantity=100).exists())
        self.assertTrue(RFQ.objects.filter(
            unit_price=Decimal('200.00')).exists())
        self.assertTrue(RFQ.objects.filter(
            detailed_requirements='I need 100 pieces').exists())
        rfq = RFQ.objects.first()
        self.assertEqual(rfq.buyer, self.buyer)

    def test_create_invalid_rfq(self):
        self.rfq_url = reverse('buyer-rfqs-list')
        invalid_data = self.valid_data.copy()
        invalid_data.update({'status': 'InvalidStatus', 'sourcing_quantity': -100,
                            'unit_price': -200.00, 'quantities_measurements': 'InvalidMeasurement'})

        response = self.client_as_a_buyer.post(
            self.rfq_url, invalid_data, format='json')
        self.assertEqual(response.status_code, 400)
        self.assertEqual(RFQ.objects.count(), 0)
        self.assertFalse(RFQ.objects.filter(sourcing_quantity=-100).exists())
        self.assertFalse(RFQ.objects.filter(status='InvalidStatus').exists())
        self.assertFalse(RFQ.objects.filter(unit_price=-200.00).exists())
        self.assertFalse(RFQ.objects.filter(
            quantities_measurements='InvalidMeasurement').exists())

    def test_create_large_unit_Price(self):
        self.rfq_url = reverse('buyer-rfqs-list')
        invalid_data = self.valid_data.copy()
        invalid_data['unit_price'] = 899999999999999999.23399
        response = self.client_as_a_buyer.post(
            self.rfq_url, invalid_data, format='json')
        self.assertEqual(response.status_code, 400)
        self.assertEqual(RFQ.objects.count(), 0)
        self.assertIn('unit_price', response.data,
                      msg='Unit price exceeds the maximum value')

    def test_buyer_list_rfqs(self):
        # Create new product
        self.product2 = Product.objects.create(
            title="Agriculture Tools",
            description="Tools for farming",
            price=500.00,
            seller=self.seller
        )

        self.categories = Category.objects.create(
            name='Agriculture'
        )
        self.product2.category.set([self.categories])

        self.rfq_url = reverse('buyer-rfqs-list')

        self.valid_data2 = {
            'product': self.product.id,
            'sourcing_quantity': 10,
            'quantities_measurements': 'pieces',
            'unit_price': 400.00,
            'detailed_requirements': 'I need a reliable supplier who can supply me 10 pieces of agriculture tools',
            'status': 'Pending',
        }

        response1 = self.client_as_a_buyer.post(
            self.rfq_url, self.valid_data, format='json')
        response2 = self.client_as_a_buyer.post(
            self.rfq_url, self.valid_data2, format='json')
        self.assertEqual(response1.status_code, 201)
        self.assertEqual(response2.status_code, 201)
        self.assertEqual(RFQ.objects.count(), 2)
        same_user = RFQ.objects.filter(buyer=self.buyer)
        self.assertEqual(same_user.count(), 2)

        self.rfq_list_url = reverse('buyer-rfqs-list')
        response = self.client_as_a_buyer.get(self.rfq_list_url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data['results']), 2)
        self.assertNotEqual(len(response.data), 1)
        self.assertNotEqual(len(response.data), 3)

        first_rfq = response.data['results'][0]
        second_rfq = response.data['results'][1]
        print('response from first rfq', response.data['results'][0])
        print('response from the second rfq', response.data['results'][1])
        self.assertEqual(second_rfq['detailed_requirements'], 'I need 100 pieces')
        self.assertTrue(first_rfq['detailed_requirements'].startswith('I need a reliable supplier who can supply me 10 pieces of agriculture tools'))
        self.assertEqual(first_rfq['status'], 'Pending')

#     def test_media_file_upload(self):
#         self.rfq_url = reverse('buyer-rfqs-list')
#         with open('test_file.txt', 'w') as f:
#             f.write('Test file content for media file upload')
# 
#         with open('test_file.txt', 'rb') as f:
#             valid_data_with_media = self.valid_data.copy()
#             valid_data_with_media['media'] = f
# 
#             response = self.client_as_a_buyer.post(
#                 self.rfq_url, valid_data_with_media, format='multipart')
#             self.assertEqual(response.status_code, 201)
#             self.assertEqual(RFQ.objects.count(), 1)
#             rfq = RFQ.objects.first()
# 
#             # Check that the media file was uploaded, and its filename starts with 'test_file'
#             self.assertTrue(rfq.media.name.startswith('test_file'))
#             self.assertIsNotNone(rfq.media)

    def test_buyer_read_only(self):
        self.rfq_url = reverse('buyer-rfqs-list')
        valid_data_with_buyer = self.valid_data.copy()
        valid_data_with_buyer['buyer'] = self.seller.id
        response = self.client_as_a_buyer.post(
            self.rfq_url, valid_data_with_buyer, format='json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(RFQ.objects.count(), 1)
        self.assertNotEqual(RFQ.objects.first().buyer, self.seller)
        self.assertEqual(RFQ.objects.first().buyer, self.buyer)
