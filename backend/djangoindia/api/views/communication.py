from rest_framework import generics, status
from rest_framework.mixins import CreateModelMixin
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from django.shortcuts import get_object_or_404

from djangoindia.api.serializers.communication import (
    ContactUsSerializer,
    SubscriberSerializer,
)
from djangoindia.db.models.communication import Subscriber


class SubscriberAPIView(generics.GenericAPIView, CreateModelMixin):
    permission_classes = [
        AllowAny,
    ]
    queryset = Subscriber.objects.all()
    serializer_class = SubscriberSerializer

    def post(self, request, *args, **kwargs):
        try:
            if Subscriber.objects.filter(email=request.data.get("email")).exists():
                return Response(
                    {
                        "message": "Nice try! But you're already in our exclusive club.🕵️‍♂️"
                    },
                    status=status.HTTP_409_CONFLICT,
                )
            self.create(request, *args, **kwargs)
            return Response(
                {"message": "Thanks for subscribing! We knew you couldn't resist.😉"},
                status=status.HTTP_201_CREATED,
            )
        except Exception as e:
            return Response(
                {"message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class UnsubscribeAPIView(generics.GenericAPIView):
    def delete(self, request, token=None):
        try:
            unsubscribe_token = token
            if not unsubscribe_token:
                return Response(
                    {"message": "Unsubscribe token is required."},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            subscriber = get_object_or_404(
                Subscriber, unsubscribe_token=unsubscribe_token
            )
            subscriber.delete()
            return Response(
                {"message": "You have been unsubscribed. We're sad to see you go. 😢"},
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            return Response(
                {"message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class ContactUsAPIView(generics.GenericAPIView, CreateModelMixin):
    permission_classes = [
        AllowAny,
    ]

    def post(self, request):
        try:
            serializer = ContactUsSerializer(data=request.data)
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
