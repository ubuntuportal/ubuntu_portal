from django.shortcuts import render, get_object_or_404, redirect, reverse


from django.http import HttpResponse
from django.http import Http404
from django.urls import reverse_lazy
from django.views import View

from .forms import *
from .models import *
from django.views.generic import ListView, CreateView, DeleteView, DetailView

from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from django.contrib import messages

User = get_user_model()


class ChatListView(ListView):
    model = Chat
    template_name = 'chats.html'
    success_url = '/'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['chats'] = Chat.objects.filter(members=self.request.user)
        context['users'] = User.objects.all()
        return context


class ChatView(DetailView):
    model = Chat
    template_name = 'chat.html'
    success_url = '/'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['chat'] = get_object_or_404(Chat, pk=self.kwargs.get('pk'))
        context['messages'] = Message.objects.filter(chat=self.kwargs.get('pk'))
        return context


class ChatCreateView(View):
    model = Chat
    # form_class = ChatForm
    # fields = ['messages']
    template_name = 'chat.html'
    success_url = '/'

    def post(self, request, *args, **kwargs):
        chat = Chat.objects.create()
        chat.members.add(self.request.user)
        chat.members.add(User.objects.get(username=self.kwargs.get('username')))
        chat.save()
        # form = ChatForm(request.POST)
        # if form.is_valid():
        #     chat = form.save(commit=False)
        #     chat.members.add(self.request.user)
        #     chat.members.add(User.objects.get(id=self.kwargs.get('username')))
        #     chat.save()
        return redirect('chat', chat.id)


class ChatDeleteView(DeleteView):
    model = Chat
    success_url = '/'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['chat'] = get_object_or_404(Chat, pk=self.kwargs.get('chat_id'))
        return context


class CreateMessageView(CreateView):
    model = Message
    form_class = MessageForm
    success_url = '/'

    def post(self, request, *args, **kwargs):
        message = Message.objects.create(
            chat_id=self.kwargs.get('pk'),
            sender=self.request.user,
            body=request.POST.get('message')
        )
        message.save()
        # form = MessageForm(request.POST)
        # if form.is_valid():
        #     message = form.save(commit=False)
        #     message.sender = self.request.user
        #     message.chat = get_object_or_404(Chat, pk=self.kwargs.get('chat_id'))
        #     message.save()
        return reverse_lazy('chat', message.chat)
