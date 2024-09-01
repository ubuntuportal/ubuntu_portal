import uuid

from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Chat(models.Model):
    c_id = uuid.uuid4()
    members = models.ManyToManyField(User, related_name='chat_members')
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created']
        verbose_name_plural = 'chats'
        verbose_name = 'chat'

    def __str__(self):
        return str(self.c_id)


class Message(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='message_owner')
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE, related_name='chat')
    created = models.DateTimeField(auto_now_add=True)
    body = models.CharField(max_length=300, blank=True, null=True)

    class Meta:
        ordering = ['created']
        verbose_name_plural = 'messages'
        verbose_name = 'message'

    def __str__(self):
        return f'{self.sender.username}: {self.body} at {self.created}'
