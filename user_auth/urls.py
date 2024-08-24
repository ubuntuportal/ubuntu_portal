from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (RegisterViewSet, CustomTokenObtainPairView, ForgotPasswordView,
                    ResetPasswordView)

router = DefaultRouter()
router.register(r'register', RegisterViewSet, basename='register')

urlpatterns = [
    path('', include(router.urls)),
    path('login/', CustomTokenObtainPairView.as_view(), name='login'),
    path('forgot-password/', ForgotPasswordView.as_view(), name='forgot-password'),
    path('reset-password/', ResetPasswordView.as_view(), name='reset-password'),
]
