from channels.generic.websocket import AsyncWebsocketConsumer
import json


class NotficationConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user_id = self.scope['url_route']['kwargs']['user_id']
        self.group_name = f"notifications_{self.user_id}"
        
        await self.channel_layer.group_add(
            self.group_name,
            self.channel_name
        )
        
        self.accept()
    
    
    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.group_name,
            self.channel_name
        )
    
    # Receive message from WebSocket
    async def send_notification(self, event):
        notification = event['notification']
        
        await self.send(text_data=json.dumps(
            {
                'message': notification
            }
        ))