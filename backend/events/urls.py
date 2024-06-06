from django.urls import path

from . import views

# URL conf
urlpatterns = [
    path("", views.GetEvents.as_view(), name="get_events"),
    path("register/", views.RegisterEvent.as_view(), name="register_event"),
]
