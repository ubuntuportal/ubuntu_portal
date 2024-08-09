from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet
# from users.views import UserViewSet
# from orders.views import OrderViewSet

router = DefaultRouter()

router.register(r'products', ProductViewSet)



urlpatterns = [
    # path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    # path('users/', include('django.contrib.auth.urls')),  # For login, logout, password reset, etc.
]
