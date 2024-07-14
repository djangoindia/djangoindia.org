from django.urls import path

from djangoindia.api.views.communication import NewsletterSubscriptionAPIView

urlpatterns = [
    path('newsletter/', NewsletterSubscriptionAPIView.as_view(), name='newsletter-subscription'),
]
