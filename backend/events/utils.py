from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.conf import settings
from .models import Event, EventRegistration

def send_registration_confirmation_email(email, event_id):
    try:
        # Get the event details
        event = Event.objects.get(pk=event_id)
        registration = EventRegistration.objects.get(email=email, event=event)

        # Render the HTML template
        context = {
            'first_name': registration.first_name,
            'event': {
                'name': event.name,
                'date_time': event.date_time,
                'venue': event.venue,
                'description': event.description,
                'cover_image': event.cover_image.url if event.cover_image else None,
                'venue_map_link': event.venue_map_link
            }
        }
        html_content = render_to_string('admin/registration_success.html', context)
        text_content = strip_tags(html_content)  # Strip the HTML tags for a plain text alternative

        # Create and send the email using EmailMultiAlternatives
        subject = 'Event Registration Successful'
        from_email = settings.DEFAULT_FROM_EMAIL
        to_email = [email]

        msg = EmailMultiAlternatives(subject, text_content, from_email, to_email)
        msg.attach_alternative(html_content, "text/html")
        msg.send()

    except Exception as e:
        # Handle exceptions (e.g., logging, re-raising, etc.)
        print(f"Error sending email: {e}")
