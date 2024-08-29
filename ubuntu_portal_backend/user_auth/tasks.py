from celery import shared_task
from django.core.mail import send_mail

@shared_task
def send_email_task(subject, message, recipient_list):
    if isinstance(recipient_list, str):
        recipient_list = [recipient_list]

    send_mail(
        subject,
        message,
        'noreply@ubuntuportal.com',
        recipient_list,
        fail_silently=False
    )
