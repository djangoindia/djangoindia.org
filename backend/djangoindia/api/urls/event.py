from django.urls import path

from djangoindia.api.views.event import EventAPIView
# URL conf
urlpatterns = [
    path("events/", EventAPIView.as_view(), name="list_events"),
    path("events/<uuid:pk>/", EventAPIView.as_view(), name="get_event"),
]