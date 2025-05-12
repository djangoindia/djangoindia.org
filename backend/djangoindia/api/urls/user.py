from django.urls import path

from djangoindia.api.views import (
    ChangePasswordAPIView,
    SetUserPasswordAPIView,
    UpdateUserOnBoardedAPIView,
    UserViewSet,
)
from djangoindia.api.views.user import   UserDetailsEndpoint

urlpatterns = [
    # User Profile
    path(
        "users/me/",
        UserViewSet.as_view(
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
     path("users/username/<str:username>/", UserDetailsEndpoint.as_view(), name="user-detail-by-username"),
]
