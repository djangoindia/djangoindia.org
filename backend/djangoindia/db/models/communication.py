from django.conf import settings
from django.db import models

from .base import BaseModel


class Subscriber(BaseModel):
    name = models.CharField(max_length=100)
    email = models.EmailField()

    def __str__(self):
        return self.email


class ContactUs(BaseModel):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class EventCommunication(BaseModel):
    """Model to track all emails sent to the event registrants through the system"""

    class Status(models.TextChoices):
        PENDING = "pending", "Pending"
        SENT = "sent", "Sent"
        FAILED = "failed", "Failed"

    event = models.ForeignKey(
        "db.event", on_delete=models.CASCADE, related_name="event_communications"
    )
    recipient = models.ManyToManyField(
        settings.AUTH_USER_MODEL, related_name="event_communications"
    )
    subject = models.CharField(max_length=255)
    body = models.TextField()
    status = models.CharField(
        max_length=20, choices=Status.choices, default=Status.PENDING
    )
    sent_at = models.DateTimeField(null=True, blank=True)
    err_msg = models.TextField(null=True, blank=True)

    class Meta:
        verbose_name = "Event Communication"
        verbose_name_plural = "Event Communications"
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.subject} - {self.status}"
