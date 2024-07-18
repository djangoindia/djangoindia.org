from django.urls import path

from djangoindia.api.views.communication import NewsletterSubscriptionAPIView, ContactUsAPIView

urlpatterns = [
    path('newsletter/', NewsletterSubscriptionAPIView.as_view(), name='newsletter-subscription'),
    path('contact-us/', ContactUsAPIView.as_view(), name='contactUs'),
]
