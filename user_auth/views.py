from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import AllowAny
from .serializers import (RegisterSerializer, CustomTokenObtainPairSerializer, ForgotPasswordSerializer,
                          ResetPasswordSerializer)
from django.contrib.auth import get_user_model
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from dj_rest_auth.registration.views import SocialLoginView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.urls import reverse
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes


User = get_user_model()

class RegisterViewSet(viewsets.ModelViewSet):
    """
    A viewset for handling user registration.

    This viewset provides the functionality to register a new user to the platform.

    - **Create**: Handles user registration by accepting the required data, validating it, and saving the new user to the database.

    Permissions:
    - **AllowAny**: This viewset is accessible to anyone, including unauthenticated users, allowing them to register.

    Methods:
    - `create(request, *args, **kwargs)`: Custom implementation of the create method to handle user registration.
      Validates the provided data and saves a new user to the database if validation is successful.
      Returns a success message upon successful registration.

    Example Request:
    ```
    POST /register/
    {
        "username": "newuser",
        "password": "password123",
        "email": "newuser@example.com"
    }
    ```

    Response:
    ```
    {
        "message": "User registered successfully"
    }
    ```
    """
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)

class CustomTokenObtainPairView(TokenObtainPairView):
    """
    A custom view for handling JWT token generation upon user login.

    This view extends the default `TokenObtainPairView` provided by Django REST framework SimpleJWT.

    - **Create**: Handles the generation of a pair of JWT tokens (access and refresh) upon successful authentication.

    Permissions:
    - **AllowAny**: This view is accessible to anyone, allowing both authenticated and unauthenticated users to request tokens.

    Serializer:
    - Uses a custom serializer (`CustomTokenObtainPairSerializer`) to handle the token creation logic.
    """
    serializer_class = CustomTokenObtainPairSerializer

class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter

    def get_response(self):
        original_response = super().get_response()
        user = self.user

        refresh = RefreshToken.for_user(user)
        token_data = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }

        original_response.data.update(token_data)
        return original_response


class ForgotPasswordView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = ForgotPasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = User.objects.get(email=serializer.validated_data['email'])
        token = default_token_generator.make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.pk))

        reset_url = request.build_absolute_uri(
            reverse('reset-password') + f'?uid={uid}&token={token}'
        )
        send_mail(
            'Password Reset Request',
            f'Click the link to reset your password: {reset_url}',
            'ubuntuportal60@gmail.com',
            [user.email],
            fail_silently=False,
        )

        return Response({"message": "Password reset link sent to your email."}, status=status.HTTP_200_OK)


class ResetPasswordView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = ResetPasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"message": "Password reset successful."}, status=status.HTTP_200_OK)
