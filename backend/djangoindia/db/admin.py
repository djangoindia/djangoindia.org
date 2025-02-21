# from django.conf import settings
from import_export import fields, resources
from import_export.admin import ImportExportModelAdmin
from import_export.widgets import ForeignKeyWidget

from django.conf import settings
from django.contrib import admin, messages
from django.db import transaction
from django.db.models import Count, F
from django.http import HttpResponseRedirect
from django.shortcuts import redirect, render
from django.template.response import TemplateResponse
from django.urls import path

from djangoindia.bg_tasks.event_tasks import (
    rsvp_confirmation_email_task,
    send_mass_mail_task,
)
from djangoindia.db.models import (
    CommunityPartner,
    ContactUs,
    Event,
    EventRegistration,
    EventUserRegistration,
    SocialLoginConnection,
    Sponsor,
    Sponsorship,
    Subscriber,
    Update,
    User,
    Volunteer,
)

from .forms import EmailForm, EventForm, PromoteFromWaitlistForm, UpdateForm


@admin.action(description="Send email to selected users")
def send_email_to_selected_users(modeladmin, request, queryset):
    ids = queryset.values_list("id", flat=True)
    return redirect(f'send_email/?ids={",".join(map(str, ids))}')


class SponsorInline(admin.TabularInline):
    model = Sponsorship
    extra = 1


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ("name", "city", "start_date", "event_mode", "created_at")
    readonly_fields = ("created_at", "updated_at", "slug")
    search_fields = ["name", "city"]
    form = EventForm
    inlines = [SponsorInline]
    filter_horizontal = ("volunteers",)


class EventRegistrationResource(resources.ModelResource):
    class Meta:
        model = EventRegistration


class EventUserRegistrationResource(resources.ModelResource):
    class Meta:
        model = EventUserRegistration


@admin.register(EventRegistration)
class EventRegistrationAdmin(ImportExportModelAdmin):
    def get_model_perms(self, request):
        perms = super().get_model_perms(request)
        perms["view"] = True
        return perms

    def has_add_permission(self, request):
        return False

    def has_change_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False

    list_display = (
        "event",
        "first_name",
        "email",
        "created_at",
        "attendee_type",
        "first_time_attendee",
    )
    readonly_fields = ("created_at", "updated_at", "first_time_attendee")
    list_filter = ("event__name", "attendee_type", "first_time_attendee")
    search_fields = [
        "email",
        "event__name",
        "first_name",
        "last_name",
        "first_time_attendee",
        "attendee_type",
    ]
    raw_id_fields = ("event",)
    actions = [send_email_to_selected_users]
    resource_class = EventRegistrationResource

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path(
                "send_email/",
                self.admin_site.admin_view(self.send_email_view),
                name="send_email",
            ),
        ]
        return custom_urls + urls

    @transaction.atomic
    def delete_model(self, request, obj):
        if obj.event.seats_left < obj.event.max_seats:
            obj.event.seats_left += 1
            obj.event.save()
        super().delete_model(request, obj)

    @transaction.atomic
    def delete_queryset(self, request, queryset):
        # Group registrations by event and count them
        event_counts = queryset.values("event").annotate(count=Count("id"))

        # Update seats_left for each affected event
        for event_count in event_counts:
            Event.objects.filter(id=event_count["event"]).update(
                seats_left=F("seats_left") + event_count["count"]
            )

        # Perform the actual deletion
        super().delete_queryset(request, queryset)

    def send_email_view(self, request):
        if request.method == "POST":
            form = EmailForm(request.POST)
            if form.is_valid():
                try:
                    subject = form.cleaned_data["subject"]
                    message = form.cleaned_data["message"]
                    emails = []
                    from_email = settings.DEFAULT_FROM_EMAIL

                    registration_ids = request.GET.get("ids").split(",")
                    queryset = EventRegistration.objects.filter(id__in=registration_ids)

                    for registration in queryset:
                        recipient_email = registration.email
                        emails.append((subject, message, from_email, [recipient_email]))

                    send_mass_mail_task.delay(emails, fail_silently=False)
                    messages.success(
                        request, f"{len(emails)} emails sent successfully."
                    )
                    return redirect("../")
                except Exception as e:
                    messages.error(request, f"Error sending emails: {str(e)}")
        else:
            form = EmailForm()

        context = {
            "form": form,
            "opts": self.model._meta,
            "queryset": request.GET.get("ids").split(","),
        }
        return TemplateResponse(request, "admin/send_email.html", context)


