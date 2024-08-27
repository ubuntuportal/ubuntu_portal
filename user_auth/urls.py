from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (RegisterViewSet, CustomTokenObtainPairView, ForgotPasswordView,
                    ResetPasswordView, GoogleLogin, ActivateAccountView)

router = DefaultRouter()
router.register(r'register', RegisterViewSet, basename='register')

urlpatterns = [
    path('', include(router.urls)),
    path('login/', CustomTokenObtainPairView.as_view(), name='login'),
    path('accounts/', include('allauth.urls')),
    path('google-login/', GoogleLogin.as_view(), name='google_login'),
    path('activate-account/<uidb64>/<token>/', ActivateAccountView.as_view(), name='activate-account'),
    path('forgot-password/', ForgotPasswordView.as_view(), name='forgot-password'),
    path('reset-password/', ResetPasswordView.as_view(), name='reset-password'),
]
