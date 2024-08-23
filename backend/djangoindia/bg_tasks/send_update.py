from celery import shared_task
from django.core.mail import send_mail
from djangoindia.db.models.update import Update
from django.conf import settings

@shared_task
def send_update_email(update_id):
    update = Update.objects.get(pk=update_id)
    for subscription in update.recipients.all():
        try:
            send_mail(
                subject=f"DjangoIndia Update: {update.name}",
                message=update.content,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[subscription.email],
                fail_silently=False,
            )
            update.sent_successfully.add(subscription)
        except Exception as e:
            #stored failted email
            update.failed_to_send.add(subscription)
            print(f"Failed to send email to {subscription.email}: {str(e)}")
    
    update.save()