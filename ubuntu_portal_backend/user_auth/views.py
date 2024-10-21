from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import AllowAny
from .serializers import (RegisterSerializer, CustomTokenObtainPairSerializer, ForgotPasswordSerializer,
                          ResetPasswordSerializer, UserProfileSerializer, CompanySerializer)
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
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.utils.encoding import force_str
from django.shortcuts import get_object_or_404
from .utils import generate_activation_token, send_email_async
from django.conf import settings
import logging
import jwt
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from .models import CustomUser, Company


User = get_user_model()


class RegisterViewSet(viewsets.ModelViewSet):

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



class ProfileViewSet(viewsets.ModelViewSet):
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return CustomUser.objects.filter(id=self.request.user.id)

    def get_object(self):
        return self.request.user


class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_authenticated:
            return Company.objects.filter(user=self.request.user)
        else:
            return Company.objects.none()

