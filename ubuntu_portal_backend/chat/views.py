from django.contrib.auth import get_user_model
from django.shortcuts import render
from .models import Conversation
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import ConversationListSerializer, ConversationSerializer
from django.db.models import Q
from django.shortcuts import redirect, reverse

User = get_user_model()

@api_view(['POST'])
def start_conversation(request, ):
    data = request.data
    email = data.pop('email') # get the receiver email

    # check if the receiver exists
    try:
        participant = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({'message': 'You cannot chat with a non existent user'})

    # get the conversations where buyer = user & seller = participant or buyer = participant & seller = user
    conversation = Conversation.objects.filter(Q(buyer=request.user, seller=participant) |
                                               Q(buyer=participant, seller=request.user))

    # if the conversation exists, redirect to that conversation
    if conversation.exists():
        return redirect(reverse('get_conversation', args=(conversation[0].id,)))
    # else create a new conversation
    else:
        conversation = Conversation.objects.create(buyer=request.user, seller=participant)
        return Response(ConversationSerializer(instance=conversation).data)


@api_view(['GET'])
def get_conversation(request, conversation_id):
    conversation = Conversation.objects.filter(id=conversation_id) # get the conversation

    # check if the conversation exists, then return, else return error
    if not conversation.exists():
        return Response({'message': 'Conversation does not exist'})
    else:
        serializer = ConversationSerializer(instance=conversation.first())
        return Response(serializer.data)


@api_view(['GET'])
def conversations(request):
    # get all conversations and serialize them
    conversation_list = Conversation.objects.filter(Q(buyer=request.user) |
                                                    Q(seller=request.user))
    serializer = ConversationListSerializer(instance=conversation_list, many=True)
    return Response(serializer.data)
