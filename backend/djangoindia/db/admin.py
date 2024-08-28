# from django.conf import settings
from django.contrib import admin

from .forms import EventForm, EmailForm
from djangoindia.db.models.event import Event, EventRegistration,Sponsor,Sponsorship
from djangoindia.db.models.communication import NewsletterSubscription, ContactUs

from django.core.mail import send_mass_mail
from django.conf import settings
from django.shortcuts import redirect
from django.urls import path
from django.template.response import TemplateResponse
from django.contrib import messages


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
    readonly_fields = ('created_at', 'updated_at')
    search_fields=['name','city']
    form = EventForm
    inlines = [EventRegistrationInline,SponsorInline]


@admin.register(EventRegistration)
class EventRegistrationAdmin(admin.ModelAdmin):
    readonly_fields = ('created_at', 'updated_at')
    search_fields=['email','event__name','first_name','last_name',]
    actions = [send_email_to_selected_users]

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path('send_email/', self.admin_site.admin_view(self.send_email_view), name='send_email'),
        ]
        return custom_urls + urls

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


@admin.register(NewsletterSubscription)
class EventRegistrationAdmin(admin.ModelAdmin):
    readonly_fields = ('created_at', 'updated_at')

@admin.register(ContactUs)
class EventRegistrationAdmin(admin.ModelAdmin):
    readonly_fields = ('created_at', 'updated_at')
    

class SponsorshipAdmin(admin.ModelAdmin):
    list_display = ('sponsor_details', 'tier', 'type', 'event')
    list_filter = ('type', 'event','tier')
    search_fields=['sponsor_details__name',]
    readonly_fields = ('created_at', 'updated_at')

admin.site.register(Sponsorship, SponsorshipAdmin)

@admin.register(Sponsor)
class SponsorAdmin(admin.ModelAdmin):
    list_display = ['name', 'type', 'email']
    search_fields=['name',]
    readonly_fields = ('created_at', 'updated_at')