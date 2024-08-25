from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RegisterViewSet, CustomTokenObtainPairView, GoogleLogin

router = DefaultRouter()
router.register(r'register', RegisterViewSet, basename='register')

urlpatterns = [
    path('', include(router.urls)),
    path('login/', CustomTokenObtainPairView.as_view(), name='login'),
    path('accounts/', include('allauth.urls')),
    path('google-login/', GoogleLogin.as_view(), name='google_login'),
]
