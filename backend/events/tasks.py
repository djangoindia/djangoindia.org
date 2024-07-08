from celery import shared_task
from .utils import send_registration_confirmation_email as send_email_sync

@shared_task
def send_registration_confirmation_email(email, event_id):
    send_email_sync(email, event_id)
