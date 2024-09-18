from rest_framework import serializers
from .models import RFQ, Quotation


class RFQSerializer(serializers.ModelSerializer):
    class Meta:
        model = RFQ
        fields = '__all__'
        read_only_fields = ['buyer']

    def create(self, validated_data):
        # Automatically set the buyer as the logged-in user
        validated_data['buyer'] = self.context['request'].user

        return super().create(validated_data)


class QuotationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quotation
        fields = '__all__'
        read_only_fields = ['quotation_date', 'total_price']

    def create(self, validated_data):
        # Automatically set the seller as the logged-in user
        validated_data['seller'] = self.context['request'].user

        # Get the RFQ instance from the validated data
        rfq = validated_data.get('rfq')

        if not rfq:
            raise serializers.ValidationError("RFQ must be provided.")

        # Calculate total_price using sourcing_quantity from the related RFQ
        validated_data['total_price'] = rfq.sourcing_quantity * \
            validated_data['quoted_price_per_unit']

        return super().create(validated_data)
