from __future__ import absolute_import, unicode_literals

import os

from celery import Celery
from celery.schedules import crontab
from djangoindia.bg_tasks.dbbackup import nightly_db_backup
n
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "djangoindia.settings.local")

app = Celery("djangoindia")
app.conf.timezone = 'Asia/Kolkata'
app.config_from_object("django.conf:settings", namespace="CELERY")
app.conf.beat_schedule = {
    'nightly-db-backup': {
        'task': 'nightly_db_backup',  
        'schedule': crontab(hour=3, minute=0),  # triggers at 3:00 AM IST
    },
}
app.autodiscover_tasks()  # This should autodiscover tasks in all apps
