from django.urls import path

from . import views

# URL conf
urlpatterns = [
    path("", views.get_events, name="get_events"),
    path("register/", views.register_event, name="register_event"),
]
