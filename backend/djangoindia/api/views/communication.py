from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from djangoindia.api.serializers.communication import (
    ContactUsSerializer,
    SubscriberSerializer,
)
from djangoindia.api.views.base import BaseAPIView
from djangoindia.db.models.communication import Subscriber


class SubscriberAPIView(BaseAPIView):
    permission_classes = [
        AllowAny,
    ]
    serializer_class = SubscriberSerializer

    def post(self, request, *args, **kwargs):
        """
        Subscribe to DjangoIndia's newsletter.

        This endpoint is used to add a user to the newsletter subscriber list.

        Args:
            request (Request): The request object.

        Returns:
            Response: A response object with the status of the request.
        """
        try:
            if Subscriber.objects.filter(email=request.data.get("email")).exists():
                return Response(
                    {
                        "message": "Nice try! But you're already in our exclusive club.🕵️‍♂️"
                    },
                    status=status.HTTP_409_CONFLICT,
                )
            serializer = self.serializer_class(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(
                {"message": "Thanks for subscribing! We knew you couldn't resist.😉"},
                status=status.HTTP_201_CREATED,
            )
        except Exception as e:
            return Response(
                {"message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class ContactUsAPIView(BaseAPIView):
    permission_classes = [
        AllowAny,
    ]
    serializer_class = ContactUsSerializer

    def post(self, request):
        """
        Create a new contact message.

        This endpoint is used to send a message to the DjangoIndia team.

        Args:
            request (Request): The request object.

        Returns:
            Response: A response object with a message indicating the success status of the operation.

        Raises:
            Exception: If any exception occurs during the request processing.
        """
        try:
            serializer = self.serializer_class(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(
                    {
                        "message": "Message received! We'll be in touch before you can say 'supercalifragilisticexpialidocious.' 😜"
                    },
                    status=status.HTTP_201_CREATED,
                )
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
