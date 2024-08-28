from django.db import models

from .base import BaseModel
from django.utils import timezone
from django.core.exceptions import ValidationError
from datetime import timedelta

def default_start_date():
    return timezone.now() + timedelta(days=2)

def default_registration_end_date():
    return timezone.now() + timedelta(days=1)

class Event(BaseModel):
    IN_PERSON = "In-person"
    ONLINE = "Online"
    
    EVENT_MODE_CHOICES = [
        (IN_PERSON, IN_PERSON),
        (ONLINE, ONLINE)
    ]

    name = models.CharField(max_length=255, unique=True)
    cover_image = models.ImageField(upload_to="event_images/", blank=True)
    description = models.TextField()
    venue = models.TextField(default="TBA",null=True, blank=True)
    city = models.CharField(max_length=255, default="TBA", null=True, blank=True)
    venue_map_link = models.TextField(null=True, blank=True)
    event_start_date = models.DateTimeField(null=False, default=default_start_date)
    event_end_date = models.DateTimeField()
    registration_end_date = models.DateTimeField(default=default_registration_end_date)
    event_mode = models.CharField(max_length=20,choices=EVENT_MODE_CHOICES,default=IN_PERSON)

    def clean(self):
        if self.event_end_date and self.event_start_date:
            if self.event_end_date <= self.event_start_date:
                raise ValidationError("Event end date must be after event start date.")

        super().clean()

    def __str__(self) -> str:
        return f"{self.name} @ {self.city} ({self.event_start_date.date()})"

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

    

class Sponsor(BaseModel):
    
    INDIVIDUAL = "individual"
    ORGANIZATION = "organization"
    
    SPONSOR_TYPE_CHOICES = [
        (INDIVIDUAL, INDIVIDUAL),
        (ORGANIZATION, ORGANIZATION),
    ]

    name = models.CharField(max_length=255)
    email = models.CharField(max_length=100)
    type = models.CharField(max_length=20, choices=SPONSOR_TYPE_CHOICES)
    logo = models.ImageField(upload_to='sponsors/logos/')
    url = models.URLField(max_length=500, blank=True, null=True)

    def __str__(self):
        return self.name

    
class Sponsorship(BaseModel):
    
    PLATINUM = "platinum"
    GOLD = "gold"
    SILVER = "silver"
    INDIVIDUAL = "individual"
    ORGANIZATION = "organization"

    COMMUNITY_SPONSORSHIP = "community_sponsorship"
    EVENT_SPONSORSHIP = "event_sponsorship"
    
    SPONSORSHIP_TIER_CHOICES = [
        (PLATINUM, PLATINUM),
        (GOLD, GOLD),
        (SILVER, SILVER),
        (INDIVIDUAL, INDIVIDUAL),
        (ORGANIZATION, ORGANIZATION),
    ]

    SPONSORSHIP_TYPE_CHOICES = [
        (COMMUNITY_SPONSORSHIP, COMMUNITY_SPONSORSHIP),
        (EVENT_SPONSORSHIP, EVENT_SPONSORSHIP),
    ]

    sponsor_details = models.ForeignKey(Sponsor, on_delete=models.CASCADE, related_name='sponsorships')
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='sponsors', null=True, blank=True)
    tier = models.CharField(max_length=20, choices=SPONSORSHIP_TIER_CHOICES)
    type = models.CharField(max_length=30, choices=SPONSORSHIP_TYPE_CHOICES)

    def clean(self):
        super().clean()
        if self.type == self.COMMUNITY_SPONSORSHIP and self.tier not in [self.INDIVIDUAL, self.ORGANIZATION]:
            raise ValidationError("For community sponsorship, tier must be either 'individual' or 'organization'.")
        elif self.type == self.EVENT_SPONSORSHIP and self.tier not in [self.PLATINUM, self.GOLD, self.SILVER]:
            raise ValidationError("For event sponsorship, tier must be either 'platinum', 'gold', or 'silver'.")


    def __str__(self):
        return f"{self.sponsor_details.name} - {self.tier} - {self.type}"
