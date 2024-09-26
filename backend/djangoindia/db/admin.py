# from django.conf import settings
from django.contrib import admin

from .forms import EventForm, EmailForm, UpdateForm
from djangoindia.db.models.event import Event, EventRegistration,Sponsor,Sponsorship
from djangoindia.db.models.communication import Subscriber, ContactUs
from djangoindia.db.models.update import Update

from django.core.mail import send_mass_mail
from django.conf import settings
from django.shortcuts import redirect
from django.urls import path
from django.template.response import TemplateResponse
from django.contrib import messages
from django.core.exceptions import ValidationError
from django.db import transaction
from django.db.models import F, Count


# Register your models here.

@admin.action(description="Send email to selected users")
def send_email_to_selected_users(modeladmin, request, queryset):
    ids = queryset.values_list('id', flat=True)
    return redirect(f'send_email/?ids={",".join(map(str, ids))}')

class SponsorInline(admin.TabularInline):
    model = Sponsorship
    extra = 1 

class EventRegistrationInline(admin.TabularInline):
    model = EventRegistration
    extra = 0
    readonly_fields = [field.name for field in EventRegistration._meta.get_fields()]

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('name','city', 'start_date', 'event_mode', 'created_at')
    readonly_fields = ('created_at', 'updated_at','slug')
    search_fields=['name','city']
    form = EventForm
    inlines = [EventRegistrationInline,SponsorInline]


@admin.register(EventRegistration)
class EventRegistrationAdmin(admin.ModelAdmin):
    list_display = ('event', 'first_name', 'email', 'created_at')
    readonly_fields = ('created_at', 'updated_at')
    list_filter = ('event',)
    search_fields=['email','event__name','first_name','last_name',]
    actions = [send_email_to_selected_users]

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path('send_email/', self.admin_site.admin_view(self.send_email_view), name='send_email'),
        ]
        return custom_urls + urls

    @transaction.atomic
    def save_model(self, request, obj, form, change):
        # This is a new registration
        if not change:  
            if obj.event.seats_left > 0:
                obj.event.seats_left -= 1
                obj.event.save()
            else:
                raise ValidationError("No seats left for this event.")
        super().save_model(request, obj, form, change)

    @transaction.atomic
    def delete_model(self, request, obj):
        if obj.event.seats_left < obj.event.max_seats:
            obj.event.seats_left += 1
            obj.event.save()
        super().delete_model(request, obj)

    @transaction.atomic
    def delete_queryset(self, request, queryset):
        # Group registrations by event and count them
        event_counts = queryset.values('event').annotate(count=Count('id'))
        
        # Update seats_left for each affected event
        for event_count in event_counts:
            Event.objects.filter(id=event_count['event']).update(
                seats_left=F('seats_left') + event_count['count']
            )
        
        # Perform the actual deletion
        super().delete_queryset(request, queryset)

    def send_email_view(self, request):
        if request.method == 'POST':
            form = EmailForm(request.POST)
            if form.is_valid():
                try:
                    subject = form.cleaned_data['subject']
                    message = form.cleaned_data['message']
                    emails = []
                    from_email = settings.DEFAULT_FROM_EMAIL

                    registration_ids = request.GET.get('ids').split(',')
                    queryset = EventRegistration.objects.filter(id__in=registration_ids)

                    for registration in queryset:
                        recipient_email = registration.email 
                        emails.append((subject, message, from_email, [recipient_email]))

                    send_mass_mail(emails, fail_silently=False)
                    messages.success(request, f"{len(emails)} emails sent successfully.")
                    return redirect('../')
                except Exception as e:
                    messages.error(request, f"Error sending emails: {str(e)}")
        else:
            form = EmailForm()

        context = {
            'form': form,
            'opts': self.model._meta,
            'queryset': request.GET.get('ids').split(','),
        }
        return TemplateResponse(request, 'admin/send_email.html', context)


@admin.register(Subscriber)
class SubscriberAdmin(admin.ModelAdmin):
    list_display = ('email', 'created_at')
    readonly_fields = ('created_at', 'updated_at')
    ordering = ('-created_at',)
    search_fields = ['name', 'email',]

@admin.register(ContactUs)
class ContactUsAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'email', 'created_at')
    readonly_fields = ('created_at', 'updated_at')
    ordering = ('-created_at',)
    search_fields = ['email',]

@admin.register(Sponsorship)
class SponsorshipAdmin(admin.ModelAdmin):
    list_display = ('sponsor_details', 'tier', 'type', 'event')
    list_filter = ('type', 'event', 'tier')
    search_fields = ['sponsor_details__name',]
    readonly_fields = ('created_at', 'updated_at')

@admin.register(Sponsor)
class SponsorAdmin(admin.ModelAdmin):
    list_display = ['name', 'type', 'email']
    search_fields = ['name',]
    readonly_fields = ('created_at', 'updated_at')
    
#email sending functionality and update registration
@admin.register(Update)
class UpdateAdmin(admin.ModelAdmin):
    form = UpdateForm
    list_display = ('title', 'type', 'created_by', 'created_at', 'mail_sent')
    search_fields = ['title','created_by__username','created_by__first_name','type']
    readonly_fields = ('created_by', 'created_at', 'updated_at')
    actions = ['send_update']

    def save_model(self, request, obj, form, change):
        obj.created_by = request.user
        super().save_model(request, obj, form, change)
    
    def send_update(self, request, queryset):
        for update in queryset:
            update.send_bulk_emails()
        self.message_user(request, "Update emails sent.")
    send_update.short_description = "Send selected updates to subscribers"
