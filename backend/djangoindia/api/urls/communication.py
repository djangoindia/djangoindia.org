from django.urls import path

from djangoindia.api.views.communication import ContactUsAPIView, SubscriberAPIView,UnsubscribeAPIView


urlpatterns = [
    path("subscriber/", SubscriberAPIView.as_view(), name="subscriber"),
    path("unsubscribe/", UnsubscribeAPIView.as_view(), name="unsubscribe"),
    path("contact-us/", ContactUsAPIView.as_view(), name="contact-us"),
]
