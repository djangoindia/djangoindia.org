from django.urls import path
from djangoindia.api.views.event import EventAPIView,EventAttendeeViewSet
# URL conf
urlpatterns = [
    path("events/", EventAPIView.as_view({"get":"list"}), name="list_events"),
    path("events/<slug:slug>/", EventAPIView.as_view({"get":"retrieve","post":"post"}), name="get_event"),
    path("events/<slug:event_slug>/attendees/", EventAttendeeViewSet.as_view({"get": "list"}), name="get_event_attendee"),  
]
