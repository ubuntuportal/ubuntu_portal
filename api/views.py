from rest_framework import viewsets
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.exceptions import NotFound
from .models import Product, Category, Order
from django.db.models import Q
from .serializers import ProductSerializer, CategorySerializer, OrderSerializer, CartItemSerializer, CartSerializer
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

        # General filtering applied to all requests
        price_min = self.request.query_params.get('price_min')
        price_max = self.request.query_params.get('price_max')
        category = self.request.query_params.get('category')

        if price_min:
            queryset = queryset.filter(price__gte=price_min)

        if price_max:
            queryset = queryset.filter(price__lte=price_max)

        if category:
            queryset = queryset.filter(category__name__icontains=category)

        return queryset

    @action(detail=False, methods=['get'], url_path='search')
    def search(self, request):
        queryset = self.get_queryset()
        search_query = request.query_params.get('q')
        if search_query:
            queryset = queryset.filter(
                Q(title__icontains=search_query) |
                Q(description__icontains=search_query) |
                Q(seller__email__icontains=search_query)  # Updated field lookup
            )

        # apply pagination
        paginated_queryset = get_paginated_queryset(queryset, request)
        serializer = self.get_serializer(paginated_queryset, many=True)
        return Response(serializer.data)


    @action(detail=False, methods=['get'], url_path='filter')
    def filter(self, request):
        queryset = self.get_queryset()
        queryset = ApplyAdvanceFiltering().get_queryset(queryset, request)

        # Apply pagination
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



class CategoryViewSet(viewsets.ModelViewSet):
    """
    A viewset for handling CRUD operations on the Category model.

    Permissions:
    - **IsAuthenticatedOrReadOnly**: Allows unauthenticated users to view categories,
    but restricts creating, updating, or deleting categories to authenticated users.
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        # Optionally, you can add additional logic here
        serializer.save()

class CartViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def list(self, request):
        """Retrieve the current user's cart."""
        cart, created = Cart.objects.get_or_create(user=request.user)
        serializer = CartSerializer(cart)
        return Response(serializer.data)

    @transaction.atomic
    def create(self, request):
        """Add an item to the cart or update its quantity."""
        product_id = request.data.get('product_id')
        quantity = request.data.get('quantity', 1)
        variation_id = request.data.get('variation_id')

        product = get_object_or_404(Product, id=product_id)
        cart, created = Cart.objects.get_or_create(user=request.user)

        cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)

        if variation_id:
            variation = get_object_or_404(ProductVariation, id=variation_id)
            cart_item.variation = variation

        cart_item.quantity += quantity
        cart_item.save()

        serializer = CartItemSerializer(cart_item)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def retrieve(self, request, pk=None):
        """Retrieve details of a specific cart item."""
        cart_item = get_object_or_404(CartItem, id=pk, cart__user=request.user)
        serializer = CartItemSerializer(cart_item)
        return Response(serializer.data)

    @transaction.atomic
    def update(self, request, pk=None):
        """Update the quantity or variation of a cart item."""
        cart_item = get_object_or_404(CartItem, id=pk, cart__user=request.user)
        quantity = request.data.get('quantity')
        variation_id = request.data.get('variation_id')

        if quantity is not None:
            cart_item.quantity = quantity

        if variation_id:
            variation = get_object_or_404(ProductVariation, id=variation_id)
            cart_item.variation = variation

        cart_item.save()

        serializer = CartItemSerializer(cart_item)
        return Response(serializer.data)

    def destroy(self, request, pk=None):
        """Remove a specific item from the cart."""
        cart_item = get_object_or_404(CartItem, id=pk, cart__user=request.user)
        cart_item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=False, methods=['delete'])
    def clear_cart(self, request):
        """Clear all items from the user's cart."""
        cart = get_object_or_404(Cart, user=request.user)
        cart.items.all().delete()
        return Response({"message": "Cart cleared."}, status=status.HTTP_204_NO_CONTENT)

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
