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
from unittest.mock import patch, AsyncMock
from channels.layers import get_channel_layer
from asgiref.sync import sync_to_async
import time


User = get_user_model()


class RFQTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            first_name='John',
            last_name='Doe',
            email='testing@gmail.com',
            country='NG',
            role='Buyer',
            phone_number='+233569897055'
        )

        self.categories = Category.objects.create(
            name='Shoes'
        )
        self.product = Product.objects.create(
            title="Men Shoes",
            description="Men shoes for all occasions",
            price=100.00,
            seller=self.user
        )
        self.product.category.set([self.categories])
        
        # Create a supplier
        self.supplier_1 = User.objects.create_user(
            first_name='Kelvin',
            last_name='Doe',
            email='kelvin@gmail.com',
            country='SA',
            role='Seller',
            phone_number='+243568980869'
        )
        
        self.supplier_2 = User.objects.create_user(
            first_name='Abhram',
            last_name='Doe',
            email='doe@gmail.com',
            country='NG',
            role='Seller',
            phone_number='+2436768900655'
        )


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
    
    def test_get_relevant_suppliers(self):
        category1 = Category.objects.create(name='Agriculture')
        category2 = Category.objects.create(name='Home appliance')
        category3 = Category.objects.create(name='Wholesale Electronics')
        category4 = Category.objects.create(name='Fashion')
        
        product_1 = Product.objects.create(
            title='Cereals',
            description='cereal is good for the body',
            price=100,
            seller=self.supplier_1
        )
        
        product_2 = Product.objects.create(
            title='Cereals',
            description='cereal is good for the body',
            price=100,
            seller=self.supplier_2
        )
        
        product_3 = Product.objects.create(
            title='Apple Watch',
            description='Best Apple',
            price=500,
            seller=self.supplier_1
        )
        
        product_4 = Product.objects.create(
            title='Ankara',
            description='Latest Ankara in the market',
            price=150,
            seller=self.supplier_2
        )
        
        product_1.category.set([category1])
        product_2.category.set([category2])
        product_3.category.set([category3])
        product_4.category.set([category4])
        
        # create a buyer
        buyer2 = User.objects.create_user(
            first_name='Ayuba',
            last_name='Naomi',
            email='ayuba@gmail.com',
            country='SA',
            role='Buyer'
        )
        
        rfq1 = RFQ.objects.create(
            buyer=buyer2,
            product=product_1,
            sourcing_quantity=10,
            quantities_measurements='pieces',
            unit_price=50.00,
            detailed_requirements='Test RFQ',
        )
        
        rfq2 = RFQ.objects.create(
            buyer=self.user,
            product=product_2,
            sourcing_quantity=10,
            quantities_measurements='pieces',
            unit_price=50.00,
            detailed_requirements='Test RFQ',
        )
        
        rfq3 = RFQ.objects.create(
            buyer=buyer2,
            product=product_3,
            sourcing_quantity=10,
            quantities_measurements='pieces',
            unit_price=50.00,
            detailed_requirements='Test RFQ',
        )
        
        rfq4 = RFQ.objects.create(
            buyer=self.user,
            product=product_4,
            sourcing_quantity=10,
            quantities_measurements='pieces',
            unit_price=50.00,
            detailed_requirements='Test RFQ',
        )
        
        relevant_suppplier_1 = rfq1.get_relevant_suppliers()
        relevant_supplier_2 = rfq2.get_relevant_suppliers()
        relevant_supplier_3 = rfq3.get_relevant_suppliers()
        relevant_supplier_4 = rfq4.get_relevant_suppliers()
        
        self.assertIn(self.supplier_1, relevant_suppplier_1)
        self.assertIn(self.supplier_2, relevant_supplier_2)
        self.assertIn(self.supplier_1, relevant_supplier_3)
        self.assertIn(self.supplier_2, relevant_supplier_4)
    
    @patch('channels.layers.get_channel_layer')
    async def test_notify_suppliers(self, mock_get_channel_layer):
        category = await sync_to_async(Category.objects.create)(name='Electronics')
        
        self.supplier_1 = await sync_to_async(User.objects.create_user)(
            first_name='Kelvin',
            last_name='Doe',
            email='kelvin2@gmail.com',
            country='NG',
            role='Seller',
            phone_number='+2435632920569'
        )
        
        self.supplier_2 = await sync_to_async(User.objects.create_user)(
            first_name='John',
            last_name='Doe',
            email='john2@gmail.com',
            country='NG',
            role='Seller',
            phone_number='+2423684808668'
        )
        
        self.product = await sync_to_async(Product.objects.create)(
            title='Laptop',
            description='A high-performance laptop',
            price=1000,
            seller=self.supplier_1
        )
        await sync_to_async(self.product.category.set)([category])
        
        self.buyer = await sync_to_async(User.objects.create_user)(
            first_name='Ayuba',
            last_name='Naomi',
            email='ayuba@gmail.com',
            country='NG',
            role='Buyer'
        )
        
        self.rfq = await sync_to_async(RFQ.objects.create)(
            buyer=self.buyer,
            product=self.product,
            sourcing_quantity=5,
            quantities_measurements='pieces',
            unit_price=950.00,
            detailed_requirements='Looking for the best price.'
        )
        
        mock_group_layer = AsyncMock()
        mock_get_channel_layer.return_value = mock_group_layer
        
        self.rfq.get_relevant_suppliers = lambda: [self.supplier_1, self.supplier_2]
        
        await self.rfq.notify_suppliers()
        
        # Assert that the suppliers are notified
        mock_group_layer.group_send.assert_any_call(
            f'supplier_{self.supplier_1.id}',
            {
                'type': 'send_notification',
                'notification': f'{self.rfq.rfq_date} {self.rfq.id} {self.product.title} {self.buyer.country}'
            }
        )
        
        mock_group_layer.group_send.assert_any_call(
            f'supplier_{self.supplier_2.id}',
            {
                'type': 'send_notification',
                'notification': f'{self.rfq.rfq_date} {self.rfq.id} {self.product.title} {self.buyer.country}'
            }
        )
        
        # Check if suppliers are correctly notified
        notified_suppliers = await sync_to_async(list)(self.rfq.suppliers_notified.all())
        self.assertIn(self.supplier_1, notified_suppliers)
        self.assertIn(self.supplier_2, notified_suppliers)
        

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


