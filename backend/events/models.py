import uuid

from django.db import models


# Create your models here.
class Event(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255, unique=True, blank=False)
    cover_image = models.ImageField(upload_to="event_images/", blank=True)
    description = models.TextField(blank=False)
    venue = models.TextField(blank=False, default="TBA")
    city = models.CharField(max_length=255, blank=False, default="TBA")
    venue_map_link = models.URLField(blank=True)
    date_time = models.DateTimeField(blank=False, null=False)

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
        Event,
        on_delete=models.CASCADE,
        related_name="registrations",
        blank=False,
        null=False,
    )
    email = models.EmailField(blank=False, null=False)
    first_name = models.CharField(max_length=255, blank=False)
    last_name = models.CharField(max_length=255, blank=False)
    occupation = models.CharField(
        max_length=20, choices=OCCUPATION_CHOICES, blank=False
    )
    gender = models.CharField(
        max_length=10,
        choices=GENDER_CHOICES,
        blank=True,
        null=True
    )
    linkedin = models.URLField(blank=False)
    github = models.URLField(blank=True)
    twitter = models.URLField(blank=True)
    other_links = models.URLField(blank=True)
    # TODO: imnplement this (RSVP mailing + RSVP submission link)
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
