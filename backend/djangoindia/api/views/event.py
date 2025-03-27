from rest_framework import mixins, status, viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from django.core.exceptions import ValidationError
from django.db.models import Count, Prefetch, Q
from django.shortcuts import get_object_or_404
from django.utils import timezone

from djangoindia.api.serializers import (
    EventUserRegistrationSerializer,
)
from djangoindia.api.serializers.event import (
    EventAttendeeSerializer,
    EventLiteSerializer,
    EventRegistrationSerializer,
    EventSerializer,
)
from djangoindia.bg_tasks.event_tasks import (
    rsvp_confirmation_email_task,
    waitlist_confirmation_email_task,
)
from djangoindia.constants import POST
from djangoindia.db.models import (
    CommunityPartner,
    Event,
    EventRegistration,
    EventUserRegistration,
    Sponsorship,
    Volunteer,
)

from .base import BaseAPIView, BaseViewSet


# Create your views here.
class EventAttendeeViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    """
    API endpoint to retrieve a list of attendees for a specific event.

    Attendees are filtered by `include_in_attendee_list=True`.
    Provides statistics like total attendees and number of first-time attendees.
    """

    serializer_class = EventAttendeeSerializer

    def get_queryset(self):
        """
        Retrieve the queryset of attendees for the given event slug.

        Returns:
            tuple: A queryset of EventRegistration and the corresponding Event instance.
        """
        event_slug = self.kwargs.get("event_slug")
        event = get_object_or_404(Event, slug=event_slug)
        queryset = (
            EventRegistration.objects.filter(event__slug=event_slug)
            .select_related("event")
            .order_by("first_name", "last_name")
        )
        return queryset, event

    def list(self, request, *args, **kwargs):
        """
        List all attendees for a given event.

        Returns:
            Response: A JSON response containing event name, attendee stats, and attendee list.
        """
        queryset, event = self.get_queryset()
        serializer = self.get_serializer(
            queryset.filter(include_in_attendee_list=True), many=True
        )
        attendee_data = queryset.aggregate(
            total_attendees=Count("id"),
            first_time_attendees=Count("id", filter=Q(first_time_attendee=True)),
        )

        response_data = {
            "event_name": event.name,
            "total_attendees": attendee_data["total_attendees"],
            "first_time_attendees": attendee_data["first_time_attendees"],
            "attendees": serializer.data,
        }
        return Response(response_data)


