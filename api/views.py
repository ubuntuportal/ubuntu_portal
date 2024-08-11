from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.exceptions import PermissionDenied
from .models import Product
from .serializers import ProductSerializer
from .utils import IsSeller

class ProductViewSet(viewsets.ModelViewSet):
    """
    A viewset for handling CRUD operations on the Product model.

    This viewset provides the following functionalities:
    
    - **List**: Retrieve a list of products, with optional filtering and ordering by price and creation date.
    - **Retrieve**: Get details of a specific product.
    - **Create**: Add a new product to the platform (restricted to authenticated users with 'Seller' role).
    - **Update**: Modify an existing product (restricted to authenticated users with 'Seller' role).
    - **Partial Update**: Partially modify an existing product (restricted to authenticated users with 'Seller' role).
    - **Destroy**: Delete a product from the platform (restricted to authenticated users with 'Seller' role).

    Permissions:
    - **IsAuthenticatedOrReadOnly**: Allows unauthenticated users to view product listings and details, but restricts creating, updating, or deleting products to authenticated users.
    - **IsSeller**: Ensures that only users with the 'Seller' role can create, update, or delete products.

    Filtering and Ordering:
    - Supports filtering by `price` and `seller`.
    - Allows ordering by `price` and `created_at`.

    Methods:
    - `get_permissions()`: Determines the appropriate permissions based on the action being performed.
    - `perform_create(serializer)`: Custom method to set the seller field to the current authenticated user when creating a new product.
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['price', 'seller']
    ordering_fields = ['price', 'created_at']

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [IsAuthenticatedOrReadOnly()]
        elif self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsAuthenticated(), IsSeller()]
        return super().get_permissions()

    def perform_create(self, serializer):
        serializer.save(seller=self.request.user)
