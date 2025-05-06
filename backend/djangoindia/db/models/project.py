from django.conf import settings
from django.db import models

from djangoindia.db.models.base import BaseModel


class Project(BaseModel):
    """
    Model to store project submissions by authenticated users.

    Projects submitted here are reviewed by an admin before being displayed
    on the Django Wall.
    """

    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("approved", "Approved"),
        ("rejected", "Rejected"),
    ]

    title = models.CharField(max_length=255)
    description = models.TextField()
    company_email = models.EmailField(blank=True, null=True)
    github_link = models.URLField(blank=True, null=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="pending")
    submitted_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    submitted_at = models.DateTimeField(auto_now_add=True)
    website_link = models.URLField(blank=True, null=True)
    tech_stack = models.CharField(max_length=255, blank=True, null=True)
    keywords = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f"{self.title}"
