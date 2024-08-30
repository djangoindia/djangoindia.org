from django.db import models
from .base import BaseModel
from .event import Event

class EventVolunteers(BaseModel):
    events = models.ManyToManyField(Event,related_name="events")
    full_name = models.CharField(max_length=100)
    email = models.EmailField()
    profile_pic = models.ImageField(upload_to='volunteers/') 
    linkedin_url = models.URLField()
    twitter_url = models.URLField()
    bio = models.CharField(max_length=5000)

    def __str__(self):
        return f"{self.full_name} {self.events.name}"