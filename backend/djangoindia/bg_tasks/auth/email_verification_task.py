# Third party imports
from celery import shared_task

from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags


@shared_task
def email_verification_task(first_name, email, token, current_site):
    try:
        realtivelink = "/email-verify/" + "?token=" + str(token)
        abs_url = current_site + realtivelink

        from_email_string = settings.DEFAULT_FROM_EMAIL

        subject = "Verify your Email!"

        context = {
            "first_name": first_name,
            "verification_url": abs_url,
        }

        html_content = render_to_string("auth/email_verification.html", context)

        text_content = strip_tags(html_content)

        msg = EmailMultiAlternatives(subject, text_content, from_email_string, [email])
        msg.attach_alternative(html_content, "text/html")
        msg.send()
        return
    except Exception as e:
        # Print logs if in DEBUG mode
        if settings.DEBUG:
            print(e)
        return
