from django.urls import path

from djangoindia.api.views import (
    ForgotPasswordAPIView,
    OauthAPIView,
    RequestEmailVerificationAPIView,
    ResetPasswordAPIView,
    SignInAPIView,
    SignOutAPIView,
    SignUpAPIView,
    VerifyEmailAPIView,
)


urlpatterns = [
    path("social-auth/", OauthAPIView.as_view(), name="oauth"),
    # Auth
    path("sign-up/", SignUpAPIView.as_view(), name="sign-up"),
    path("sign-in/", SignInAPIView.as_view(), name="sign-in"),
    path("sign-out/", SignOutAPIView.as_view(), name="sign-out"),
    # email verification
    path("email-verify/", VerifyEmailAPIView.as_view(), name="email-verify"),
    path(
        "request-email-verify/",
        RequestEmailVerificationAPIView.as_view(),
        name="request-reset-email",
    ),
    # Password Manipulation
    path(
        "reset-password/<uidb64>/<token>/",
        ResetPasswordAPIView.as_view(),
        name="password-reset",
    ),
    path(
        "forgot-password/",
        ForgotPasswordAPIView.as_view(),
        name="forgot-password",
    ),
]
