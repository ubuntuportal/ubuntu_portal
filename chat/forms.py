from django import forms
from django.forms import ModelForm

from .models import *


class MessageForm(ModelForm):
    class Meta:
        model = Message
        fields = ['body']
        widgets = {
            'body': forms.TextInput(
                attrs={'placeholder': 'Add message ...', 'class': 'p-4 text-black', 'maxlength': '300',
                       'autofocus': True}),
        }


class ChatForm(ModelForm):
    class Meta:
        model = Chat
        fields = ['members']
