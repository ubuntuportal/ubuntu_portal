from uuid import uuid4

from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()

# Conversation Object with buyer, seller, and start time.
# Ordered using start time
class Conversation(models.Model):
    chat_id = uuid4()
    buyer = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, related_name="buyer"
    )
    seller = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, related_name="seller"
    )
    start_time = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('-start_time',)


# Message Object with sender, text, and timestamp
# Ordered using timestamp
class Message(models.Model):
    message_id = uuid4()
    sender = models.ForeignKey(User, on_delete=models.SET_NULL,
                               null=True, related_name='message_sender')
    text = models.CharField(max_length=200, blank=True)
    conversation_id = models.ForeignKey(Conversation, on_delete=models.CASCADE, )
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('-timestamp',)
