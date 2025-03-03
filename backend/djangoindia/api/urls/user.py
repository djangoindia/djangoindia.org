from django.urls import path

from djangoindia.api.views import (
    ChangePasswordEndpoint,
    SetUserPasswordEndpoint,
    UpdateUserOnBoardedEndpoint,
    UserEndpoint,
)
from djangoindia.api.views.user import UsersProfilesEndpoint


urlpatterns = [
    # User Profile
    path(
        "users/me/",
        UserEndpoint.as_view(
            {
                "get": "retrieve",
                "patch": "partial_update",
                "delete": "deactivate",
            }
        ),
        name="users",
    ),
    path(
        "users/me/onboard/",
        UpdateUserOnBoardedEndpoint.as_view(),
        name="user-onboard",
    ),
    path(
        "users/me/set-password/",
        SetUserPasswordEndpoint.as_view(),
        name="set-password",
    ),
    path(
        "users/me/change-password/",
        ChangePasswordEndpoint.as_view(),
        name="change-password",
    ),
    path(
        "users/profiles/",
        UsersProfilesEndpoint.as_view({"get": "list"}),
        name="users-profiles",
    ),
]
