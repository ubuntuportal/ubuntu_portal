from user_auth.serializers import CustomUserSerializer
from .models import Conversation, Message
from rest_framework import serializers


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        exclude = ('conversation_id',)

# List conversations with buyer and seller and their last message for preview
class ConversationListSerializer(serializers.ModelSerializer):
    buyer = CustomUserSerializer()
    seller = CustomUserSerializer()
    last_message = serializers.SerializerMethodField()

    class Meta:
        model = Conversation
        fields = ['buyer', 'seller', 'last_message']

    @staticmethod
    def get_last_message(instance):
        message = instance.message_set.first()
        return MessageSerializer(instance=message)


# Conversation with buyer, seller and their messages
class ConversationSerializer(serializers.ModelSerializer):
    buyer = CustomUserSerializer()
    seller = CustomUserSerializer()
    message_set = MessageSerializer(many=True)

    class Meta:
        model = Conversation
        fields = ['buyer', 'seller', 'message_set']
