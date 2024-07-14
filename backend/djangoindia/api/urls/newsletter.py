from django.urls import path

from djangoindia.api.views.newsletter import NewsletterSubscriptionAPIView

urlpatterns = [
    path('newsletter/', NewsletterSubscriptionAPIView.as_view(), name='newsletter-subscription'),
]
