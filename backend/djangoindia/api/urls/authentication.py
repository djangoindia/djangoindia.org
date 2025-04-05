from django.urls import path

from djangoindia.api.views import (
    ForgotPasswordEndpointAPIView,
    OauthEndpointAPIView,
    RequestEmailVerificationEndpointAPIView,
    ResetPasswordEndpointAPIView,
    SignInEndpointAPIView,
    SignOutEndpointAPIView,
    SignUpEndpointAPIView,
    VerifyEmailEndpointAPIView,
)


urlpatterns = [
    path("social-auth/", OauthEndpointAPIView.as_view(), name="oauth"),
    # Auth
    path("sign-up/", SignUpEndpointAPIView.as_view(), name="sign-up"),
    path("sign-in/", SignInEndpointAPIView.as_view(), name="sign-in"),
    path("sign-out/", SignOutEndpointAPIView.as_view(), name="sign-out"),
    # email verification
    path("email-verify/", VerifyEmailEndpointAPIView.as_view(), name="email-verify"),
    path(
        "request-email-verify/",
        RequestEmailVerificationEndpointAPIView.as_view(),
        name="request-reset-email",
    ),
    # Password Manipulation
    path(
        "reset-password/<uidb64>/<token>/",
        ResetPasswordEndpointAPIView.as_view(),
        name="password-reset",
    ),
    path(
        "forgot-password/",
        ForgotPasswordEndpointAPIView.as_view(),
        name="forgot-password",
    ),
]
