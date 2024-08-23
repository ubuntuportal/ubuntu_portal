from django.urls import path, include
from rest_framework.routers import DefaultRouter
from products.views import ProductViewSet, CategoryViewSet, ManageProductsViewSet
from orders.views import OrderViewSet
from rfqs.views import QuotationViewSet, RFQViewSet
from carts.views import CartViewSet


router = DefaultRouter()

router.register(r'products', ProductViewSet, basename='product')
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'cart', CartViewSet, basename='cart')
router.register(r'orders', OrderViewSet, basename='order')
router.register(r'suppliers/orders', OrderViewSet, basename='supplier-order')
router.register(r'suppliers/products', ManageProductsViewSet, basename='supplier-products')
router.register(r'quotations', QuotationViewSet)
router.register(r'rfqs', RFQViewSet, basename='buyer-rfqs')


urlpatterns = [
    path('api/', include(router.urls)),
]
