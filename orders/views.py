from rest_framework import viewsets
from .models import Order
from .serializers import OrderSerializer
from rest_framework.response import Response
from rest_framework.decorators import action


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

