from storages.backends.s3boto3 import S3Boto3Storage

from django.conf import settings


class S3StaticStorage(S3Boto3Storage):
    location = getattr(settings, "AWS_STATIC_STORAGE_LOCATION", "static")
    default_acl = "public-read"


class S3MediaStorage(S3Boto3Storage):
    location = getattr(settings, "AWS_MEDIA_STORAGE_LOCATION", "media")
    default_acl = "public-read"
