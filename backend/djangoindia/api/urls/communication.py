from django.urls import path

from djangoindia.api.views.communication import SubscriberAPIView, ContactUsAPIView

urlpatterns = [
    path('subscriber/', SubscriberAPIView.as_view(), name='subscriber'),
    path('contact-us/', ContactUsAPIView.as_view(), name='contact-us'),
]
