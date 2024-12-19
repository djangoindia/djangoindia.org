import logging

from celery import shared_task

from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.utils.safestring import mark_safe


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
    logger.info(
        f"Starting email task for update ID {update_id} with {recipients.count()} recipients."
    )

    failed_recipients = []

    for recipient in recipients:
        try:
            html_content = render_to_string(
                "admin/update_mail.html",
                {"body": mark_safe(update.email_body), "subscriber": recipient},
            )
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
            # No exception is raise even when mail is not sent.
            # TODO: Plan and Handle this thing
            failed_recipients.append({"email": recipient.email, "error": str(e)})

    if failed_recipients:
        detailed_errors = "\n".join(
            [f"{item['email']}: {item['error']}" for item in failed_recipients]
        )
        logger.warning(
            f"Email task for update ID {update_id} completed with errors:\n{detailed_errors}"
        )
    else:
        update.mail_sent = True
        update.save()
        logger.info(f"Email task for update ID {update_id} completed successfully.")
