from django.urls import path
from .views import *

urlpatterns = [
    path('start/', start_conversation, name='start_conversation'),
    path('<int:conversation_id>/', get_conversation, name='get_conversation'),
    path('', conversations, name='conversations')
]
