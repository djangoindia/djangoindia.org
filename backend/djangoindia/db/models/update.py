from django.db import models
from .base import BaseModel
from django.contrib.auth.models import User
from djangoindia.db.models.communication import NewsletterSubscription

class Update(BaseModel):
    UPDATE_TYPE_CHOICES = [
        ('DJANGO_UPDATE', 'Django Update'),
        ('EVENT_UPDATE', 'Event Update'),
        ('NEWSLETTER', 'Newsletter'),
        ('COMMUNITY_UPDATE', 'Community Update')
    ]
    title = models.CharField(max_length=255)
    update_type = models.CharField(max_length=20, choices=UPDATE_TYPE_CHOICES)
    content = models.TextField()
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    recipients = models.ManyToManyField(NewsletterSubscription, related_name='received_updates')
    sent_successfully = models.ManyToManyField(NewsletterSubscription, related_name='successful_updates')
    failed_to_send = models.ManyToManyField(NewsletterSubscription, related_name='failed_updates')

    def __str__(self):
        return self.title
