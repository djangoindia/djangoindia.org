from rest_framework import generics, status
from rest_framework.exceptions import ValidationError
from rest_framework.mixins import CreateModelMixin, ListModelMixin, RetrieveModelMixin
from rest_framework.response import Response

from .models import Event, EventRegistration
from .serializers import EventRegistrationSerializer, EventSerializer, NewsletterSubscriptionSerializer
from .utils import send_registration_confirmation_email


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
            send_registration_confirmation_email(recipient_email, event_id)
            return Response(
                {"message": "Registration successful. Confirmation email sent."},
                status=status.HTTP_201_CREATED,
            )
        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        
class NewsletterSubscriptionCreateView(generics.CreateAPIView):
    serializer_class = NewsletterSubscriptionSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)