from django.shortcuts import get_object_or_404
from djangoindia.api.serializers.event import (
    EventRegistrationSerializer,
    EventSerializer,
    EventLiteSerializer,
)
from djangoindia.bg_tasks.event_registration import registration_confirmation_email_task
from djangoindia.db.models import Event, EventRegistration,Volunteer, Sponsorship,CommunityPartner
from rest_framework import generics, status, viewsets,mixins
from rest_framework.mixins import CreateModelMixin, ListModelMixin, RetrieveModelMixin
from rest_framework.response import Response

from djangoindia.constants import POST, PRIMARY_KEY_SHORT
from django.db.models import Prefetch,Count,Q
from django.utils import timezone

# Create your views here.
class EventAttendeeViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    serializer_class = EventRegistrationSerializer 

    def get_queryset(self):
        event_slug = self.kwargs.get('event_slug')
        event = get_object_or_404(Event, slug=event_slug)
        queryset = EventRegistration.objects.filter(
            event__slug=event_slug
        ).select_related('event').order_by('first_name', 'last_name')
        return queryset, event

    def list(self, request, *args, **kwargs):
        queryset, event = self.get_queryset()
        if not queryset.exists():
            response_data = {
                'event_name': event.name,
                'total_attendees': 0,
                'first_time_attendees': 0,
                'attendees': []
            }
            return Response(response_data)
        serializer = self.get_serializer(queryset, many=True)
        attendee_data = queryset.aggregate(
            total_attendees=Count('id'),
            first_time_attendees=Count('id', filter=Q(first_time_attendee=True))
        )

        response_data = {
            'event_name': event.name,
            'total_attendees': attendee_data['total_attendees'],
            'first_time_attendees': attendee_data['first_time_attendees'],
            'attendees': serializer.data
        }
        return Response(response_data)

class EventAPIView(
    viewsets.ModelViewSet
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
        ),
        Prefetch(
            'volunteers',
            queryset=Volunteer.objects.only(
                'name',
                'photo',
                'about',
                'email',
                'twitter',
                'linkedin'
            ),
            to_attr='event_volunteers'
        )
    ).order_by("-created_at")

    def get_serializer_class(self):
        if self.request.method == POST:
            return EventRegistrationSerializer
        return EventLiteSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        all_community_partners = CommunityPartner.objects.all()
        serializer = self.get_serializer(queryset, many=True, context={'all_community_partners': all_community_partners})
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        all_community_partners = CommunityPartner.objects.all()
        serializer = EventSerializer(instance, context={'all_community_partners': all_community_partners})
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        try:
            event_id = request.data.get("event")
            email = request.data.get("email")
            
            event = self.get_event(event_id)
            self._validate_event_registration(event)
            self._check_existing_registration(email, event_id)
            
            self.create(request, *args, **kwargs)
            self._send_confirmation_email(email, event_id)
            
            return Response(
                {"message": "You're in! We've sent a shiny email to your inbox. Time to celebrate!"},
                status=status.HTTP_201_CREATED
            )
        except ValidationError as e:
            return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except ConflictError as e:
            return Response({"message": str(e)}, status=status.HTTP_409_CONFLICT)
        except Exception as e:
            return Response({"message": "An unexpected error occurred."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def get_event(self, event_id):
        try:
            return Event.objects.get(id=event_id)
        except Event.DoesNotExist:
            raise ValidationError("Event not found.")

    def _validate_event_registration(self, event):
        if event.registration_end_date <= timezone.now():
            raise ValidationError("Registration has already ended for this event.")
        if event.seats_left is None:
            raise ValidationError("Registration hasn't started yet.")
        if event.seats_left < 1:
            raise ValidationError("Unfortunately, there are no more seats left for the event.")


    def _check_existing_registration(self, email, event_id):
        if EventRegistration.objects.filter(email=email, event=event_id).exists():
            raise ConflictError("We get it, you're excited. But you've already secured your ticket!")

    def _send_confirmation_email(self, email, event_id):
        registration_confirmation_email_task.delay(email, event_id)

class ValidationError(Exception):
    pass

class ConflictError(Exception):
    pass