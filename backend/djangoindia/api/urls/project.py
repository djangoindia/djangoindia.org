from django.urls import path

from djangoindia.api.views.project import (
    ProjectListAPIView,
    ProjectSubmissionAPIView,
)


urlpatterns = [
    path(
        "projects/",
        ProjectSubmissionAPIView.as_view(),
        name="list_community_sponsors_and_partners",
    ),
    path("projects/public/", ProjectListAPIView.as_view(), name="public-projects-list"),
]
