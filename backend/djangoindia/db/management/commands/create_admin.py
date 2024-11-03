import os

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Create a superuser."

    def handle(self, *args, **options):
        User = get_user_model()
        if not User.objects.filter(
            username=os.getenv("DJANGO_SUPERUSER_USERNAME")
        ).exists():
            User.objects.create_superuser(
                username=os.getenv("DJANGO_SUPERUSER_USERNAME"),
                email=os.getenv("DJANGO_SUPERUSER_EMAIL"),
                password=os.getenv("DJANGO_SUPERUSER_PASSWORD"),
            )
            print("Superuser created.")
        else:
            print("Superuser already exists.")
