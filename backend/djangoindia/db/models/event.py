from cabinet.models import Folder

from django.db import models
from django.utils.text import slugify

from .base import BaseModel
from .volunteer import Volunteer


class Event(BaseModel):
    class EventModes(models.TextChoices):
        IN_PERSON = "in_person"
        ONLINE = "online"

    name = models.CharField(max_length=255, unique=True)
    slug = models.SlugField(max_length=255)
    cover_image = models.ImageField(upload_to="event_images/", blank=True)
    description = models.TextField()
    venue = models.TextField(default="TBA", null=True, blank=True)
    city = models.CharField(max_length=255, default="TBA", null=True, blank=True)
    venue_map_link = models.TextField(null=True, blank=True)
    start_date = models.DateTimeField(null=True, blank=True)
    end_date = models.DateTimeField(null=True, blank=True)
    registration_end_date = models.DateTimeField(null=True, blank=True)
    event_mode = models.CharField(
        max_length=20, choices=EventModes.choices, default=EventModes.IN_PERSON
    )
    max_seats = models.IntegerField(null=True, blank=True)
    seats_left = models.IntegerField(null=True, blank=True)
    volunteers = models.ManyToManyField(Volunteer, related_name="events")
    media = models.ForeignKey(Folder, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self) -> str:
        return f"{self.name}"

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class EventRegistration(BaseModel):
    class ProfessionalStatus(models.TextChoices):
        WORKING_PROFESSIONAL = "working_professional"
        STUDENT = "student"
        FREELANCER = "freelancer"
        OTHER = "other"

    class Gender(models.TextChoices):
        MALE = "male"
        FEMALE = "female"
        OTHER = "other"

    class AttendeeType(models.TextChoices):
        GUEST = "guest", "Guest"
        HOST = "host", "Host"
        SPEAKER = "speaker", "Speaker"
        VOLUNTEER = "volunteer", "Volunteer"

    event = models.ForeignKey(
        "db.Event",
        on_delete=models.CASCADE,
        related_name="registrations",
    )
    email = models.EmailField()
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    professional_status = models.CharField(
        max_length=100,
        choices=ProfessionalStatus.choices,
        default=ProfessionalStatus.OTHER,
    )
    organization = models.CharField(max_length=100, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    gender = models.CharField(max_length=15, choices=Gender.choices)
    linkedin = models.URLField()
    github = models.URLField(null=True, blank=True)
    twitter = models.URLField(null=True, blank=True)
    other_links = models.URLField(null=True, blank=True)
    include_in_attendee_list = models.BooleanField(default=False)
    # TODO: imnplement this (RSVP mailing + RSVP submission link)
    rsvp = models.BooleanField(default=False)
    first_time_attendee = models.BooleanField(default=True)
    attendee_type = models.CharField(
        max_length=20, choices=AttendeeType.choices, default=AttendeeType.GUEST
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["email", "event"], name="unique_event_registration"
            )
        ]

    def save(self, *args, **kwargs):
        # This is a new registration
        if self._state.adding:
            user_has_registered_before = EventRegistration.objects.filter(
                email=self.email
            ).exists()
            self.first_time_attendee = not user_has_registered_before

            if self.event.seats_left > 0:
                self.event.seats_left -= 1
                self.event.save()
            else:
                raise ValueError("No seats left for this event.")
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return (
            f"{self.first_name} {self.last_name} ({self.email}) --- {self.event.name}"
        )
