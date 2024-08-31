from .base import *  # noqa: F403, F401

EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
INSTALLED_APPS+=["storages"]

# EMail settings
EMAIL_HOST = os.environ.get("EMAIL_HOST")
EMAIL_PORT = os.environ.get("EMAIL_PORT")
EMAIL_HOST_USER = os.environ.get("EMAIL_HOST_USER")
EMAIL_HOST_PASSWORD = os.environ.get("EMAIL_HOST_PASSWORD")
EMAIL_USE_TLS = True  # TODO: Set this to False if using SSL


ALLOWED_HOSTS = os.environ.get("ALLOWED_HOSTS", "").split(",")

ADMIN_URL = os.environ.get("DJANGO_ADMIN_URL")
CSRF_TRUSTED_ORIGINS = ["https://djangoindia.org","https://www.djangoindia.org"]

# AWS settings

AWS_ACCESS_KEY_ID = os.environ.get("AWS_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = os.environ.get("AWS_SECRET_ACCESS_KEY")
AWS_STORAGE_BUCKET_NAME = os.environ.get("AWS_STORAGE_BUCKET_NAME")
AWS_S3_REGION_NAME = os.environ.get("AWS_S3_REGION_NAME")
AWS_S3_CUSTOM_DOMAIN = f"{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com"

# Media files (Images, etc.)
MEDIA_URL = f"https://{AWS_S3_CUSTOM_DOMAIN}/media/"

STORAGES = {
    "default": {
        "BACKEND": "djangoindia.storage_utils.S3MediaStorage",
    },
    "staticfiles": {
        "BACKEND": "djangoindia.storage_utils.S3StaticStorage",
    },
}

REST_FRAMEWORK.update({
    'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.AnonRateThrottle',
    ],
    'DEFAULT_THROTTLE_RATES': {
        'anon': '100/hour',
    }
})