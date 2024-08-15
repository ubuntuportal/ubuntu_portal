from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, CategoryViewSet, OrderViewSet
from .views import CartViewSet
# from users.views import UserViewSet
# from orders.views import OrderViewSet

router = DefaultRouter()

router.register(r'products', ProductViewSet, basename='product')
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'cart', CartViewSet, basename='cart')
router.register(r'orders', OrderViewSet, basename='order')



urlpatterns = [
    # path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    # path('users/', include('django.contrib.auth.urls')),  # For login, logout, password reset, etc.
]
