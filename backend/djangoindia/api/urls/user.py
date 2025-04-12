from django.urls import path

from djangoindia.api.views import (
    ChangePasswordAPIView,
    SetUserPasswordAPIView,
    UpdateUserOnBoardedAPIView,
    UserEndpointViewSet,
)


urlpatterns = [
    # User Profile
    path(
        "users/me/",
        UserEndpointViewSet.as_view(
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
        UpdateUserOnBoardedAPIView.as_view(),
        name="user-onboard",
    ),
    path(
        "users/me/set-password/",
        SetUserPasswordAPIView.as_view(),
        name="set-password",
    ),
    path(
        "users/me/change-password/",
        ChangePasswordAPIView.as_view(),
        name="change-password",
    ),
]