@admin.register(Subscriber)
class SubscriberAdmin(admin.ModelAdmin):
    list_display = ("email", "created_at")
    readonly_fields = ("created_at", "updated_at")
    ordering = ("-created_at",)
    search_fields = [
        "name",
        "email",
    ]


@admin.register(ContactUs)
class ContactUsAdmin(admin.ModelAdmin):
    list_display = ("first_name", "email", "created_at")
    readonly_fields = ("created_at", "updated_at")
    ordering = ("-created_at",)
    search_fields = [
        "email",
    ]


class SponsorshipResource(resources.ModelResource):
    sponsor_name = fields.Field(
        column_name="sponsor_name",
        attribute="sponsor_details",
        widget=ForeignKeyWidget(Sponsor, "name"),
    )
    sponsor_email = fields.Field(
        column_name="sponsor_email", attribute="sponsor_details__email"
    )
    sponsor_url = fields.Field(
        column_name="sponsor_url", attribute="sponsor_details__url"
    )

    class Meta:
        model = Sponsorship
        fields = (
            "id",
            "sponsor_name",
            "sponsor_email",
            "sponsor_url",
            "tier",
            "type",
            "amount_inr",
            "created_at",
            "updated_at",
        )
        export_order = fields


@admin.register(Sponsorship)
class SponsorshipAdmin(ImportExportModelAdmin):
    list_display = ("sponsor_details", "tier", "type", "event")
    list_filter = ("type", "event", "tier")
    search_fields = [
        "sponsor_details__name",
    ]
    readonly_fields = ("created_at", "updated_at")
    resource_class = SponsorshipResource

    def get_export_queryset(self, request):
        return super().get_export_queryset(request).select_related("sponsor_details")


@admin.register(Sponsor)
class SponsorAdmin(admin.ModelAdmin):
    list_display = ["name", "type", "email"]
    search_fields = [
        "name",
    ]
    readonly_fields = ("created_at", "updated_at")


# email sending functionality and update registration
@admin.register(Update)
class UpdateAdmin(admin.ModelAdmin):
    form = UpdateForm
    list_display = ("email_subject", "type", "created_at", "mail_sent")
    search_fields = ["email_subject", "type"]
    readonly_fields = ("created_at", "updated_at")
    actions = ["send_update"]

    @admin.action(description="Send selected updates to subscribers")
    def send_update(self, request, queryset):
        for update in queryset:
            update.send_bulk_emails()
        self.message_user(request, "Update emails sent.")


@admin.register(CommunityPartner)
class CommunityPartnerAdmin(admin.ModelAdmin):
    list_display = [
        "name",
        "website",
        "contact_name",
        "contact_email",
        "contact_number",
        "description",
    ]
    search_fields = ["name"]
    readonly_fields = ("created_at", "updated_at")


class EventVolunteerResource(resources.ModelResource):
    class Meta:
        model = Volunteer
        fields = ("id", "name", "about", "email", "twitter", " linkedin")


@admin.register(Volunteer)
class EventVolunteerAdmin(ImportExportModelAdmin):
    list_display = ["name", "about", "email"]
    search_fields = ["events__name", "name", "email"]
    readonly_fields = ("created_at", "updated_at")
    list_filter = ("events__name",)
    resource_class = EventVolunteerResource
    filter_horizontal = ("events",)


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = (
        "username",
        "email",
        "first_name",
        "last_name",
        "is_active",
        "is_superuser",
        "is_email_verified",
    )
    list_filter = (
        "is_active",
        "is_staff",
        "is_superuser",
        "is_email_verified",
        "gender",
    )
    search_fields = ("username", "email", "first_name", "last_name")
    readonly_fields = ("created_at", "updated_at")
    filter_horizontal = (
        "groups",
        "user_permissions",
    )
    fieldsets = (
        (None, {"fields": ("username", "email", "password")}),
        (
            "Personal info",
            {
                "fields": (
                    "first_name",
                    "last_name",
                    "avatar",
                    "cover_image",
                    "gender",
                    "organization",
                    "mobile_number",
                    "bio",
                    "about",
                    "website",
                    "linkedin",
                    "github",
                    "twitter",
                    "instagram",
                    "country",
                    "user_timezone",
                )
            },
        ),
        (
            "Permissions",
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                    "is_email_verified",
                    "is_password_expired",
                    "is_onboarded",
                ),
            },
        ),
        ("Important dates", {"fields": ("created_at", "updated_at")}),
    )
    ordering = ("-created_at",)


