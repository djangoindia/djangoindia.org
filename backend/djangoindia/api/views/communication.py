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
        Subscribe a user to the DjangoIndia newsletter.

        This endpoint allows users to subscribe using their email address. If the email
        already exists in the database, a 409 Conflict response is returned.

        Args:
            request (Request): The HTTP request object containing subscriber data.

        Returns:
            Response:
                - 201 CREATED: If the subscription was successful.
                - 409 CONFLICT: If the user is already subscribed.
                - 500 INTERNAL SERVER ERROR: If an unexpected error occurs.
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
        Submit a contact message to the DjangoIndia team.

        This endpoint allows users to send inquiries, feedback, or general messages to the team.
        It validates and stores the incoming data.

        Args:
            request (Request): The HTTP request object containing message data.

        Returns:
            Response:
                - 201 CREATED: If the message was successfully submitted.
                - 500 INTERNAL SERVER ERROR: If an unexpected error occurs.
        """
        try:
            serializer = self.serializer_class(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(
                {
                    "message": "Message received! We'll be in touch before you can say 'supercalifragilisticexpialidocious.' 😜"
                },
                status=status.HTTP_201_CREATED,
            )
        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
