from django.db import models

from .base import BaseModel
from django.utils import timezone
from django.core.exceptions import ValidationError
from django.utils.text import slugify

def validate_future_date(value):
    if value <= timezone.now():
        raise ValidationError("Date must be in the future.")


class Event(BaseModel):

    class EventModes(models.TextChoices):
        IN_PERSON = "in_person"
        ONLINE = "online"

    name = models.CharField(max_length=255, unique=True)
    slug = models.SlugField(max_length=255)
    cover_image = models.ImageField(upload_to="event_images/", blank=True)
    description = models.TextField()
    venue = models.TextField(default="TBA",null=True, blank=True)
    city = models.CharField(max_length=255, default="TBA", null=True, blank=True)
    venue_map_link = models.TextField(null=True, blank=True)
    start_date = models.DateTimeField(null=True, blank=True, validators=[validate_future_date])
    end_date = models.DateTimeField(null=True, blank=True, validators=[validate_future_date])
    registration_end_date = models.DateTimeField(null=True, blank=True, validators=[validate_future_date])
    event_mode = models.CharField(max_length=20,choices=EventModes.choices,default=EventModes.IN_PERSON)
    max_seats = models.IntegerField(null=True, blank=True)
    seats_left = models.IntegerField(null=True, blank=True)

    def clean(self):
        super().clean()
        
        if self.start_date and self.end_date:
            if self.end_date <= self.start_date:
                raise ValidationError("End date must be after start date.")

        if self.start_date and self.registration_end_date:
            if self.registration_end_date > self.start_date:
                raise ValidationError("Registration end date must be on or before event start date.")

        if self.registration_end_date and self.end_date:
            if self.registration_end_date > self.end_date:
                raise ValidationError("Registration end date cannot be after event end date.")

    def __str__(self) -> str:
        return f"{self.name}"

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super(Event, self).save(*args, **kwargs)

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

    event = models.ForeignKey(
        "db.Event",
        on_delete=models.CASCADE,
        related_name="registrations",
    )
    email = models.EmailField()
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    professional_status = models.CharField(
        max_length=100, choices=ProfessionalStatus.choices, default=ProfessionalStatus.OTHER
    )
    organization = models.CharField(max_length=100, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    gender = models.CharField(
        max_length=15,
        choices=Gender.choices
    )
    linkedin = models.URLField()
    github = models.URLField(null=True, blank=True)
    twitter = models.URLField(null=True, blank=True)
    other_links = models.URLField(null=True, blank=True)
    include_in_attendee_list = models.BooleanField(default=False)
    # TODO: imnplement this (RSVP mailing + RSVP submission link)
    rsvp = models.BooleanField(default=False)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["email", "event"], name="unique_event_registration"
            )
        ]

    def save(self, *args, **kwargs):
        # This is a new registration     
        if self._state.adding:
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