class EventAPIView(BaseViewSet):
    """
    API ViewSet to manage event listings, detail retrieval, and user registrations.

    Supports listing all events, retrieving event details by slug,
    and registering for events via POST request.
    """

    model = Event
    lookup_field = "slug"
    permission_classes = [
        AllowAny,
    ]
    queryset = (
        Event.objects.all()
        .prefetch_related(
            Prefetch(
                "sponsors",
                queryset=Sponsorship.objects.filter(type="event_sponsorship")
                .select_related("sponsor_details")
                .only(
                    "tier",
                    "type",
                    "sponsor_details__url",
                    "sponsor_details__name",
                    "sponsor_details__type",
                    "sponsor_details__logo",
                ),
                to_attr="event_sponsors",
            ),
            Prefetch(
                "volunteers",
                queryset=Volunteer.objects.only(
                    "name", "photo", "about", "email", "twitter", "linkedin"
                ),
                to_attr="event_volunteers",
            ),
        )
        .order_by("-created_at")
    )

    def get_serializer_class(self):
        """
        Dynamically select the serializer based on the HTTP method.

        Returns:
            Serializer class depending on request method.
        """
        if self.request.method == POST:
            return EventRegistrationSerializer
        return EventLiteSerializer

    def list(self, request, *args, **kwargs):
        """
        List all events.

        Returns:
            Response: A list of serialized events including community partners.
        """
        queryset = self.get_queryset()
        all_community_partners = CommunityPartner.objects.all()
        serializer = self.get_serializer(
            queryset,
            many=True,
            context={"all_community_partners": all_community_partners},
        )
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        """
        Retrieve the details of a specific event by slug.

        Returns:
            Response: Serialized event details with related community partners.
        """
        instance = self.get_object()
        all_community_partners = CommunityPartner.objects.filter(
            created_at__lt=instance.created_at
        )
        serializer = EventSerializer(
            instance,
            context={
                "all_community_partners": all_community_partners,
                "request": request,
            },
        )
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        """
        Register a user for an event.

        Validates registration availability, prevents duplicates,
        and triggers confirmation emails.

        Returns:
            Response: Success or error message with appropriate status code.
        """
        try:
            event_id = request.data.get("event")
            email = request.data.get("email")

            event = self.get_event(event_id)
            self._validate_event_registration(event)
            self._check_existing_registration(email, event_id)

            self.create(request, *args, **kwargs)
            self._send_confirmation_email(email, event_id)

            return Response(
                {
                    "message": "You're in! We've sent a shiny email to your inbox. Time to celebrate!"
                },
                status=status.HTTP_201_CREATED,
            )
        except ValidationError as e:
            return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {"message": "An unexpected error occurred."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    def get_event(self, event_id):
        """
        Retrieve event instance by ID.

        Args:
            event_id (int): ID of the event.

        Returns:
            Event: Event instance if found.

        Raises:
            ValidationError: If event is not found.
        """
        try:
            return Event.objects.get(id=event_id)
        except Event.DoesNotExist:
            raise ValidationError("Event not found.")

    def _validate_event_registration(self, event):
        """
        Validate registration constraints for an event.

        Raises:
            ValidationError: If event registration is closed or full.
        """
        if event.registration_end_date <= timezone.now():
            raise ValidationError("Registration has already ended for this event.")
        if event.seats_left is None:
            raise ValidationError("Registration hasn't started yet.")
        if event.seats_left < 1:
            raise ValidationError(
                "Unfortunately, there are no more seats left for the event."
            )

    def _check_existing_registration(self, email, event_id):
        """
        Check if the user has already registered for the event.

        Raises:
            ValidationError: If registration already exists.
        """
        if EventRegistration.objects.filter(email=email, event=event_id).exists():
            raise ValidationError(
                "We get it, you're excited. But you've already secured your ticket!"
            )

    def _send_confirmation_email(self, email, event_id):
        """
        Trigger background task to send RSVP confirmation email.

        Args:
            email (str): User's email address.
            event_id (int): ID of the event.
        """
        rsvp_confirmation_email_task.delay(email, event_id)


class EventRegistrationView(BaseAPIView):
    """
    API view to manage user-specific event registration actions.

    Supports registration, RSVP updates, cancellation, and listing for a logged-in user.
    """

    permission_classes = [IsAuthenticated]
    serializer_class = EventUserRegistrationSerializer

    def post(self, request, event_slug):
        """
        Register an authenticated user for a specific event.

        Validates registration status and availability. Sends RSVP or waitlist emails.

        Args:
            request: HTTP request containing registration data.
            event_slug (str): Slug of the event to register for.

        Returns:
            Response: Registration result message with status code.
        """
        try:
            event = Event.objects.filter(slug=event_slug).first()
            if not event:
                return Response(
                    {"message": "Event not found"}, status=status.HTTP_404_NOT_FOUND
                )
            if not event.registrations_open:
                return Response(
                    {"message": "Event registrations are not yet open."},
                    status=status.HTTP_404_NOT_FOUND,
                )
            # Check if user is already registered
            existing_registration = EventUserRegistration.objects.filter(
                user=request.user, event=event
            ).first()

            if existing_registration:
                return Response(
                    {"message": "You are already registered for this event"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            if (
                event.seats_left < 1
                and request.data.get("status")
                != EventUserRegistration.RegistrationStatus.WAITLISTED
            ):
                return Response(
                    {"message": "User Registration must be added to Waitlist."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            serializer = self.serializer_class(
                data={
                    "rsvp_notes": request.data.get("rsvp_notes"),
                    "status": request.data.get("status"),
                },
                context={"request": request, "event": event},
            )
            if serializer.is_valid():
                registration = serializer.save()
                if (
                    registration.status
                    == EventUserRegistration.RegistrationStatus.RSVPED
                ):
                    rsvp_confirmation_email_task.delay(
                        registration.user.email, registration.event.id
                    )
                else:
                    waitlist_confirmation_email_task.delay(
                        registration.user.email, registration.event.id
                    )
                return Response(
                    {
                        "message": "Successfully RSVP'd for the event"
                        if registration.status
                        == EventUserRegistration.RegistrationStatus.RSVPED
                        else "You have been added to waitlist",
                        "data": serializer.data,
                    },
                    status=status.HTTP_201_CREATED,
                )
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response(
                {"message": "An error occurred"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    def put(self, request, event_slug):
        """
        Update RSVP notes or registration status for the user.

        Args:
            request: HTTP request containing updated data.
            event_slug (str): Slug of the event.

        Returns:
            Response: Success or error message based on update outcome.
        """
        try:
            registration = EventUserRegistration.objects.filter(
                user=request.user, event__slug=event_slug
            ).first()
            if not registration:
                return Response(
                    {"message": "Registration not found"},
                    status=status.HTTP_404_NOT_FOUND,
                )
            rsvp_notes = request.data.get("rsvp_notes")
            reg_status = request.data.get("status")
            if rsvp_notes is None:
                return Response(
                    {"message": "RSVP notes are required"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            serializer = self.serializer_class(
                registration,
                data={
                    "rsvp_notes": rsvp_notes,
                    "status": reg_status,
                },
            )
            if serializer.is_valid():
                serializer.save()
                return Response(
                    {
                        "message": "Registration note updated successfully",
                        "data": serializer.data,
                    }
                )
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response(
                {"message": "An error occurred"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    def delete(self, request, event_slug):
        """
        Cancel the user's event registration.

        Frees up a seat if RSVP'd and handles post-cancellation seat tracking.

        Args:
            request: HTTP request to delete registration.
            event_slug (str): Slug of the event.

        Returns:
            Response: Success or failure message.
        """
        try:
            registration = EventUserRegistration.objects.filter(
                user=request.user, event__slug=event_slug
            ).first()
            if not registration:
                return Response(
                    {"message": "Registration not found"},
                    status=status.HTTP_404_NOT_FOUND,
                )
            if registration.status == EventUserRegistration.RegistrationStatus.RSVPED:
                if not registration.event.seats_left == 0:
                    registration.event.seats_left += 1
                    registration.event.save()
                else:
                    registration.event.cancellation_count_after_housefull += 1
                    registration.event.save()
            registration.delete()
            return Response(
                {"message": "Registration withdrawn successfully"},
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            return Response(
                {"message": "An error occurred"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

    def get(self, request, event_slug):
        """
        Get all registrations for a given event.

        Args:
            request: HTTP request.
            event_slug (str): Slug of the event.

        Returns:
            Response: List of registration records or 404 if none exist.
        """
        registrations = EventUserRegistration.objects.filter(
            event__slug=event_slug
        ).all()

        if not registrations.exists():
            return Response(
                {"message": "No registration found"}, status=status.HTTP_404_NOT_FOUND
            )

        serializer = self.serializer_class(registrations, many=True)
        return Response(serializer.data)
