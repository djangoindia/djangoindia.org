from djangoindia.api.serializers.event import (
    EventRegistrationSerializer,
    EventSerializer,
)
from djangoindia.bg_tasks.event_registration import registration_confirmation_email_task
<<<<<<< HEAD
<<<<<<< HEAD
from djangoindia.db.models.event import Event, EventRegistration
from djangoindia.db.models.volunteers import EventVolunteers
=======
from djangoindia.db.models.event import Event, EventRegistration,Sponsorship
>>>>>>> 328383cc9514cf02bd2080e8f2ed0977052b6471
=======
from djangoindia.db.models.event import Event, EventRegistration,Sponsorship
>>>>>>> 328383cc9514cf02bd2080e8f2ed0977052b6471
from rest_framework import generics, status
from rest_framework.mixins import CreateModelMixin, ListModelMixin, RetrieveModelMixin
from rest_framework.response import Response

from djangoindia.constants import POST, PRIMARY_KEY_SHORT
from django.db.models import Prefetch


# Create your views here.
<<<<<<< HEAD
class EventAPIView(generics.GenericAPIView, ListModelMixin, CreateModelMixin, RetrieveModelMixin):
    queryset = Event.objects.all()
=======
class EventAPIView(
    generics.GenericAPIView, ListModelMixin, CreateModelMixin, RetrieveModelMixin
):
    queryset = Event.objects.all().prefetch_related(
        Prefetch(
            'sponsors',
            queryset=Sponsorship.objects.filter(
                type='event_sponsorship'
            ).select_related('sponsor_details').only(
                'tier',
                'type',
                'sponsor_details__url',
                'sponsor_details__name',
                'sponsor_details__type',
                'sponsor_details__logo'
            ),
            to_attr='event_sponsors'
        )
    )
<<<<<<< HEAD
>>>>>>> 328383cc9514cf02bd2080e8f2ed0977052b6471
=======
>>>>>>> 328383cc9514cf02bd2080e8f2ed0977052b6471

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
