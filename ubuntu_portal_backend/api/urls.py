from django.urls import path, include
from rest_framework.routers import DefaultRouter
from products.views import ProductViewSet, CategoryViewSet, ManageProductsViewSet
from orders.views import OrderViewSet, BillingInfoViewSet, ContactInfoViewSet, ShippingInfoViewSet
from rfqs.views import QuotationViewSet, RFQViewSet, SuggestionGenericViewSet, RfQNotifications
from carts.views import CartViewSet


router = DefaultRouter()

router.register(r'products', ProductViewSet, basename='product')
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'cart', CartViewSet, basename='cart')
router.register(r'orders', OrderViewSet, basename='order')
router.register(r'billing_info/orders', BillingInfoViewSet, basename='Billing_Info')
router.register(r'shipping_info/orders', ShippingInfoViewSet, basename='Shipping_Info')
router.register(r'contact_info/orders', ContactInfoViewSet, basename='Contact_Info')
router.register(r'suppliers/orders', OrderViewSet, basename='supplier-order')
router.register(r'suppliers/products', ManageProductsViewSet, basename='supplier-products')
router.register(r'quotations', QuotationViewSet, basename='seller-quotations')
router.register(r'rfqs', RFQViewSet, basename='buyer-rfqs')


urlpatterns = [
    path('api/', include(router.urls)),
    path('api/suggestions/', SuggestionGenericViewSet.as_view(), name='suggestions'),
    path('api/notifications/', RfQNotifications.as_view(), name='rfq-notification'),
]
