import os

from .base import *  # noqa: F403, F401

EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"

ALLOWED_HOSTS = ["*"]

ADMIN_URL = os.environ.get("DJANGO_ADMIN_URL", "admin/")
