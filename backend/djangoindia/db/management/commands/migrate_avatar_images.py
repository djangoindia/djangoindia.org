import uuid

import requests

from django.contrib.auth import get_user_model
from django.core.files.base import ContentFile
from django.core.management.base import BaseCommand


User = get_user_model()


class Command(BaseCommand):
    help = "Migrate existing avatar URLs to images"

    def handle(self, *args, **kwargs):
        users = User.objects.all()
        for user in users:
            if user.avatar and user.avatar.url.startswith("https"):
                try:
                    response = requests.get(user.avatar)
                    if response.status_code == 200:
                        image_content = ContentFile(response.content)
                        unique_filename = f"{uuid.uuid4()}.jpg"
                        user.avatar.save(unique_filename, image_content, save=True)
                        self.stdout.write(
                            self.style.SUCCESS(
                                f"Successfully migrated avatar for {user.email}"
                            )
                        )
                    else:
                        self.stdout.write(
                            self.style.WARNING(
                                f"Failed to download image for {user.email}"
                            )
                        )
                except Exception as e:
                    self.stdout.write(
                        self.style.ERROR(
                            f"Error migrating avatar for {user.email}: {str(e)}"
                        )
                    )
