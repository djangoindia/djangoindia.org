from celery import shared_task

from django.conf import settings
from django.core.mail import send_mass_mail


@shared_task
def send_mass_update_email_task(update_id):
    from djangoindia.db.models.update import Update
    from djangoindia.db.models.communication import Subscriber
    try:
        update = Update.objects.get(id=update_id)
    except Update.DoesNotExist:
        raise ValueError(f"Update with id {update_id} not found.")

    email_objs = []
    for subscriber in update.recipients.all():
        if not subscriber.unsubscribe_token:
            subscriber.generate_unsubscribe_token()  
        unsubscribe_url = f"https://djangoindia.org/unsubscribe/{subscriber.unsubscribe_token}"
        email_tuple = (
            f"Django India: {update.get_formatted_type()}",
            f"{update.html_template}<br><br><a href='{unsubscribe_url}'>Click here to unsubscribe</a>", 
            settings.DEFAULT_FROM_EMAIL,
            [subscriber.email]  
        )
        email_objs.append(email_tuple)
    try:
        send_mass_mail((email for email in email_objs), fail_silently=False)
        update.mail_sent = True
        update.save()
    except Exception as e:
        # Didn't throw error at django level even for wrong emails.
        print(f"Failed to send email : {str(e)}")
