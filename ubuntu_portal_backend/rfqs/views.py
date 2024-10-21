from rest_framework import viewsets, serializers
from rest_framework import generics
from .models import Quotation, RFQ
from products.models import Product
from products.serializers import ProductSerializer
from rest_framework.response import Response
from .serializers import QuotationSerializer, RFQSerializer
from rest_framework.permissions import IsAuthenticated
from django.core.exceptions import ValidationError
from django.shortcuts import get_object_or_404
from asgiref.sync import sync_to_async



class QuotationViewSet(viewsets.ModelViewSet):
    queryset = Quotation.objects.all()
    serializer_class = QuotationSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        # Retrieve the rfq_id from the request data
        rfq_id = self.request.data.get('rfq')
        if not rfq_id:
            raise serializers.ValidationError({"rfq": "This field is required."})

        # Fetch the RFQ object, or raise a 404 error if not found
        rfq = get_object_or_404(RFQ, id=rfq_id)

        # Save the Quotation with the current user as the seller and the fetched RFQ
        serializer.save(seller=self.request.user, rfq=rfq)

class RFQViewSet(viewsets.ModelViewSet):
    queryset = RFQ.objects.all()
    serializer_class = RFQSerializer

    def perform_create(self, serializer):
        # The context is automatically passed by DRF; no need to manually set the buyer here
        serializer.save()


class SuggestionGenericViewSet(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    
    def get_queryset(self):
        queryset = super().get_queryset()
        query = self.request.query_params.get('q', '')
        
        if query:
            queryset = queryset.filter(title__icontains=query)
        else:
            queryset = queryset.none()
        
        return queryset
    
    def list(self, request, *args, **kwargs):
        suggestions = self.get_queryset()[:10]
        data = [product.title for product in suggestions]
        return Response(data)
             

class RfQNotifications(generics.CreateAPIView):
    queryset = Product.objects.all()
    serializer_class = RFQSerializer
    
    async def perform_create(self, *args, **kwargs):
        try:
            product = await Product.objects.get(id=self.request.data['product'])
        except Product.DoesNotExist:
            raise ValidationError({'product_id': 'Product does not exist'})
        
        rfq = await RFQ.objects.create(
            buyer=self.request.user, 
            product=product,
            sourcing_quantity=self.request.data['sourcing_quantity'],
            quantities_measurements=self.request.data['quantities_measurements'],
            detailed_requirements=self.request.data['detailed_requirements'],
            unit_price=self.request.data['unit_price'],
            media=self.request.FILES.get('media', None)
        )
        
        await rfq.notify_suppliers()
        return rfq
    