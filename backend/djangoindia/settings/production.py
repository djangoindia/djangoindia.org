import os

from .base import *  # noqa: F403, F401

ALLOWED_HOSTS = []  # TODO: djangoindia domain goes here

ADMIN_URL = os.environ.get("DJANGO_ADMIN_URL")

STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"
