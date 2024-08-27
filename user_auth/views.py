from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import AllowAny
from .serializers import (RegisterSerializer, CustomTokenObtainPairSerializer, ForgotPasswordSerializer,
                          ResetPasswordSerializer)
from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.urls import reverse
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.utils.encoding import force_str
from django.shortcuts import get_object_or_404
from .utils import generate_activation_token, send_email_async
from django.conf import settings
import logging
import jwt


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
        user = serializer.save(is_active=False)

        uuid = urlsafe_base64_encode(force_bytes(user.pk))
        token = generate_activation_token(user)
        link = reverse('activate-account',
                       kwargs={'uidb64': uuid, 'token': token})
        activate_url = request.build_absolute_uri(link)
        email_subject = 'Activate your account'
        message = f'Click the link to activate your account: {activate_url}'
        logger = logging.getLogger(__name__)
        try:
            send_email_async(
                email_subject,
                message,
                [user.email]
            )
        except Exception as e:
            logger.error(
                f"Failed to send activation email to {user.email}: {str(e)}")
            return Response({"error": "Failed to send activation email"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)


class ActivateAccountView(APIView):
    authenticated_classes = []
    permission_classes = [AllowAny]

    def get(self, request, uidb64, token):
        """
        view to verify the token and activate the user
        """
        try:
            id = force_str(urlsafe_base64_decode(uidb64))
            user = get_object_or_404(User, pk=id)

            # Decode and validate the token
            payload = jwt.decode(
                token, settings.SECRET_KEY, algorithms=['HS256'])
            if payload['user_id'] != str(user.id):
                return Response({"error": "Invalid or expired token"}, status=status.HTTP_400_BAD_REQUEST)

            if user.is_active == False:
                user.is_active = True
                user.save()
            else:
                return Response({"message": "User is already active"}, status=status.HTTP_400_BAD_REQUEST)

            return Response({"message": "User activated successfully"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": "Invalid activation link"}, status=status.HTTP_400_BAD_REQUEST)


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
