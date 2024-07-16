from rest_framework import generics, status
from rest_framework.mixins import CreateModelMixin
from rest_framework.response import Response

from djangoindia.db.models.communication import NewsletterSubscription, ContactUs
from djangoindia.api.serializers.communication import NewsletterSubscriptionSerializer, ContactUsSerializer

class NewsletterSubscriptionAPIView(generics.GenericAPIView, CreateModelMixin):
    queryset = NewsletterSubscription.objects.all()
    serializer_class = NewsletterSubscriptionSerializer

    def post(self, request, *args, **kwargs):
        try:
            if NewsletterSubscription.objects.filter(email=request.data.get("email")).exists():
                return Response(
                    {"error": "You have already subscribed to the newsletter."},
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
        
class ContactUsAPIView(generics.GenericAPIView):
    queryset = ContactUs.objects.all()
    serializer_class = ContactUsSerializer

    def post(self, request, *args, **kwargs):
        try:
            serializer = ContactUsSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(
                    {"message": "Thank you for contacting us! We will get back to you shortly."},
                    status=status.HTTP_201_CREATED
                )
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )