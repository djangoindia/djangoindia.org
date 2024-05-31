from django.db import models
from django.core.exceptions import ValidationError


# Create your models here.
class Event(models.Model):
    # Keeping `id` as the primary key instead of name for easier querying via views/serializers
    name = models.CharField(max_length=255, unique=True, blank=False)
    cover_image = models.ImageField(upload_to="event_images/", blank=True, null=True)
    description = models.TextField(blank=False)
    venue = models.TextField(blank=False, default="TBA")
    city = models.CharField(max_length=255, blank=False, default="TBA")
    venue_map_link = models.URLField(blank=True, null=True)
    date_time = models.DateTimeField(blank=False)

    def __str__(self) -> str:
        return f"{self.name} @ {self.city} ({self.date_time.date()})"


class EventRegistration(models.Model):
    OCCUPATION_CHOICES = [
        ("working_professional", "Working Professional"),
        ("student", "Student"),
        ("freelancer", "Freelancer"),
    ]
    GENDER_CHOICES = [
        ("male", "Male"),
        ("female", "Female"),
        ("other", "Other"),
    ]

    event = models.ForeignKey(
        Event, on_delete=models.CASCADE, related_name="registrations"
    )
    email = models.EmailField()
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    occupation = models.CharField(max_length=20, choices=OCCUPATION_CHOICES)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    linkedin = models.URLField(blank=False, null=False)
    github = models.URLField(blank=True, null=True)
    twitter = models.URLField(blank=True, null=True)
    other_links = models.URLField(blank=True, null=True)
    # TODO imnplement this (RSVP mailing + RSVP submission link)
    rsvp = models.BooleanField(default=False, blank=False)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["email", "event"], name="unique_event_registration"
            )
        ]

    def __str__(self) -> str:
        return (
            f"{self.first_name} {self.last_name} ({self.email}) --- {self.event.name}"
        )
