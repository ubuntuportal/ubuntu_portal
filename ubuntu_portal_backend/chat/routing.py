# A file equivalent to url but for the consumers
from django.urls import re_path
from .consumers import *

websocket_urlpatterns = [
    # WebSocker URL. End point should be ws://127.0.0.1:8000/ws/chat/{{chat_id}}/
    re_path(r"ws/chat/(?P<room_name>\w+)/$", ChatConsumer.as_asgi()),
]
