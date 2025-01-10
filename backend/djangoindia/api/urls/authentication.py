from django.urls import path

from djangoindia.api.views import (
    ForgotPasswordEndpoint,
    OauthEndpoint,
    RequestEmailVerificationEndpoint,
    ResetPasswordEndpoint,
    SignInEndpoint,
    SignOutEndpoint,
    SignUpEndpoint,
    VerifyEmailEndpoint,
)


urlpatterns = [
    path("social-auth/", OauthEndpoint.as_view(), name="oauth"),
    # Auth
    path("sign-up/", SignUpEndpoint.as_view(), name="sign-up"),
    path("sign-in/", SignInEndpoint.as_view(), name="sign-in"),
    path("sign-out/", SignOutEndpoint.as_view(), name="sign-out"),
    # email verification
    path("email-verify/", VerifyEmailEndpoint.as_view(), name="email-verify"),
    path(
        "request-email-verify/",
        RequestEmailVerificationEndpoint.as_view(),
        name="request-reset-email",
    ),
    # Password Manipulation
    path(
        "reset-password/<uidb64>/<token>/",
        ResetPasswordEndpoint.as_view(),
        name="password-reset",
    ),
    path(
        "forgot-password/",
        ForgotPasswordEndpoint.as_view(),
        name="forgot-password",
    ),
]
