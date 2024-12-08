from celery import shared_task
from django.utils.html import strip_tags
from django.conf import settings
from django.core.mail import EmailMultiAlternatives
import logging
from django.template.loader import render_to_string
from djangoindia.db.models.communication import Subscriber

logger = logging.getLogger(__name__)


@shared_task
def send_mass_update_email_task(update_id):
    from djangoindia.db.models.update import Update

    try:
        update = Update.objects.prefetch_related("recipients").get(id=update_id)
    except Update.DoesNotExist:
        logger.error(f"Update with ID {update_id} not found.")
        return

    recipients = update.recipients.all()
    logger.info(f"Starting email task for update ID {update_id} with {recipients.count()} recipients.")

    failed_recipients = []

    for recipient in recipients:
        try:
            html_content = render_to_string("admin/send_update.html", {"update": update, "subscriber": recipient})
            plain_text_content = strip_tags(html_content)

            email = EmailMultiAlternatives(
                subject=update.email_subject,
                body=plain_text_content,
                from_email=settings.DEFAULT_FROM_EMAIL,
                to=[recipient.email],
            )

            email.attach_alternative(html_content, "text/html")
            email.send(fail_silently=False)

        except Exception as e:
            failed_recipients.append({"email": recipient.email, "error": str(e)})

    if failed_recipients:
        detailed_errors = "\n".join([f"{item['email']}: {item['error']}" for item in failed_recipients])
        logger.warning(f"Email task for update ID {update_id} completed with errors:\n{detailed_errors}")
    else:
        logger.info(f"Email task for update ID {update_id} completed successfully.")


    if not failed_recipients:
        try:
            update.mail_sent = True
            update.save()
        except Exception as e:
            logger.error(f"Failed to update mail_sent status for update ID {update_id}: {str(e)}")