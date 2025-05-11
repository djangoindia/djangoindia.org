from django.conf import settings
from django.db import models

from djangoindia.db.models.base import BaseModel


class Project(BaseModel):
    """
    Model to store project submissions by authenticated users.

    Projects submitted here are reviewed by an admin before being displayed
    on the Django Wall. Each project must have a valid GitHub repository
    and should be a Django project.
    """

    class Status(models.TextChoices):
        PENDING = "pending", "Pending"
        APPROVED = "approved", "Approved"
        REJECTED = "rejected", "Rejected"

    title = models.CharField(max_length=255)
    description = models.TextField()
    company_email = models.EmailField(blank=True, null=True)
    github_link = models.URLField()
    project_demo_link = models.URLField(blank=True, null=True)
    status = models.CharField(
        max_length=10, choices=Status.choices, default=Status.PENDING
    )
    submitted_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="submitted_projects",
    )
    submitted_at = models.DateTimeField(auto_now_add=True)
    tech_stack = models.CharField(max_length=255, blank=True, null=True)
    keywords = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        verbose_name = "Project"
        verbose_name_plural = "Projects"
        ordering = ["-submitted_at"]
        indexes = [
            models.Index(fields=["status"]),
            models.Index(fields=["submitted_at"]),
        ]

    def __str__(self):
        return f"{self.title}"
