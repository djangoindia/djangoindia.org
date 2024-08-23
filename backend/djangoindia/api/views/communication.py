from djangoindia.api.serializers.communication import (
    ContactUsSerializer,
    NewsletterSubscriptionSerializer,
)
from djangoindia.db.models.communication import NewsletterSubscription
from rest_framework import generics, status
from rest_framework.mixins import CreateModelMixin
from rest_framework.response import Response


class NewsletterSubscriptionAPIView(generics.GenericAPIView, CreateModelMixin):
    queryset = NewsletterSubscription.objects.all()
    serializer_class = NewsletterSubscriptionSerializer

    def post(self, request, *args, **kwargs):
        try:
            if NewsletterSubscription.objects.filter(
                email=request.data.get("email")
            ).exists():
                return Response(
                    {"message": "Nice try! But you're already in our exclusive club.🕵️‍♂️"},
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


class ContactUsAPIView(generics.GenericAPIView, CreateModelMixin):

    def post(self, request):
        try:
            serializer = ContactUsSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(
                    {"message": "Message received! We'll be in touch before you can say 'supercalifragilisticexpialidocious.' 😜"},
                    status=status.HTTP_201_CREATED,
                )
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
