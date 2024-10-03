from rest_framework import viewsets
from .models import Cart, CartItem
from orders.models import Order, OrderItem, ShippingInfo, BillingInfo
from products.models import Product, ProductVariation
from django.db import transaction
from .serializers import CartSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from rest_framework.decorators import action


# Create your views here.


class CartViewSet(viewsets.ModelViewSet):

    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Handle schema generation case for drf_yasg
        if getattr(self, 'swagger_fake_view', False):
            return Cart.objects.none()

    # Ensure the request has an authenticated user
        user = self.request.user
        if not user.is_authenticated:
            return Cart.objects.none()

        return Cart.objects.filter(user=user)

    @action(detail=False, methods=['post'])
    @transaction.atomic
    def add_item(self, request):
        cart, created = Cart.objects.get_or_create(user=request.user)
        product = get_object_or_404(Product, id=request.data.get('product_id'))
        variation = get_object_or_404(ProductVariation, id=request.data.get(
            'variation_id')) if request.data.get('variation_id') else None
        quantity = int(request.data.get('quantity', 1))

        cart_item, item_created = CartItem.objects.get_or_create(
            cart=cart, product=product, variation=variation)

        # Update quantity
        cart_item.quantity = quantity
        cart_item.save()

        if item_created:
            return Response({'success': 'Item added to cart'}, status=status.HTTP_201_CREATED)
        return Response({'success': 'Cart item updated'}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['put'])
    def update_item(self, request, pk=None):
        cart_item = get_object_or_404(CartItem, id=pk)
        cart_item.quantity = int(request.data.get(
            'quantity', cart_item.quantity))
        cart_item.variation_id = request.data.get(
            'variation_id', cart_item.variation_id)
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
        billing_info_id = request.data.get('billing_info_id')
        shipping_info_id = request.data.get('shipping_info_id')
        payment_method = request.data.get('payment_method', '')

        # Ensure billing and shipping info are valid
        billing_info = get_object_or_404(
            BillingInfo, id=billing_info_id, user=user)
        shipping_info = get_object_or_404(
            ShippingInfo, id=shipping_info_id, user=user)

        # Create a new order with additional fields
        order = Order.objects.create(
            user=user,
            billing_info=billing_info,
            shipping_info=shipping_info,
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
