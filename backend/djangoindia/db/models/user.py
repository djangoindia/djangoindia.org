# Python imports
import uuid

import pytz

from django.conf import settings

# Django imports
from django.contrib.auth.models import (
    AbstractBaseUser,
    Group,
    Permission,
    PermissionsMixin,
    UserManager,
)
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _

from .base import BaseModel


class User(AbstractBaseUser, PermissionsMixin):
    class GENDER:
        CHOICES = (
            ("male", "male"),
            ("female", "female"),
            ("not_to_specify", "not_to_specify"),
        )

    USER_TIMEZONE_CHOICES = tuple(zip(pytz.all_timezones, pytz.all_timezones))

    username = models.CharField(max_length=128, unique=True)
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)

    # user fields
    mobile_number = models.CharField(max_length=255, blank=True, null=True)
    email = models.CharField(max_length=255, null=True, blank=True, unique=True)
    first_name = models.CharField(max_length=255, blank=True)
    last_name = models.CharField(max_length=255, blank=True)
    avatar = models.ImageField(upload_to="users/avatars/")
    organization = models.CharField(max_length=500, blank=True, null=True)
    gender = models.CharField(choices=GENDER.CHOICES, max_length=50)
    bio = models.CharField(max_length=150, blank=True, null=True)
    about = models.TextField(blank=True, null=True)

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


class SocialLoginConnection(BaseModel):
    medium = models.CharField(
        max_length=20,
        choices=(("Google", "google"),),
        default=None,
    )
    last_login_at = models.DateTimeField(default=timezone.now, null=True)
    last_received_at = models.DateTimeField(default=timezone.now, null=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="user_login_connections",
    )
    token_data = models.JSONField(null=True)
    extra_data = models.JSONField(null=True)

    class Meta:
        verbose_name = "Social Login Connection"
        verbose_name_plural = "Social Login Connections"
        db_table = "social_login_connections"
        ordering = ("-created_at",)

    def __str__(self):
        """Return name of the user and medium"""
        return f"{self.medium} >"