class RFQSerializerViewSetTest(APITestCase):
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
        self.assertEqual(
            second_rfq['detailed_requirements'], 'I need 100 pieces')
        self.assertTrue(first_rfq['detailed_requirements'].startswith(
            'I need a reliable supplier who can supply me 10 pieces of agriculture tools'))
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

    def test_seller_quotation_creation(self):
        self.quotation_url = reverse('seller-quotations-list')
        self.rfq = RFQ.objects.create(
            buyer=self.buyer,
            product=self.product,
            sourcing_quantity=100,
            quantities_measurements='pieces',
            unit_price=200.00,
            detailed_requirements='Test RFQ for quotation',
            status='Pending',
        )

        valid_quotation_data = {
            'rfq': self.rfq.id,
            'seller': self.seller.id,
            'quoted_price_per_unit': 250.00,
            'delivery_time': '2024-09-20',
            'total_price': 25000.00,
            'additional_notes': 'Test quotation to respond to RFQ',
            'status': 1
        }

        response = self.client_as_a_seller.post(
            self.quotation_url, valid_quotation_data, format='json'
        )
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Quotation.objects.count(), 1)
        self.assertEqual(Quotation.objects.first().seller, self.seller)
        self.assertTrue(Quotation.objects.filter(
            quoted_price_per_unit=Decimal('250.00')).exists())
        self.assertTrue(Quotation.objects.filter(
            delivery_time=date(2024, 9, 20)).exists())
        self.assertTrue(Quotation.objects.filter(
            additional_notes='Test quotation to respond to RFQ').exists())
        self.assertEqual(Quotation.objects.first().status, 1)
        self.assertEqual(Quotation.objects.first().seller, self.seller)

        rfq = Quotation.objects.first().rfq
        self.assertEqual(rfq, self.rfq)

        # Test calcuation
        self.assertEqual(Quotation.objects.first().total_price,
                         Decimal('25000.00'))

        quotation_cal = Quotation.objects.first().quoted_price_per_unit * \
            self.rfq.sourcing_quantity
        self.assertEqual(quotation_cal, Quotation.objects.first().total_price)

    def test_rfq_not_in_quotation_validation_error(self):
        self.quotation_url = reverse('seller-quotations-list')
        valid_quotation_data = {
            'seller': self.seller.id,
            'quoted_price_per_unit': 250.00,
            'delivery_time': '2024-09-20',
            'additional_notes': 'Test quotation to respond to RFQ',
            'status': 1
        }

        response = self.client_as_a_seller.post(
            self.quotation_url, valid_quotation_data, format='json'
        )
        self.assertEqual(response.status_code, 400)
        self.assertEqual(Quotation.objects.count(), 0)

        with self.assertRaises(ValidationError):
            rfq = Quotation.objects.first()
            if rfq not in Quotation.objects.all():
                raise ValidationError('RFQ must be provided.')

    def test_rfq_listing_viewset(self):
        url = reverse('buyer-rfqs-list')
        response = self.client_as_a_buyer.post(
            url, self.valid_data, format='json'
        )
        self.assertEqual(response.status_code, 201)

        response_listing = self.client_as_a_buyer.get(url)
        self.assertEqual(response_listing.status_code, 200)
        json_response = response_listing.json()
        self.assertEqual(len(json_response['results']), 1)
        self.assertIn('results', json_response)
        for result in json_response['results']:
            self.assertIn('sourcing_quantity', result)
            self.assertIn('id', result)
            self.assertIn('buyer', result)
            self.assertIn('detailed_requirements', result)

    def test_rfq_listing_empty(self):
        url = reverse('buyer-rfqs-list')
        response_listing = self.client_as_a_buyer.get(url)
        self.assertEqual(response_listing.status_code, 200)
        json_response = response_listing.json()
        self.assertEqual(len(json_response['results']), 0)

    def test_rfq_invalid_data(self):
        url = reverse('buyer-rfqs-list')
        invalid_data = self.valid_data.copy()
        invalid_data.update({'sourcing_quantity': -20, 'status': 'invalidstatus',
                             'unit_price': -700, 'quantities_measurements': 'Invalidmeasurements'})
        response = self.client_as_a_buyer.post(
            url, invalid_data, format='json')

        self.assertEqual(response.status_code, 400)
        response_listing = self.client_as_a_buyer.get(url)
        json_response = response_listing.json()

        self.assertEqual(json_response['results'], [])

