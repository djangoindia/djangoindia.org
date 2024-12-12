<<<<<<< HEAD
# Python imports
import uuid

import pytz

from django.contrib.auth.models import (
    AbstractBaseUser,
    Group,
    Permission,
    PermissionsMixin,
    UserManager,
)

# Django imports
from django.db import models
from django.utils.translation import gettext_lazy as _


class User(AbstractBaseUser, PermissionsMixin):
=======
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models

from .base import BaseModel


class User(PermissionsMixin, AbstractBaseUser):
>>>>>>> 0e67722 (WIP)
    class GENDER:
        CHOICES = (
            ("male", "male"),
            ("female", "female"),
            ("non-binary", "non-binary"),
            ("not_to_specify", "not_to_specify"),
        )

<<<<<<< HEAD
    USER_TIMEZONE_CHOICES = tuple(zip(pytz.all_timezones, pytz.all_timezones))

    username = models.CharField(max_length=128, unique=True)
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)

    # user fields
    mobile_number = models.CharField(max_length=255, blank=True, null=True)
    email = models.CharField(max_length=255, null=True, blank=True, unique=True)
    first_name = models.CharField(max_length=255, blank=True)
    last_name = models.CharField(max_length=255, blank=True)
    avatar = models.CharField(max_length=255, blank=True)
    organization = models.CharField(max_length=500, blank=True, null=True)
    gender = models.CharField(choices=GENDER.CHOICES, max_length=50)

    # tracking metrics
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Created At")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Last Modified At")

    # the is' es
    is_superuser = models.BooleanField(default=False)
    is_password_expired = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_email_verified = models.BooleanField(default=False)
    is_password_autoset = models.BooleanField(default=False)
    is_onboarded = models.BooleanField(default=False)

    user_timezone = models.CharField(
        max_length=255, default="Asia/Kolkata", choices=USER_TIMEZONE_CHOICES
    )

    groups = models.ManyToManyField(
        Group,
        verbose_name=_("groups"),
        blank=True,
        help_text=_(
            "The groups this user belongs to. A user will get all permissions "
            "granted to each of their groups."
        ),
        related_name="user_account_set",
        related_query_name="user_account",
    )
    user_permissions = models.ManyToManyField(
        Permission,
        verbose_name=_("user permissions"),
        blank=True,
        help_text=_("Specific permissions for this user."),
        related_name="user_account_set",
        related_query_name="user_account",
    )

    USERNAME_FIELD = "email"

    REQUIRED_FIELDS = ["username"]

    objects = UserManager()

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"
        db_table = "users"
        ordering = ("-created_at",)

    def __str__(self):
        return f"{self.username} <{self.email}>"

    def save(self, *args, **kwargs):
        self.email = self.email.lower().strip()

        if self.is_superuser:
            self.is_staff = True

        super().save(*args, **kwargs)
=======
    first_name = models.CharField(max_length=255, blank=False, null=False)
    last_name = models.CharField(max_length=255, blank=False, null=False)
    unique_username = models.CharField(max_length=50, null=True, blank=True)
    gender = models.CharField(choices=GENDER.CHOICES, max_length=50)
    email = models.EmailField(max_length=255, unique=True, blank=False, null=False)
    phone_number = models.CharField(max_length=50, blank=True, null=True)
    date_of_birth = models.DateTimeField(blank=True, null=True)
    organization = models.CharField(max_length=500, blank=True, null=True)
    year_of_experience = models.IntegerField(default=None, blank=True, null=True)
    college = models.CharField(max_length=500, blank=True, null=True)
    year_of_passing = models.DateField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False, verbose_name="community volunteer")
    is_superuser = models.BooleanField(default=False)
    is_professional = models.BooleanField(default=False)


class UserSocials:
    class SoialMediaType:
        CHOICES = (
            ("linkedin", "linkedin"),
            ("github", "github"),
            ("twitter", "twitter"),
        )

    user = models.ForeignKey(User, null=False, blank=False)
    social_media_type = models.CharField(choices=SoialMediaType.CHOICES, max_length=50)
    profile_link = models.CharField(max_length=500, blank=True, null=True)


class LogHistory(BaseModel):
    user = models.ForeignKey(User, null=False, blank=False)
    login_timestamp = models.DateTimeField(auto_now=True)


class UserEventHistory(BaseModel):
    class RegistrationStatusType:
        CHOICES = (
            ("interested", "interested"),
            ("rsvped", "rsvped"),
            ("confirmed", "confirmed"),
            ("shortlisted", "shortlisted")("waiting", "waiting")(
                "cancelled", "cancelled"
            ),
        )

    user = models.ForeignKey("User", null=False, blank=False)
    event = models.ForeignKey("Event", null=False, blank=False)
    registration_time = models.DateTimeField(auto_now=True)
    registration_status = models.CharField(
        choices=RegistrationStatusType.CHOICES, max_length=50
    )


# register for event
# rsvp for event -> going/ not going
# show events on my profile
# django stories
>>>>>>> 0e67722 (WIP)
