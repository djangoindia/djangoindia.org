from .base import BaseModel
from django.db import models


class BackgroundTaskLog(BaseModel):
    """
        model to hold the information about the background task that runs.
    """
    class StatusChoices(models.TextChoices):
        STARTED = "started"
        IN_PROGRESS = "in_progress"
        FAILED = "failed"
        COMPLETE = "complete"

    name = models.CharField(max_length=256, null=False, blank=False)
    args = models.JSONField(default=dict, null=True, blank=True)
    kwargs = models.JSONField(default=dict, null=True, blank=True)
    status = models.CharField(max_length=32, null=False, blank=False,default=StatusChoices.STARTED,
                              choices=StatusChoices.choices)
    error = models.CharField(max_length=512, null=True, blank=True)
    
    
    def validate_status(self):
        status_values = BackgroundTaskLog.StatusChoices.names
        if self.status not in status_values:
            raise ValueError(f"Invalid status choice it should be one of {','.join(status_values)}")