from django.db import models


# Create your models here.
class Event(models.Model):
    name = models.CharField(max_length=255, unique=True, blank=False)
    # TODO cover_image = ...
    description = models.TextField(blank=False)
    venue = models.TextField(blank=False, default="TBA")
    city = models.CharField(max_length=255, blank=False, default="TBA")
    venue_map_link = models.URLField(blank=True)
    date_time = models.DateTimeField(blank=False)

    def __str__(self) -> str:
        return f"{self.name} @ {self.city} ({self.date_time.date()})"
