from .base import *  # noqa: F403, F401

EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"

ALLOWED_HOSTS = ["*"]

ADMIN_URL = os.environ.get("DJANGO_ADMIN_URL", "admin/")

# Media files (Images, etc.)
MEDIA_URL = "media/"
MEDIA_ROOT = os.path.join(BASE_DIR, "media")
CORS_ORIGIN_ALLOW_ALL=True
