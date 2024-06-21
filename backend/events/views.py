from rest_framework import generics, status
from rest_framework.exceptions import ValidationError
from rest_framework.mixins import CreateModelMixin, ListModelMixin, RetrieveModelMixin
from rest_framework.response import Response

from .models import Event
from .serializers import EventRegistrationSerializer, EventSerializer


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
            return self.create(request, *args, **kwargs)
        except ValidationError as e:
            return Response({"error": e.detail}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
