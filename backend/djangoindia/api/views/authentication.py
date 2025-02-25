# Python imports
import os
import uuid

import jwt

from google.auth.transport import requests as google_auth_request
from google.oauth2 import id_token
from rest_framework import exceptions, status
from rest_framework.permissions import AllowAny, IsAuthenticated

# Third Party modules
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

## Django imports
from django.conf import settings
from django.contrib.auth.hashers import make_password
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.utils import timezone
from django.utils.encoding import DjangoUnicodeDecodeError, smart_bytes, smart_str
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode

from djangoindia.api.serializers.user import (
    ChangePasswordSerializer,
    ResetPasswordSerializer,
    UserSerializer,
)
from djangoindia.api.views.base import BaseAPIView
from djangoindia.bg_tasks.auth.email_verification_task import email_verification_task
from djangoindia.bg_tasks.auth.forgot_password_task import forgot_password_task

# Module imports
from djangoindia.db.models import (
    EventRegistration,
    EventUserRegistration,
    SocialLoginConnection,
    User,
)


def generate_password_token(user):
    uidb64 = urlsafe_base64_encode(smart_bytes(user.uuid))
    token = PasswordResetTokenGenerator().make_token(user)

    return uidb64, token


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return (
        str(refresh.access_token),
        str(refresh),
    )


def validate_google_token(token, client_id):
    try:
        id_info = id_token.verify_oauth2_token(
            token, google_auth_request.Request(), client_id
        )
        email = id_info.get("email")
        first_name = id_info.get("given_name")
        last_name = id_info.get("family_name", "")
        picture = id_info.get("picture", "")
        data = {
            "email": email,
            "first_name": first_name,
            "last_name": last_name,
            "picture": picture,
        }
        return data
    except Exception as e:
        raise exceptions.AuthenticationFailed("detail with Google connection.")


