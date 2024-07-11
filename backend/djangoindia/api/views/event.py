
from rest_framework import generics, status
from rest_framework.exceptions import ValidationError
from rest_framework.mixins import CreateModelMixin, ListModelMixin, RetrieveModelMixin
from rest_framework.response import Response

from djangoindia.db.models.event import Event, EventRegistration, NewsletterSubscription
from djangoindia.api.serializers import EventRegistrationSerializer, EventSerializer, NewsletterSubscriptionSerializer
from djangoindia.bg_tasks.event_registration import registration_confirmation_email_task


# Create your views here.
class EventAPIView(generics.GenericAPIView, ListModelMixin, CreateModelMixin, RetrieveModelMixin):
    queryset = Event.objects.all()

    def get_serializer_class(self):
        if self.request.method == "POST":
            return EventRegistrationSerializer
        return EventSerializer

    def get(self, request, *args, **kwargs):
        try:
            if 'pk' in kwargs:  # If pk is provided, retrieve a single instance
                return self.retrieve(request, *args, **kwargs)
            return self.list(request, *args, **kwargs)  # Otherwise, list all instances
        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


    def post(self, request, *args, **kwargs):
        try:
            if EventRegistration.objects.filter(
                email=request.data.get("email"), event=request.data.get("event")
            ).exists():
                return Response(
                    {"error": "You have already registered for this event."},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            self.create(request, *args, **kwargs)

            #send email after registration
            recipient_email = request.data.get("email")
            event_id = request.data.get("event")
            registration_confirmation_email_task.delay(recipient_email, event_id)
            return Response(
                {"message": "Registration successful. Confirmation email sent."},
                status=status.HTTP_201_CREATED,
            )
        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class NewsletterSubscriptionAPIView(generics.GenericAPIView, ListModelMixin, CreateModelMixin, RetrieveModelMixin):
    queryset = NewsletterSubscription.objects.all()
    serializer_class = NewsletterSubscriptionSerializer

    def post(self, request, *args, **kwargs):
        try:
            if NewsletterSubscription.objects.filter(email=request.data.get("email")).exists():
                return Response(
                    {"error": "This email is already subscribed to the newsletter."},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            self.create(request, *args, **kwargs)
            return Response(
                {"message": "Subscription successful."},
                status=status.HTTP_201_CREATED,
            )
        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )