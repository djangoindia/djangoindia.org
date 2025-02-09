# Django imports
# Third party imports
from celery import shared_task

from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags


@shared_task
def forgot_password_task(first_name, email, uidb64, token):
    try:
        current_site = settings.WEB_URL

        realtivelink = "/reset-password/?uidb64=" + uidb64 + "&token=" + token
        abs_url = str(current_site) + realtivelink
        from_email_string = settings.DEFAULT_FROM_EMAIL

        subject = "A new password to your Django India account has been requested"

        context = {
            "first_name": first_name,
            "forgot_password_url": abs_url,
            "email": email,
        }

        html_content = render_to_string("auth/forgot_password.html", context)

        text_content = strip_tags(html_content)

        msg = EmailMultiAlternatives(
            subject=subject,
            body=text_content,
            from_email=from_email_string,
            to=[email],
        )
        msg.attach_alternative(html_content, "text/html")
        msg.send()
        return
    except Exception as e:
        # Print logs if in DEBUG mode
        if settings.DEBUG:
            print(e)
        return
