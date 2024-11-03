from djangoindia.api.views.communication import ContactUsAPIView, SubscriberAPIView

from django.urls import path


urlpatterns = [
    path("subscriber/", SubscriberAPIView.as_view(), name="subscriber"),
    path("contact-us/", ContactUsAPIView.as_view(), name="contact-us"),
]