class OauthEndpoint(BaseAPIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            medium = request.data.get("medium", False)
            id_token = request.data.get("credential", False)
            client_id = request.data.get("clientId", False)
            data = {}
            GOOGLE_CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID")

            if not medium or not id_token:
                return Response(
                    {
                        "message": "Something went wrong. Please try again later or contact the support team."
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

            if medium == "google":
                if not GOOGLE_CLIENT_ID:
                    return Response(
                        {"message": "Google login is not configured"},
                        status=status.HTTP_400_BAD_REQUEST,
                    )
                data = validate_google_token(id_token, client_id)

            email = data.get("email", None)
            if email is None:
                return Response(
                    {
                        "message": "Something went wrong. Please try again later or contact the support team."
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )
            if "@" in email:
                user = User.objects.get(email=email)
                email = data["email"]
                email_verified = True
            else:
                return Response(
                    {
                        "message": "Something went wrong. Please try again later or contact the support team."
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

            user.is_active = True
            user.is_email_verified = email_verified
            user.save()

            SocialLoginConnection.objects.update_or_create(
                medium=medium,
                extra_data={},
                user=user,
                defaults={
                    "token_data": {"id_token": id_token},
                    "last_login_at": timezone.now(),
                },
            )

            access_token, refresh_token = get_tokens_for_user(user)

            data = {
                "access_token": access_token,
                "refresh_token": refresh_token,
            }
            return Response(data, status=status.HTTP_200_OK)

        except User.DoesNotExist:
            if "@" in email:
                email = data["email"]
                email_verified = True
                username = email.split("@")[0]
            else:
                return Response(
                    {
                        "message": "Something went wrong. Please try again later or contact the support team."
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

            user = User.objects.create(
                username=username,
                email=email,
                first_name=data.get("first_name"),
                last_name=data.get("last_name"),
                avatar=data.get("picture"),
                is_email_verified=email_verified,
                is_password_autoset=True,
            )

            user.set_password(uuid.uuid4().hex)
            user.save()

            SocialLoginConnection.objects.update_or_create(
                medium=medium,
                extra_data={},
                user=user,
                defaults={
                    "token_data": {"id_token": id_token},
                    "last_login_at": timezone.now(),
                },
            )
            ############ CAN BE REMOVED LATER ON ############
            past_events = EventRegistration.objects.filter(email=email).all()
            for event in past_events:
                if not EventUserRegistration.objects.filter(
                    event=event, user=user
                ).exists():
                    EventUserRegistration.objects.create(
                        event=event,
                        user=user,
                        status="rsvped",
                        rsvp_notes="I'll be there!",
                    )
            ############################################

            access_token, refresh_token = get_tokens_for_user(user)
            data = {
                "access_token": access_token,
                "refresh_token": refresh_token,
            }

            return Response(data, status=status.HTTP_201_CREATED)


class SignUpEndpoint(BaseAPIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        email = request.data.get("email", False)
        password = request.data.get("password", False)
        confirm_password = request.data.get("confirm_password", False)

        if not password == confirm_password:
            return Response(
                {"message": "Passwords does not match."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Raise exception if any of the above are missing
        if not email or not password:
            return Response(
                {"message": "Both email and password are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        email = email.strip().lower()

        try:
            validate_email(email)
        except ValidationError:
            return Response(
                {"message": "Please provide a valid email address."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Check if the user already exists
        if User.objects.filter(email=email).exists():
            return Response(
                {"message": "User with this email already exists."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user = User.objects.create(
            email=email,
            username=email.split("@")[0],
            password=make_password(password),
        )

        user.save()
        ############ CAN BE REMOVED LATER ON ############
        past_events = EventRegistration.objects.filter(email=email).all()
        for event in past_events:
            if not EventUserRegistration.objects.filter(
                event=event, user=user
            ).exists():
                EventUserRegistration.objects.create(
                    event=event,
                    user=user,
                    status="rsvped",
                    rsvp_notes="I'll be there!",
                )
        ############################################

        access_token, refresh_token = get_tokens_for_user(user)

        data = {
            "access_token": access_token,
            "refresh_token": refresh_token,
        }

        return Response(data, status=status.HTTP_200_OK)


class SignInEndpoint(BaseAPIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        email = request.data.get("email", False)
        password = request.data.get("password", False)

        # Raise exception if any of the above are missing
        if not email or not password:
            return Response(
                {"message": "Both email and password are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        email = email.strip().lower()

        try:
            validate_email(email)
        except ValidationError:
            return Response(
                {"message": "Please provide a valid email address."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user = User.objects.filter(email=email).first()

        if user is None:
            return Response(
                {
                    "message": "Sorry, we could not find a user with the provided credentials. Please try again."
                },
                status=status.HTTP_403_FORBIDDEN,
            )
        if not user.is_email_verified:
            return Response(
                {"message": "Please verify your email address to sign in."},
                status=status.HTTP_403_FORBIDDEN,
            )
        # Sign up Process
        if not user.check_password(password):
            return Response(
                {"message": "Incorrect password."},
                status=status.HTTP_403_FORBIDDEN,
            )
        if not user.is_active:
            return Response(
                {
                    "message": "Your account has been deactivated. Please contact your site administrator."
                },
                status=status.HTTP_403_FORBIDDEN,
            )

        user.save()
        access_token, refresh_token = get_tokens_for_user(user)
        data = {
            "access_token": access_token,
            "refresh_token": refresh_token,
        }

        return Response(data, status=status.HTTP_200_OK)


class SignOutEndpoint(BaseAPIView):
    def post(self, request):
        try:
            refresh_token = request.data.get("refresh_token")

            if not refresh_token:
                return Response(
                    {"message": "No refresh token provided"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response(
                {"message": "Successfully logged out"}, status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response(
                {"message": str(e)},
                status=status.HTTP_400_BAD_REQUEST,
            )


class RequestEmailVerificationEndpoint(BaseAPIView):
    permission_classes = [
        IsAuthenticated,
    ]

    def get(self, request):
        refresh_token = RefreshToken.for_user(request.user)
        token = str(refresh_token.access_token)
        current_site = settings.WEB_URL
        email_verification_task.delay(
            request.user.first_name, request.user.email, token, current_site
        )
        return Response(
            {"message": "Email sent successfully."}, status=status.HTTP_200_OK
        )


class VerifyEmailEndpoint(BaseAPIView):
    permission_classes = [
        IsAuthenticated,
    ]

    def get(self, request):
        token = request.GET.get("token")
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms="HS256")
            user = User.objects.get(id=payload["user_id"])

            if not user.is_email_verified:
                user.is_email_verified = True
                user.save()
                return Response(
                    {"message": "Successfully activated."}, status=status.HTTP_200_OK
                )
            else:
                return Response(
                    {"message": "Email already verified."}, status=status.HTTP_200_OK
                )
        except jwt.ExpiredSignatureError:
            return Response(
                {"message": "Activation expired."}, status=status.HTTP_400_BAD_REQUEST
            )
        except jwt.exceptions.DecodeError:
            return Response(
                {"message": "Invalid token."}, status=status.HTTP_400_BAD_REQUEST
            )


class ForgotPasswordEndpoint(BaseAPIView):
    permission_classes = [
        AllowAny,
    ]

    def post(self, request):
        email = request.data.get("email")

        try:
            validate_email(email)
        except ValidationError:
            return Response(
                {"message": "Please enter a valid email"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Get the user
        user = User.objects.filter(email=email).first()
        if user:
            # Get the reset token for user
            uidb64, token = generate_password_token(user=user)
            # send the forgot password email
            forgot_password_task.delay(user.first_name, user.email, uidb64, token)
            return Response(
                {"message": "Check your email to reset your password"},
                status=status.HTTP_200_OK,
            )
        return Response(
            {"message": "User with the provided email does not exist."},
            status=status.HTTP_400_BAD_REQUEST,
        )


class ResetPasswordEndpoint(BaseAPIView):
    permission_classes = [
        AllowAny,
    ]

    def post(self, request, uidb64, token):
        try:
            # Decode the id from the uidb64
            id = smart_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(uuid=id)

            # check if the token is valid for the user
            if not PasswordResetTokenGenerator().check_token(user, token):
                return Response(
                    {"message": "Token is invalid"},
                    status=status.HTTP_401_UNAUTHORIZED,
                )

            # Reset the password
            serializer = ResetPasswordSerializer(data=request.data)
            if serializer.is_valid():
                # set_password also hashes the password that the user will get
                user.set_password(serializer.data.get("new_password"))
                user.is_password_autoset = False
                user.save()

                # Log the user in
                # Generate access token for the user
                access_token, refresh_token = get_tokens_for_user(user)
                data = {
                    "access_token": access_token,
                    "refresh_token": refresh_token,
                }

                return Response(data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except DjangoUnicodeDecodeError as indentifier:
            return Response(
                {"message": "token is not valid, please check the new one"},
                status=status.HTTP_401_UNAUTHORIZED,
            )


class ChangePasswordEndpoint(BaseAPIView):
    def post(self, request):
        serializer = ChangePasswordSerializer(data=request.data)
        user = User.objects.get(pk=request.user.id)
        if serializer.is_valid():
            if not user.check_password(serializer.data.get("old_password")):
                return Response(
                    {"message": "Old password is not correct"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            # set_password also hashes the password that the user will get
            user.set_password(serializer.data.get("new_password"))
            user.is_password_autoset = False
            user.save()
            return Response(
                {"message": "Password updated successfully"},
                status=status.HTTP_200_OK,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SetUserPasswordEndpoint(BaseAPIView):
    def post(self, request):
        user = User.objects.get(pk=request.user.id)
        new_password = request.data.get("new_password", False)
        confirm_password = request.data.get("confirm_password", False)

        if not new_password == confirm_password:
            return Response(
                {"message": "Passwords does not match."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Check password validation
        if not new_password and len(str(new_password)) < 8:
            return Response(
                {"message": "Password is not valid"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Set the user password
        user.set_password(new_password)
        user.is_password_autoset = False
        user.save()
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
