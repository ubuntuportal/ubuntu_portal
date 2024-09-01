from django.urls import path
from .views import *
from django.contrib.auth.views import LoginView, LogoutView

urlpatterns = [
    path('', ChatListView.as_view(), name='main'),

    path('chat/<int:pk>/', ChatView.as_view(), name='chat'),
    path('create-chat/<str:username>', ChatCreateView.as_view(), name='create-chat'),
    path('delete-chat/<int:chat_id>/', ChatDeleteView.as_view(), name='delete-chat'),

    path('create-message/<int:pk>/', CreateMessageView.as_view(), name='create-message'),

    path('login/', LoginView.as_view(template_name="chats.html"), name='login'),
    path('logout/', LogoutView.as_view(template_name="chats.html"), name='logout'),

]