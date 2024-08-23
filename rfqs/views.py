from rest_framework import viewsets, serializers
from .models import Quotation, RFQ
from .serializers import QuotationSerializer, RFQSerializer
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404



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
