from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import AllowAny
from .serializers import RegisterSerializer, CustomTokenObtainPairSerializer
from django.contrib.auth import get_user_model

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
