from __future__ import absolute_import, unicode_literals

import os

from celery import Celery


os.environ.setdefault("DJANGO_SETTINGS_MODULE", "djangoindia.settings.local")

app = Celery("djangoindia")

app.config_from_object("django.conf:settings", namespace="CELERY")
app.autodiscover_tasks()  # This should autodiscover tasks in all apps
