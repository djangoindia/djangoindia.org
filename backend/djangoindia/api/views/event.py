from djangoindia.api.serializers.event import (
    EventRegistrationSerializer,
    EventSerializer,
)
from djangoindia.bg_tasks.event_registration import registration_confirmation_email_task
from djangoindia.db.models.event import Event, EventRegistration
from djangoindia.db.models.volunteers import EventVolunteers
from rest_framework import generics, status
from rest_framework.mixins import CreateModelMixin, ListModelMixin, RetrieveModelMixin
from rest_framework.response import Response

from djangoindia.constants import POST, PRIMARY_KEY_SHORT


# Create your views here.
class EventAPIView(generics.GenericAPIView, ListModelMixin, CreateModelMixin, RetrieveModelMixin):
    queryset = Event.objects.all()

    def get_serializer_class(self):
        if self.request.method == POST:
            return EventRegistrationSerializer
        return EventSerializer

    def get(self, request, *args, **kwargs):
        try:
            if (PRIMARY_KEY_SHORT in kwargs):  # If pk is provided, retrieve a single instance
                volunteer_details = EventVolunteers.objects.filter(id=PRIMARY_KEY_SHORT).all()
                serialized_details = EventSerializer(volunteer_details)
                return serialized_details
            else:
                volunteer_data = EventSerializer(EventVolunteers.objects.all(),many=True)
                return volunteer_data  # Otherwise, list all instances
        except Exception as e:
            return Response(
                {"message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def post(self, request, *args, **kwargs):
        try:
            if EventRegistration.objects.filter(
                email=request.data.get("email"), event=request.data.get("event")
            ).exists():
                return Response(
                    {"message": "You have already registered for this event."},
                    status=status.HTTP_409_CONFLICT,
                )
            self.create(request, *args, **kwargs)

            # send email after registration
            recipient_email = request.data.get("email")
            event_id = request.data.get("event")
            registration_confirmation_email_task.delay(recipient_email, event_id)
            return Response(
                {"message": "Registration successful. Confirmation email sent."},
                status=status.HTTP_201_CREATED,
            )
        except Exception as e:
            return Response(
                {"message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
