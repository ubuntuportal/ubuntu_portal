from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.exceptions import PermissionDenied
from .models import Product
from .serializers import ProductSerializer
from .utils import IsSeller

class ProductViewSet(viewsets.ModelViewSet):
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


