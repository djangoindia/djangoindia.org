from django.urls import path

from djangoindia.api.views.communication import SubscriberAPIView, ContactUsAPIView

urlpatterns = [
    path('newsletter/', SubscriberAPIView.as_view(), name='newsletter-Subscriber'),
    path('contact-us/', ContactUsAPIView.as_view(), name='contact-us'),
]
