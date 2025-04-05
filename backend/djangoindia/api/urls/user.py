from django.urls import path

from djangoindia.api.views import (
    ChangePasswordEndpointAPIView,
    SetUserPasswordEndpointAPIView,
    UpdateUserOnBoardedEndpointAPIView,
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
        UpdateUserOnBoardedEndpointAPIView.as_view(),
        name="user-onboard",
    ),
    path(
        "users/me/set-password/",
        SetUserPasswordEndpointAPIView.as_view(),
        name="set-password",
    ),
    path(
        "users/me/change-password/",
        ChangePasswordEndpointAPIView.as_view(),
        name="change-password",
    ),
]
