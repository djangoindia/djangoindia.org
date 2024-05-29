from django.urls import path

from . import views

# URL conf
urlpatterns = [
    path("events/", views.get_events, name="get_events"),
]
