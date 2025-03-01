import logging

from celery import shared_task

from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags


logger = logging.getLogger(__name__)


@shared_task
def welcome_email_task(first_name, email):
    """
    Send a welcome email to a newly registered user.

    Args:
        user_id (int): ID of the newly registered user
    """
    try:
        context = {"first_name": first_name}

        html_content = render_to_string("admin/welcome_mail.html", context)
        plain_text_content = strip_tags(html_content)

        email = EmailMultiAlternatives(
            subject="Welcome to Django India Community!",
            body=plain_text_content,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[email],
        )

        email.attach_alternative(html_content, "text/html")

        email.send(fail_silently=False)

        logger.info(f"Welcome email sent to {email}")

    except Exception as e:
        logger.error(f"Error sending welcome email to user {email}: {str(e)}")
        raise
