import logging

from celery import shared_task

from django.conf import settings
from django.core.mail import EmailMultiAlternatives, send_mass_mail
from django.template.loader import render_to_string
from django.utils import timezone
from django.utils.html import strip_tags

from djangoindia.db.models import EventRegistration


logger = logging.getLogger(__name__)


def format_text(text: str) -> str:
    words = text.split("_")
    formatted_words = [word.capitalize() for word in words]
    return " ".join(formatted_words)


@shared_task
def registration_confirmation_email_task(email, event_id):
    try:
        registration = EventRegistration.objects.get(email=email, event_id=event_id)
        context = {
            "first_name": registration.first_name,
            "event": {
                "name": registration.event.name,
                "start_date": timezone.localtime(registration.event.start_date),
                "end_date": timezone.localtime(registration.event.end_date),
                "event_mode": format_text(registration.event.event_mode),
                "venue": registration.event.venue,
                "description": registration.event.description,
                "cover_image": registration.event.cover_image
                if registration.event.cover_image
                else None,
            },
        }
        html_content = render_to_string("admin/registration_success.html", context)
        # Strip the HTML tags for a plain text alternative
        text_content = strip_tags(html_content)

        subject = f"{registration.event.name} - Registration Successful!"
        from_email = settings.DEFAULT_FROM_EMAIL
        to_email = [email]

        msg = EmailMultiAlternatives(subject, text_content, from_email, to_email)
        msg.attach_alternative(html_content, "text/html")
        msg.send()

    except Exception as e:
        # Handle exceptions (e.g., logging, re-raising, etc.)
        print(f"Error sending email: {e}")


@shared_task(bind=True, max_retries=3)
def send_mass_mail_task(self, emails, **kwargs):
    """
    Converts django.core.mail.send_mass_email into a background task.

    - Args:
        emails (list): List of email data tuples (subject, message, from_email, recipient_list).
        kwargs: Additional arguments passed to `send_mass_mail`.

    Returns:
        same as `send_mass_mail`
    """
    if not isinstance(emails, (list, tuple)):
        logger.exception(
            "Invalid input: Emails must be a list or tuple of email data tuples."
        )

    try:
        return send_mass_mail(emails, **kwargs)
    except Exception:
        logger.exception("Failed to send mass emails.")
        logger.debug("Detailed exception information:", exc_info=True)
