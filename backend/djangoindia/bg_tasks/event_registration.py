from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.conf import settings

from djangoindia.db.models import EventRegistration
from celery import shared_task

@shared_task
def registration_confirmation_email_task(email, event_id):
    try:
        registration = EventRegistration.objects.get(email=email, event_id=event_id)

        context = {
            'first_name': registration.first_name,
            'event': {
                'name': registration.event.name,
                'date_time': registration.event.date_time,
                'venue': registration.event.venue,
                'description': registration.event.description,
                'cover_image': registration.event.cover_image if registration.event.cover_image else None,
                'venue_map_link': registration.event.venue_map_link
            }
        }
        html_content = render_to_string('admin/registration_success.html', context)
        # Strip the HTML tags for a plain text alternative
        text_content = strip_tags(html_content)

        subject = f'{registration.event.name} - Event Registration Successful!'
        from_email = settings.DEFAULT_FROM_EMAIL
        to_email = [email]

        msg = EmailMultiAlternatives(subject, text_content, from_email, to_email)
        msg.attach_alternative(html_content, "text/html")
        msg.send()

    except Exception as e:
        # Handle exceptions (e.g., logging, re-raising, etc.)
        print(f"Error sending email: {e}")
