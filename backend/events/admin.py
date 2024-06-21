# from django.conf import settings
from django.contrib import admin

from .forms import EventForm
from .models import Event, EventRegistration

# from django.core.mail import send_mass_mail


# Register your models here.

# @admin.action(description="Send email to selected users")
# def send_email_to_selected_users(modeladmin, request, queryset):
#     emails = []
#     subject = "Email subject"
#     message = "Email body"
#     from_email = settings.SENDER_EMAIL

#     for registration in queryset:
#         recipient_list = [registration.email]
#         emails.append((subject, message, from_email, recipient_list))

#     send_mass_mail(emails, fail_silently=False)
#     modeladmin.message_user(request, f"{len(emails)} emails sent successfully.")


class EventRegistrationInline(admin.TabularInline):
    model = EventRegistration
    extra = 0
    readonly_fields = [field.name for field in EventRegistration._meta.get_fields()]
    # actions = [send_email_to_selected_users]


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    form = EventForm
    inlines = [EventRegistrationInline]


admin.site.register(EventRegistration)
