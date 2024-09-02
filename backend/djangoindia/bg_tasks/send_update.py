from celery import shared_task
from django.core.mail import send_mass_mail

from django.conf import settings

@shared_task
def send_mass_update_email_task(update_id):
    from djangoindia.db.models.update import Update
    try:
        update = Update.objects.get(id=update_id)
    except Update.DoesNotExist:
        raise ValueError("Update not found")
    
    email_objs=[]
    for subscriber in update.recipients.all():
        email_tuple = (
            f"Django India: {update.get_formatted_type()}", 
            update.html_template,    
            settings.DEFAULT_FROM_EMAIL,
            [subscriber.email],
        )
        email_objs.append(email_tuple)
    try:
        send_mass_mail((email for email in email_objs), fail_silently=False)
    except Exception as e:
        # Didn't threw error at django level even for wrong emails.
        print(f"Failed to send email : {str(e)}")