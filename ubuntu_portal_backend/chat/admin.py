from django.contrib import admin

from chat.models import *


# Register your models here.
@admin.register(Message)
class Admin(admin.ModelAdmin):
    list_display = ('sender', 'text', 'conversation_id', 'timestamp')

@admin.register(Conversation)
class ConversationAdmin(admin.ModelAdmin):
    list_display = ('buyer', 'seller', 'start_time')