#     def test_rfq_pagination(self):
#         url = reverse('buyer-rfqs-list')
# 
#         # Create multiple RFQs to trigger pagination
#         for _ in range(15):
#             self.client_as_a_buyer.post(url, self.valid_data, format='json')
#             time.sleep(1000)
# 
#         response_listing = self.client_as_a_buyer.get(url)
#         self.assertEqual(response_listing.status_code, 200)
# 
#         json_response = response_listing.json()
#         self.assertEqual(len(json_response['results']), 14)
#         self.assertTrue('next' in json_response or 'previous' in json_response)
#         self.assertLessEqual(len(json_response['result']), 10)

    def test_unauthorized_access(self):
        url = reverse('buyer-rfqs-list')
        self.client_as_a_buyer.logout()
        response = self.client_as_a_buyer.get(url)
        self.assertEqual(response.status_code, 401)


class TestSuggestionGenericViewset(APITestCase):
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
        
        self.seller2 = User.objects.create_user(
            first_name='John',
            last_name='Gabriel',
            email='gabriel@gmail.com',
            country='NG',
            role='Seller',
            phone_number='+23448093484617',
            password='password'
        )

        self.product = Product.objects.create(
            title="Women Shoes",
            description="Women shoes for all occasions",
            price=100.00,
            seller=self.seller
        )
        self.product2 = Product.objects.create(
            title='Cereal',
            description='Cereal for breakfast',
            price=200.00,
            seller=self.seller
        )
        
        self.product3 = Product.objects.create(
            title='Red Kettle',
            description='Electric kettle for boiling water',
            price=300.00,
            seller=self.seller2
        )
        
        self.product7 = Product.objects.create(
            title='Black Kettle',
            description='Electric kettle for boiling water',
            price=300.00,
            seller=self.seller
        )
        
        self.product4 = Product.objects.create(
            title='iPhone 16',
            description='The latest iPhone in the market',
            price=400.00,
            seller=self.seller2
        )
        
        self.product6 = Product.objects.create(
            title='iPhone 12',
            description='The latest iPhone in the market',
            price=400.00,
            seller=self.seller2
        )
        
        self.product5 = Product.objects.create(
            title='Samsung Galaxy S20',
            description='The latest Samsung phone in the market',
            price=500.00,
            seller=self.seller
        )
        
        self.product8 = Product.objects.create(
            title='MacOs System',
            description='The latest MacOs in the market',
            price=2000.00,
            seller=self.seller
        )
        
        self.product9 = Product.objects.create(
            title='Apple',
            description='The latest Apple in the market',
            price=200.00,
            seller=self.seller
        )
        
        self.product10 = Product.objects.create(
            title='Pineapple',
            description='Fresh pineapple',
            price=100.00,
            seller=self.seller2
        )
        
        self.product11 = Product.objects.create(
            title='Window10 System',
            description='The latest MacOs in the market',
            price=1500.00,
            seller=self.seller
        )
        
        self.product9 = Product.objects.create(
            title='Apple Watch',
            description='The latest Apple Watch in the market',
            price=500.00,
            seller=self.seller2
        )

        self.categories = Category.objects.create(name='Shoes')
        category2 = Category.objects.create(name='Agricultural')
        category3 = Category.objects.create(name='Wholesale Electronics')
        category4 = Category.objects.create(name='Fashion')
        category5 = Category.objects.create(name='Home Appliances')
        

        self.product.category.set([self.categories])
        self.product2.category.set([category2])
        self.product5.category.set([category3])
        self.product3.category.set([category5])
        self.product4.category.set([category3])
        self.product6.category.set([category3])
        self.product7.category.set([category5])
        self.product8.category.set([category3])
        self.product9.category.set([category3])
        self.product10.category.set([category2])
        self.product11.category.set([category3])
        
        self.client_as_a_buyer = APIClient()
        self.client_as_a_buyer.force_authenticate(user=self.buyer)
        self.client_as_a_seller = APIClient()
        self.client_as_a_seller.force_authenticate(user=self.seller)
        
    
    def test_product_creation_suggestion(self):
        url = reverse('suggestions')
        
        response = self.client_as_a_buyer.get(url, {'q': 'kettle'})
        self.assertEqual(response.status_code, 200)
        json_response = response.json()
        print('json_response: ', json_response)
        
        self.assertEqual(json_response, ['Red Kettle', 'Black Kettle'])
        self.assertIn('Red Kettle', json_response)
        self.assertNotIn('iPhone 16', json_response)
        self.assertEqual(len(json_response), 2)
    
    def test_suggestion_view_with_no_query(self):
        url = reverse('suggestions')
        
        response = self.client_as_a_buyer.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 0)
    
    def test_suggestion_view_limited_to_10_results(self):
        url = reverse('suggestions')
        
        # Test with an empty string
        response = self.client_as_a_buyer.get(url, {'q': ''})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 0)
        
        # Test quuery that returns all products
        response2 = self.client_as_a_buyer.get(url, {'q': 'e'})
        self.assertEqual(response2.status_code, 200)
        self.assertEqual(len(response2.json()), 10)
        self.assertIn('iPhone 16', response2.json())
        self.assertIn('Red Kettle', response2.json())
        self.assertIn('Apple', response2.json())
        self.assertIn('Pineapple', response2.json())
        self.assertIn('Cereal', response2.json())
        self.assertNotIn('Mango', response2.json())
        


