from djangoindia.api.serializers.event import (
    EventRegistrationSerializer,
    EventSerializer,
)
from djangoindia.bg_tasks.event_registration import registration_confirmation_email_task
from djangoindia.db.models.event import Event, EventRegistration,Sponsorship
from rest_framework import generics, status
from rest_framework.mixins import CreateModelMixin, ListModelMixin, RetrieveModelMixin
from rest_framework.response import Response

from djangoindia.constants import POST, PRIMARY_KEY_SHORT
from django.db.models import Prefetch


# Create your views here.
class EventAPIView(
    generics.GenericAPIView, ListModelMixin, CreateModelMixin, RetrieveModelMixin
):
    lookup_field = "slug"
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
    ).order_by("-created_at")

    def get_serializer_class(self):
        if self.request.method == POST:
            return EventRegistrationSerializer
        return EventSerializer

    def get(self, request, *args, **kwargs):
        try:
            if (
                PRIMARY_KEY_SHORT in kwargs
            ):  # If slug is provided, retrieve a single instance
                return self.retrieve(request, *args, **kwargs)
            return self.list(request, *args, **kwargs)  # Otherwise, list all instances
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
                    {"message": "We get it, you’re excited. But you've already secured your ticket!"},
                    status=status.HTTP_409_CONFLICT,
                )
            self.create(request, *args, **kwargs)

            # send email after registration
            recipient_email = request.data.get("email")
            event_id = request.data.get("event")
            registration_confirmation_email_task.delay(recipient_email, event_id)
            return Response(
                {"message": "You're in! We've sent a shiny email to your inbox. Time to celebrate!"},
                status=status.HTTP_201_CREATED,
            )
        except Exception as e:
            return Response(
                {"message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
