from channels.generic.websocket import WebsocketConsumer
from django.shortcuts import get_object_or_404
from django.template.loader import render_to_string
from asgiref.sync import async_to_sync
import json
from .models import *


class ChatConsumer(WebsocketConsumer):

    def __init__(self, *args, **kwargs):
        super().__init__(args, kwargs)
        self.chat_id = None
        self.chat = None
        self.user = None

    def connect(self):
        self.chat_id = self.scope['url_route']['kwargs']['chat_id']
        self.chat = get_object_or_404(Chat, pk=self.chat_id)
        self.user = self.scope['user']

        async_to_sync(self.channel_layer.group_add)(
            str(self.chat_id), self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            str(self.chat_id), self.channel_name
        )

    def receive(self, text_data=None, bytes_data=None):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        sender = text_data_json['sender']

        async_to_sync(self.channel_layer.group_send)(
            str(self.chat_id),
            {
                'type': 'chat_message',
                'message': message,
                'sender': sender,
            }
        )

    def chat_message(self, event):
        # message_id = event['message']
        # message = Message.objects.get(id=message_id)
        #
        # context = {
        #     'message': message,
        #     'user': self.user,
        #     'chat': self.chat
        # }
        #
        # html = render_to_string("chat.html", context=context)  # update this
        # self.send(text_data=html)
        message = event['message']
        sender = event['sender']

        # Send the message to WebSocket
        self.send(text_data=json.dumps({
            'message': message,
            'sender': sender,
        }))


