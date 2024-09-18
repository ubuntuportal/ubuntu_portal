from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_decode
from django_countries.widgets import CountrySelectWidget
from .models import UserProfile, Company  # Import the Company model

User = get_user_model()

class UserProfileSerializer(serializers.ModelSerializer):
    """Serializer for the UserProfile model."""

    class Meta:
        model = UserProfile
        fields = ('bio', 'profile_picture', 'address', 'city', 'state', 'zipcode')

class CompanySerializer(serializers.ModelSerializer):
    """Serializer for the Company model."""

    class Meta:
        model = Company
        fields = ('company_name', 'company_logo', 'company_website', 'contact_person', 'contact_email', 'contact_phone')

class CustomUserSerializer(serializers.ModelSerializer):
    """Serializer for the User model, including profile and company information."""

    profile = UserProfileSerializer()  # Nest the UserProfileSerializer
    company = CompanySerializer()      # Nest the CompanySerializer

    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'email', 'country', 'phone_number', 'role', 'profile', 'company')
        read_only_fields = ('id',)  # Make ID read-only

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile', None)
        company_data = validated_data.pop('company', None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # Update related profile fields if present
        if profile_data:
            profile = instance.profile
            for attr, value in profile_data.items():
                setattr(profile, attr, value)
            profile.save()

        # Update related company fields if present
        if company_data:
            company, created = Company.objects.get_or_create(user=instance)
            for attr, value in company_data.items():
                setattr(company, attr, value)
            company.save()

        return instance

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    role = serializers.CharField(required=True)
    profile = UserProfileSerializer(required=False)  # Add profile to registration
    company = CompanySerializer(required=False)      # Add company to registration

    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'email', 'country', 'phone_number', 'password', 'password2', 'role', 'profile', 'company')
        widgets = {"country": CountrySelectWidget()}

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        profile_data = validated_data.pop('profile', None)  # Remove profile data from main user creation
        company_data = validated_data.pop('company', None)  # Remove company data from main user creation

        user = User.objects.create(
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            email=validated_data['email'],
            country=validated_data['country'],
            phone_number=validated_data['phone_number'],
            role=validated_data['role'],
        )
        user.set_password(validated_data['password'])
        user.save()

        # Create a user profile if provided
        if profile_data:
            UserProfile.objects.create(user=user, **profile_data)

        # Create a company if provided
        if company_data:
            Company.objects.create(user=user, **company_data)

        return user

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        # Add custom claims
        data['role'] = self.user.role

        # Add user details
        data['user'] = {
            'id': self.user.id,
            'first_name': self.user.first_name,
            'last_name': self.user.last_name,
            'email': self.user.email,
        }

        return data

class ForgotPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        if not User.objects.filter(email=value).exists():
            raise serializers.ValidationError("This email is not registered.")
        return value

class ResetPasswordSerializer(serializers.Serializer):
    new_password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)
    uid = serializers.CharField()
    token = serializers.CharField()

    def validate(self, data):
        if data['new_password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords do not match.")
        try:
            uid = urlsafe_base64_decode(data['uid']).decode()
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            raise serializers.ValidationError("Invalid token or user ID.")

        if not default_token_generator.check_token(user, data['token']):
            raise serializers.ValidationError("Invalid or expired token.")
        return data

    def save(self, **kwargs):
        uid = self.validated_data['uid']
        user = User.objects.get(pk=urlsafe_base64_decode(uid).decode())
        user.set_password(self.validated_data['new_password'])
        user.save()
