from rest_framework import viewsets
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.exceptions import NotFound
from .models import Product
from django.db.models import Q
from .serializers import ProductSerializer
from .utils import IsSeller, ApplyAdvanceFiltering, get_paginated_queryset
from rest_framework.response import Response
from rest_framework.decorators import action



class ProductPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100


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
    pagination_class = ProductPagination
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['category', 'price']
    ordering_fields = ['price', 'created_at']

    def get_queryset(self):
        queryset = super().get_queryset()

        # general filtering applied to all request
        price_min = self.request.query_params.get('price_min')
        price_max = self.request.query_params.get('price_max')
        category = self.request.query_params.get('category')

        if price_min:
            queryset = queryset.filter(price__gte=price_min)

        if price_max:
            queryset = queryset.filter(price__lte=price_max)

        if category:
            queryset = queryset.filter(category__name__icontains=category)
            if not queryset.exists():
                return Response(queryset.none(), status=200)
        return queryset
    
    # custom action to search products
    @action(detail=False, methods=['get'], url_path='search')
    def search(self, request):
        queryset = self.get_queryset()
        search_query = request.query_params.get('q')
        if search_query:
            queryset = queryset.filter(
                Q(title__icontains=search_query) |
                Q(description__icontains=search_query) |
                Q(seller__name__icontains=search_query)
            )
        
        # apply pagination
        paginated_queryset = get_paginated_queryset(queryset, request)
        serializer = self.get_serializer(paginated_queryset, many=True)
        return Response(serializer.data)
    
    # custom action to apply advance filtering on products
    @action(detail=False, methods=['get'], url_path='filter')
    def filter(self, request):
        queryset = self.get_queryset()
        queryset = ApplyAdvanceFiltering().get_queryset(queryset, request)
        
        # apply pagination
        paginated_queryset = get_paginated_queryset(queryset, request)
        serializer = self.get_serializer(paginated_queryset, many=True)

        return Response(serializer.data)

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [IsAuthenticatedOrReadOnly()]
        elif self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsAuthenticated(), IsSeller()]
        return super().get_permissions()

    def perform_create(self, serializer):
        serializer.save(seller=self.request.user)