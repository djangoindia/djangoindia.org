from django.urls import path

from djangoindia.api.views.event import EventAPIView, NewsletterSubscriptionAPIView
# URL conf
urlpatterns = [
    path("events/", EventAPIView.as_view(), name="list_events"),
    path("events/<uuid:pk>/", EventAPIView.as_view(), name="get_event"),
    path('newsletter/', NewsletterSubscriptionAPIView.as_view(), name='newsletter-subscription'),
]