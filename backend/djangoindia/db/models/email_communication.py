from django.conf import settings
from django.db import models

from .base import BaseModel


class EventCommunication(BaseModel):
    """Model to track all emails sent through the system"""

    class STATUS:
        PENDING = "pending"
        SENT = "sent"
        FAILED = "failed"

        CHOICES = (
            (PENDING, "Pending"),
            (SENT, "Sent"),
            (FAILED, "Failed"),
        )

    event = models.ForeignKey(
        "db.event", on_delete=models.CASCADE, related_name="email_communications"
    )
    recipient = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="email_communications",
    )
    subject = models.CharField(max_length=255)
    body = models.TextField()
    status = models.CharField(
        max_length=20, choices=STATUS.CHOICES, default=STATUS.PENDING
    )
    sent_at = models.DateTimeField(null=True, blank=True)
    err_msg = models.TextField(null=True, blank=True)

    class Meta:
        verbose_name = "Event Communication"
        verbose_name_plural = "Event Communications"
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.subject} - {self.recipient.email} - {self.status}"
