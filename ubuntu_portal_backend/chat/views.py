from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Conversation
from .serializers import ConversationListSerializer, ConversationSerializer
from django.contrib.auth import get_user_model
from django.db.models import Q

User = get_user_model()

class ConversationViewSet(viewsets.ViewSet):
    @action(detail=False, methods=['post'])
    def start_conversation(self, request):
        data = request.data
        email = data.pop('email')

        try:
            participant = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'message': 'You cannot chat with a non-existent user'})

        conversation = Conversation.objects.filter(Q(buyer=request.user, seller=participant) |
                                                   Q(buyer=participant, seller=request.user))

        if conversation.exists():
            return Response(ConversationSerializer(instance=conversation.first()).data)
        else:
            conversation = Conversation.objects.create(buyer=request.user, seller=participant)
            return Response(ConversationSerializer(instance=conversation).data)

    def retrieve(self, request, pk=None):
        conversation = Conversation.objects.filter(id=pk)
        if not conversation.exists():
            return Response({'message': 'Conversation does not exist'})
        else:
            serializer = ConversationSerializer(instance=conversation.first())
            return Response(serializer.data)

    def list(self, request):
        conversation_list = Conversation.objects.filter(Q(buyer=request.user) | Q(seller=request.user))
        serializer = ConversationListSerializer(instance=conversation_list, many=True)
        return Response(serializer.data)
