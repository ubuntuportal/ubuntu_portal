from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework import filters, status
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.exceptions import NotFound
from django.db import transaction
from django.shortcuts import get_object_or_404
from .models import Product, Category, Order, Cart, CartItem, OrderItem, ProductVariation, Quotation, RFQ
from django.db.models import Q
from .serializers import (ProductSerializer, CategorySerializer, OrderSerializer,
                          QuotationSerializer, CartSerializer, RFQSerializer)
from .utils import IsSeller, ApplyAdvanceFiltering, get_paginated_queryset
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status




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

class CartViewSet(viewsets.ModelViewSet):
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Cart.objects.filter(user=self.request.user)

    @action(detail=False, methods=['post'])
    @transaction.atomic
    def add_item(self, request):
        cart, created = Cart.objects.get_or_create(user=request.user)
        product = get_object_or_404(Product, id=request.data.get('product_id'))
        variation = get_object_or_404(ProductVariation, id=request.data.get('variation_id')) if request.data.get('variation_id') else None
        quantity = int(request.data.get('quantity', 1))

        cart_item, item_created = CartItem.objects.get_or_create(cart=cart, product=product, variation=variation)

        # Update quantity
        cart_item.quantity = quantity
        cart_item.save()

        if item_created:
            return Response({'success': 'Item added to cart'}, status=status.HTTP_201_CREATED)
        return Response({'success': 'Cart item updated'}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['put'])
    def update_item(self, request, pk=None):
        cart_item = get_object_or_404(CartItem, id=pk)
        cart_item.quantity = int(request.data.get('quantity', cart_item.quantity))
        cart_item.variation_id = request.data.get('variation_id', cart_item.variation_id)
        cart_item.save()
        return Response({'success': 'Cart item updated'}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['delete'])
    def remove_item(self, request, pk=None):
        cart_item = get_object_or_404(CartItem, id=pk)
        cart_item.delete()
        return Response({'success': 'Item removed from cart'}, status=status.HTTP_204_NO_CONTENT)

    @action(detail=False, methods=['delete'])
    def clear_cart(self, request):
        cart = get_object_or_404(Cart, user=request.user)
        cart.items.all().delete()
        return Response({'success': 'Cart cleared'}, status=status.HTTP_204_NO_CONTENT)


    @action(detail=False, methods=['post'])
    @transaction.atomic
    def checkout(self, request):
        user = request.user
        cart = get_object_or_404(Cart, user=user)

        # Extract additional fields from the request
        shipping_address = request.data.get('shipping_address', '')
        payment_method = request.data.get('payment_method', '')

        # Create a new order with additional fields
        order = Order.objects.create(
            user=user,
            shipping_address=shipping_address,
            payment_method=payment_method
        )

        # Move CartItems to OrderItems
        for cart_item in cart.items.all():
            OrderItem.objects.create(
                order=order,
                product=cart_item.product,
                variation=cart_item.variation,
                quantity=cart_item.quantity,
                price_at_purchase=cart_item.get_total_price()
            )

        # Update the total amount of the order
        order.update_total_amount()

        # Clear the cart
        cart.items.all().delete()

        return Response({'success': 'Order placed successfully', 'order_id': order.id}, status=status.HTTP_201_CREATED)


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


    @action(detail=True, methods=['put'], url_name='status')
    def update_status(self, request, pk=None):
        order = self.get_object()
        status = request.data.get('status')
        tracking_number = request.data.get('tracking_number')
        if status:
            order.status = status
            if tracking_number:
                order.tracking_number = tracking_number
            order.save()
            return Response({'success': 'Order status updated'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Status field is required'}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['get'], url_path='history')
    def history(self, request):
        history = Order.objects.filter(items__product__seller=request.user)
        if history:
            serializer = self.get_serializer(history, many=True)
            return Response(serializer.data)


# I choose to create a new class for supplier to manage
# their products as we are going to keep working on it

class ManageProductsViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(items__product__seller=self.request.user)

    def perform_create(self, serializer):
        serializer.save(seller=self.request.user)


class QuotationViewSet(viewsets.ModelViewSet):
    queryset = Quotation.objects.all()
    serializer_class = QuotationSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        # Ensure the supplier is the logged-in user
        serializer.save(seller=self.request.user)


class RFQViewSet(viewsets.ModelViewSet):
    queryset = RFQ.objects.all()
    serializer_class = RFQSerializer
