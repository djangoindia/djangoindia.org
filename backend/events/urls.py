from django.urls import path

from . import views

# URL conf
urlpatterns = [
    path("", views.EventAPIView.as_view(), name="get_events"),
]
