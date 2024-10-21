from rest_framework import viewsets
from .models import Order, ShippingInfo, BillingInfo, ContactInfo
from .serializers import OrderSerializer, BillingInfoSerializer, ShippingInfoSerializer, ContactInfoSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action


class BillingInfoViewSet(viewsets.ModelViewSet):
    queryset = BillingInfo.objects.all()
    serializer_class = BillingInfoSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ShippingInfoViewSet(viewsets.ModelViewSet):
    queryset = ShippingInfo.objects.all()
    serializer_class = ShippingInfoSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ContactInfoViewSet(viewsets.ModelViewSet):
    queryset = ContactInfo.objects.all()
    serializer_class = ContactInfoSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def get_queryset(self):
        # Handle schema generation case for drf_yasg
        if getattr(self, 'swagger_fake_view', False):
            return Order.objects.none()

        # Ensure the request has an authenticated user
        user = self.request.user
        if user.is_authenticated:
            return Order.objects.filter(user=user)
        else:
            return Order.objects.none()

    def perform_create(self, serializer):
        # Retrieve the related objects by their IDs
        billing_info_id = self.request.data.get('billing_info_id')
        shipping_info_id = self.request.data.get('shipping_info_id')
        contact_info_id = self.request.data.get('contact_info_id')

        try:
            # Fetch the related objects based on the provided IDs
            billing_info = BillingInfo.objects.get(id=billing_info_id)
            shipping_info = ShippingInfo.objects.get(id=shipping_info_id)
            contact_info = ContactInfo.objects.get(id=contact_info_id)
        except BillingInfo.DoesNotExist:
            return Response({'error': 'Invalid billing_info_id'}, status=status.HTTP_400_BAD_REQUEST)
        except ShippingInfo.DoesNotExist:
            return Response({'error': 'Invalid shipping_info_id'}, status=status.HTTP_400_BAD_REQUEST)
        except ContactInfo.DoesNotExist:
            return Response({'error': 'Invalid contact_info_id'}, status=status.HTTP_400_BAD_REQUEST)

        # Save the order, linking to the retrieved billing, shipping, and contact info
        serializer.save(
            user=self.request.user,
            billing_info=billing_info,
            shipping_info=shipping_info,
            contact_info=contact_info
        )

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
