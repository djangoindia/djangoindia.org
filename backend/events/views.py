from rest_framework import generics

from .models import Event
from .serializers import EventRegistrationSerializer, EventSerializer

# Create your views here.


class GetEvents(generics.ListAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer


class RegisterEvent(generics.CreateAPIView):
    serializer_class = EventRegistrationSerializer
