from django.db import models
from .base import BaseModel
from .event import Event


class Volunteer(BaseModel):
    event = models.ForeignKey(Event, on_delete=models.CASCADE,related_name="volunteers")
    photo = models.ImageField(null=True, blank=True,upload_to="volunteers/photos/")
    name = models.CharField(max_length=255)
    about = models.CharField(max_length=50, null=True, blank=True)
    email = models.EmailField(null=True, blank=True)
    twitter = models.URLField(null=True, blank=True)
    linkedin = models.URLField(null=True, blank=True)

    def __str__(self):
        return self.name
    class Meta:
        unique_together = ['event', 'email']