@admin.register(SocialLoginConnection)
class SocialLoginConnectionAdmin(admin.ModelAdmin):
    list_display = ["user", "provider", "created_at"]
    search_fields = ["user__username", "user__email"]
    readonly_fields = ("created_at", "updated_at")
    ordering = ("-created_at",)

    def provider(self, obj):
        return obj.medium


@admin.register(EventUserRegistration)
class EventUserRegistrationAdmin(ImportExportModelAdmin):
    list_display = ["user", "event", "status", "first_time_attendee", "created_at"]
    search_fields = ["user__username", "user__email", "event__name"]
    readonly_fields = ("created_at", "updated_at", "first_time_attendee")
    list_filter = ("event", "status", "first_time_attendee")
    ordering = ("-created_at",)
    resource_class = EventUserRegistrationResource

    actions = [
        "move_selected_from_waitlist_to_rsvped",
        "move_n_from_waitlist_to_rsvped",
        "move_selected_from_rsvped_to_cancelled",
        send_email_to_selected_users,
    ]

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path(
                "move-from-waitlist/",
                self.admin_site.admin_view(self.move_from_waitlist_view),
                name="move-from-waitlist",
            ),
            path(
                "send_email/",
                self.admin_site.admin_view(self.send_email_view),
                name="send_email",
            ),
        ]
        return custom_urls + urls

    def move_selected_from_waitlist_to_rsvped(self, request, queryset):
        """Promote only selected waitlisted registrations"""
        waitlisted = queryset.filter(
            status=EventUserRegistration.RegistrationStatus.WAITLISTED
        )
        if not waitlisted.exists():
            self.message_user(
                request, "No waitlisted registrations selected.", level=messages.WARNING
            )
            return

        # Group by event to check seat availability
        events = {}
        for reg in waitlisted:
            events[reg.event_id] = events.get(reg.event_id, 0) + 1

        # Check if we have enough seats
        for event_id, seats_needed in events.items():
            event = Event.objects.get(id=event_id)
            if event.seats_left < seats_needed:
                self.message_user(
                    request,
                    f"Not enough seats available for event '{event.name}'. "
                    f"Needed: {seats_needed}, Available: {event.seats_left}",
                    level=messages.ERROR,
                )
                return

        # Promote selected registrations
        promoted_count = 0
        for event_id, seats_needed in events.items():
            # Get event once and update at the end
            event = Event.objects.get(id=event_id)

            # Promote selected registrations
            event_promotions = waitlisted.filter(event_id=event_id)
            for registration in event_promotions:
                registration.status = EventUserRegistration.RegistrationStatus.RSVPED
                registration.save()
                promoted_count += 1
                rsvp_confirmation_email_task(registration.user.email, event_id)

            # Update event seats once after all promotions
            event.seats_left -= seats_needed
            event.save()

        self.message_user(
            request,
            f"Successfully promoted {promoted_count} registrations to registered status.",
        )

    move_selected_from_waitlist_to_rsvped.short_description = "Move selected to rsvped"

    def move_selected_from_rsvped_to_cancelled(self, request, queryset):
        """Move selected registrations from RSVPED to CANCELLED"""
        waitlisted = queryset.filter(
            status=EventUserRegistration.RegistrationStatus.RSVPED
        )
        if not waitlisted.exists():
            self.message_user(
                request, "No RSVPED registrations selected.", level=messages.WARNING
            )
            return

        # Group by event to check seat availability
        events = {}
        for reg in waitlisted:
            events[reg.event_id] = events.get(reg.event_id, 0) + 1

        # Move selected registrations
        moved_count = 0
        for event_id, seats_freed in events.items():
            # Get event once and update at the end
            event = Event.objects.get(id=event_id)

            # Moved selected registrations
            event_promotions = waitlisted.filter(event_id=event_id)
            for registration in event_promotions:
                registration.status = EventUserRegistration.RegistrationStatus.CANCELLED
                registration.save()
                moved_count += 1

            # Update event seats once after all promotions
            event.seats_left += seats_freed
            event.save()

        self.message_user(
            request,
            f"Successfully moved {moved_count} registrations from RSVPEDto cancelled.",
        )

    move_selected_from_rsvped_to_cancelled.short_description = (
        "Move selected from rsvped to cancelled"
    )

    def move_n_from_waitlist_to_rsvped(self, request, queryset):
        """Promote N people from waitlist to registered status"""
        # Check if multiple events are selected
        events = set(queryset.values_list("event", flat=True))
        if len(events) > 1:
            self.message_user(
                request,
                "Please select registrations from only one event at a time.",
                level=messages.ERROR,
            )
            return

        # Get the event
        event = Event.objects.get(id=events.pop())

        # Show the intermediate form
        context = {
            "form": PromoteFromWaitlistForm(
                initial={"_selected_action": queryset.values_list("id", flat=True)}
            ),
            "event": event,
            "waitlist_count": EventUserRegistration.objects.filter(
                event=event, status=EventUserRegistration.RegistrationStatus.WAITLISTED
            ).count(),
            "seats_left": event.seats_left,
            "title": f"Move from waitlist - {event.name}",
        }
        return render(request, "admin/move_from_waitlist.html", context)

    move_n_from_waitlist_to_rsvped.short_description = (
        "Move N people from waitlist to rsvped"
    )

    def move_from_waitlist_view(self, request):
        """Handle the form submission for promoting from waitlist"""
        if request.method == "POST":
            form = PromoteFromWaitlistForm(request.POST)
            if form.is_valid():
                number_to_promote = form.cleaned_data["number_to_promote"]
                event_id = request.POST.get("event_id")
                event = Event.objects.get(id=event_id)

                if event.seats_left < number_to_promote:
                    self.message_user(
                        request,
                        f"Cannot promote {number_to_promote} people. Only {event.seats_left} seats available.",
                        level=messages.ERROR,
                    )
                else:
                    # Get the next N people from waitlist ordered by created_at
                    to_promote = EventUserRegistration.objects.filter(
                        event=event,
                        status=EventUserRegistration.RegistrationStatus.WAITLISTED,
                    ).order_by("created_at")[:number_to_promote]

                    promoted_count = 0
                    for registration in to_promote:
                        registration.status = (
                            EventUserRegistration.RegistrationStatus.RSVPED
                        )
                        registration.save()
                        promoted_count += 1
                        event.seats_left -= 1
                        rsvp_confirmation_email_task(registration.user.email, event.id)

                    if promoted_count > 0:
                        event.save()

                    self.message_user(
                        request,
                        f"Successfully promoted {promoted_count} people from the waitlist.",
                    )

                return HttpResponseRedirect("../")
        return HttpResponseRedirect("../")

    def send_email_view(self, request):
        if request.method == "POST":
            form = EmailForm(request.POST)
            if form.is_valid():
                try:
                    subject = form.cleaned_data["subject"]
                    message = form.cleaned_data["message"]
                    emails = []
                    from_email = settings.DEFAULT_FROM_EMAIL

                    registration_ids = request.GET.get("ids").split(",")
                    queryset = EventUserRegistration.objects.filter(
                        id__in=registration_ids
                    )

                    for registration in queryset:
                        recipient_email = registration.user.email
                        emails.append((subject, message, from_email, [recipient_email]))

                    send_mass_mail_task.delay(emails, fail_silently=False)
                    messages.success(
                        request, f"{len(emails)} emails sent successfully."
                    )
                    return redirect("../")
                except Exception as e:
                    messages.error(request, f"Error sending emails: {str(e)}")
        else:
            form = EmailForm()

        context = {
            "form": form,
            "opts": self.model._meta,
            "queryset": request.GET.get("ids").split(","),
        }
        return TemplateResponse(request, "admin/send_email.html", context)
