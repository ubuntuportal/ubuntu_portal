import json

from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer

from .models import Message, Conversation
from .serializers import MessageSerializer


# A class used to handle chat messages async
class ChatConsumer(WebsocketConsumer):
    room_name = None
    room_group_name = None

    # connect on the websocket
    def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"] # room name is the id of the conversation
        self.room_group_name = f"chat_{self.room_name}" # groups the participants to send and listen to messages

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name, self.channel_name
        )
        self.accept()

    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name, self.channel_name
        )

    # Receive message from WebSocket
    def receive(self, text_data=None, bytes_data=None):
        # parse the json data into dictionary object
        text_data_json = json.loads(text_data)

        # Send message to room group
        chat_type = {"type": "chat_message"}
        return_dict = {**chat_type, **text_data_json}
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            return_dict,
        )

    # Receive message from room group
    def chat_message(self, event):

        text_data_json = event.copy()
        # Get message data
        message = text_data_json["message"]
        conversation = Conversation.objects.get(id=int(self.room_name))
        sender = self.scope['user']

        # Create message
        _message = Message.objects.create(
            sender=sender,
            text=message,
            conversation_id=conversation,
        )
        serializer = MessageSerializer(instance=_message)

        # Send message to WebSocket
        self.send(
            text_data=json.dumps(
                serializer.data
            )
        )
