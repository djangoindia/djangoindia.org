from django.urls import path

from djangoindia.api.views.project import (
    ProjectSubmissionEndPoint,
    PublicProjectListView,
)


urlpatterns = [
    path(
        "projects/",
        ProjectSubmissionEndPoint.as_view(),
        name="list_community_sponsors_and_partners",
    ),
    path(
        "projects/public/", PublicProjectListView.as_view(), name="public-projects-list"
    ),
]
