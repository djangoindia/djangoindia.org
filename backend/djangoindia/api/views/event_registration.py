from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from djangoindia.api.serializers.event_registration import (
    EventUserRegistrationSerializer,
)
from djangoindia.api.views.base import BaseAPIView
from djangoindia.db.models import Event, EventUserRegistration


class EventRegistrationView(BaseAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = EventUserRegistrationSerializer

    def post(self, request, event_slug):
        """Register for an event"""
        try:
            event = Event.objects.get(slug=event_slug)

            # Check if user is already registered
            existing_registration = EventUserRegistration.objects.filter(
                user=request.user, event=event
            ).first()

            if existing_registration:
                if (
                    existing_registration.status
                    == EventUserRegistration.RSVP_STATUS.CANCELLED
                ):
                    # Allow re-registration if previously cancelled
                    existing_registration.delete()
                else:
                    return Response(
                        {"message": "You are already registered for this event"},
                        status=status.HTTP_400_BAD_REQUEST,
                    )

            serializer = self.serializer_class(
                data={
                    "event": event.id,
                    "rsvp_notes": request.data.get("rsvp_notes", ""),
                },
                context={"request": request},
            )
            serializer.is_valid(raise_exception=True)
            registration = serializer.save()

            return Response(
                {
                    "message": "Successfully rsvp'd for the event"
                    if registration.status
                    == EventUserRegistration.RSVP_STATUS.REGISTERED
                    else "Added to waitlist",
                    "data": serializer.data,
                },
                status=status.HTTP_201_CREATED,
            )

        except Event.DoesNotExist:
            return Response(
                {"message": "Event not found"}, status=status.HTTP_404_NOT_FOUND
            )

    def put(self, request, event_slug):
        """Update RSVP notes"""
        try:
            registration = EventUserRegistration.objects.get(
                user=request.user, event__slug=event_slug
            )

            rsvp_notes = request.data.get("rsvp_notes")
            if rsvp_notes is None:
                return Response(
                    {"message": "RSVP notes are required"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            registration.rsvp_notes = rsvp_notes
            registration.save()

            serializer = self.serializer_class(registration)
            return Response(
                {"message": "RSVP notes updated successfully", "data": serializer.data}
            )

        except EventUserRegistration.DoesNotExist:
            return Response(
                {"message": "Registration not found"}, status=status.HTTP_404_NOT_FOUND
            )

    def delete(self, request, event_slug):
        """Cancel registration for an event"""
        try:
            registration = EventUserRegistration.objects.get(
                user=request.user, event__slug=event_slug
            )

            if registration.status == EventUserRegistration.RSVP_STATUS.CANCELLED:
                return Response(
                    {"message": "Registration already cancelled"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            registration.cancel_registration()

            return Response(
                {"message": "Registration cancelled successfully"},
                status=status.HTTP_200_OK,
            )

        except EventUserRegistration.DoesNotExist:
            return Response(
                {"message": "Registration not found"}, status=status.HTTP_404_NOT_FOUND
            )

    def get(self, request, event_slug):
        """Get registration status for an event"""
        registrations = EventUserRegistration.objects.filter(
            event__slug=event_slug
        ).all()

        if not registrations.exists():
            return Response(
                {"message": "No registration found"}, status=status.HTTP_404_NOT_FOUND
            )

        serializer = self.serializer_class(registrations, many=True)
        return Response(serializer.data)
