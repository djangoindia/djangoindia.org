from .base import BaseModel
from django.db import models


class BackgroundTaskLog(BaseModel):
    """
        model to hold the information about the background task that runs.
    """
    class StatusChoices(models.TextChoices):
        SUCCESSFULL = "successfully"
        FAILURE = "FAILURE"

    name = models.CharField(max_length=256, null=False, blank=False)
    start_datetime = models.DateTimeField(null=False)
    end_datetime = models.DateTimeField(null=True, blank=True)
    args = models.JSONField(default=dict, null=True, blank=True, help_text="default arguments present in task")
    kwargs = models.JSONField(default=dict, null=True, blank=True, help_text="Additional arguments")
    status = models.CharField(max_length=32, null=False, blank=False, choices=StatusChoices.choices)
    log = models.CharField(max_length=512, null=True, blank=True)
