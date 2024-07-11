from django.db import models

from .base import BaseModel


class Event(BaseModel):
    name = models.CharField(max_length=255, unique=True)
    cover_image = models.ImageField(upload_to="event_images/", blank=True)
    description = models.TextField()
    venue = models.TextField( default="TBA")
    city = models.CharField(max_length=255,  default="TBA")
    venue_map_link = models.URLField(blank=True)
    date_time = models.DateTimeField(null=False)

    def __str__(self) -> str:
        return f"{self.name} @ {self.city} ({self.date_time.date()})"


class EventRegistration(BaseModel):
    OCCUPATION_CHOICES = [
        ("working_professional", "Working Professional"),
        ("student", "Student"),
        ("freelancer", "Freelancer"),
    ]
    GENDER_CHOICES = [
        ("male", "Male"),
        ("female", "Female"),
        ("other", "Other"),
        ("not_specified", "Not Specified" )
    ]

    event = models.ForeignKey(
        "db.Event",
        on_delete=models.CASCADE,
        related_name="registrations",
    )
    email = models.EmailField()
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    occupation = models.CharField(
        max_length=20, choices=OCCUPATION_CHOICES
    )
    gender = models.CharField(
        max_length=15,
        choices=GENDER_CHOICES,
        blank=True,
        null=True
    )
    linkedin = models.URLField()
    github = models.URLField(blank=True)
    twitter = models.URLField(blank=True)
    other_links = models.URLField(blank=True)
    # TODO: imnplement this (RSVP mailing + RSVP submission link)
    rsvp = models.BooleanField(default=False)

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

class NewsletterSubscription(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.email
