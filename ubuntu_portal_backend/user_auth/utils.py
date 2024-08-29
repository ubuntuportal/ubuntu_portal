import jwt
from datetime import datetime, timedelta
from django.conf import settings
from django.core.mail import send_mail
from .tasks import send_email_task


def generate_activation_token(user):
    expiration = datetime.now() + timedelta(hours=120)
    payload = {
        'user_id': str(user.id),
        'exp': expiration
    }
    return jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')


def email_sender(subject, message, recipient_list):
    if isinstance(recipient_list, str):
        recipient_list = [recipient_list]

    send_mail(
        subject,
        message,
        'noreply@ubuntu_portal.com',
        recipient_list,
        fail_silently=False
    )


def send_email_async(email_subject, message, recipient_list):
    return send_email_task.delay(email_subject, message, recipient_list)
