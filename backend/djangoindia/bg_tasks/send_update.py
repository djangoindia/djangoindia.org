from celery import shared_task
from django.utils.html import strip_tags
from django.conf import settings
from django.core.mail import EmailMultiAlternatives
import logging

logger = logging.getLogger(__name__)


@shared_task
def send_mass_update_email_task(update_id):
    from djangoindia.db.models.update import Update

    try:
        update = Update.objects.get(id=update_id)
    except Update.DoesNotExist:
        raise ValueError("Update not found")
    
    logger.info(f"Starting email task for update ID {update_id} with {update.recipients.count()} recipients.")

    failed_recipients = []

    for subscriber in update.recipients.all():
        try:
            plain_text_content = strip_tags(update.html_template)

            email = EmailMultiAlternatives(
                subject=f"Django India: {update.get_formatted_type()}",
                body=plain_text_content,
                from_email=settings.DEFAULT_FROM_EMAIL,
                to=[subscriber.email],
            )

            email.attach_alternative(update.html_template, "text/html")

            email.send(fail_silently=False)
        
        except Exception as e:
            logger.error(f"Failed to send email to {subscriber.email}: {str(e)}")
            failed_recipients.append(subscriber.email)

    if not failed_recipients:
        try:
            update.mail_sent = True
            update.save()
            logger.info(f"Email task completed successfully for update ID {update_id}.")
        except Exception as e:
            logger.error(f"Failed to update mail_sent status for update ID {update_id}: {str(e)}")
    else:
        logger.warning(f"Email task for update ID {update_id} completed with errors. Failed recipients: {failed_recipients}")