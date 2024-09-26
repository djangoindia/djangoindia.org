from django.db import models
from .base import BaseModel
from django.contrib.auth.models import User

from django.db import models
from django.contrib.auth.models import User
from djangoindia.bg_tasks.send_update import send_mass_update_email_task

class Update(BaseModel):
    class UpdateType(models.TextChoices):
        DJANGO_UPDATE = "django_update"
        EVENT_UPDATE = "event_update"
        NEWSLETTER = "newsletter"
        COMMUNITY_UPDATE = "community_update"
        
    title = models.CharField(max_length=255)
    type = models.CharField(max_length=20, choices=UpdateType.choices)
    html_template = models.TextField()
    created_by = models.ForeignKey(User, on_delete=models.DO_NOTHING, editable=False)
    recipients = models.ManyToManyField('Subscriber', related_name='received_updates')
    mail_sent = models.BooleanField(default=False)

    def __str__(self):
        return self.title
    
    def send_bulk_emails(self):
        if self.id and self.recipients.count() > 0:
            send_mass_update_email_task.delay(self.id)
    
    def get_formatted_type(self):
        words = self.type.split("_")
        formatted_words = [word.capitalize() for word in words]
        return " ".join(formatted_words)
