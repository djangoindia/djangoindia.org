from django.db import models

from .base import BaseModel
from django.utils import timezone
from django.core.exceptions import ValidationError
from django.utils.text import slugify

def validate_future_date(value):
    if value <= timezone.now():
        raise ValidationError("Date must be in the future.")


class Event(BaseModel):
    IN_PERSON = "In-person"
    ONLINE = "Online"
    
    EVENT_MODE_CHOICES = [
        (IN_PERSON, IN_PERSON),
        (ONLINE, ONLINE)
    ]

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
    event_mode = models.CharField(max_length=20,choices=EVENT_MODE_CHOICES,default=IN_PERSON)

    def clean(self):
        super().clean()
        if self.end_date <= self.start_date:
            raise ValidationError("End date must be after start date.")
        if self.registration_end_date >= self.start_date:
            raise ValidationError("Registration end date must be before event start date.")

    def __str__(self) -> str:
        return f"{self.name} @ {self.city} ({self.start_date.date()})"

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super(Event, self).save(*args, **kwargs)

class EventRegistration(BaseModel):
    WORKING_PROFESSIONAL = "working_professional"
    STUDENT = "student"
    FREELANCER = "freelancer"
    OTHER = "other"

    MALE = "male"
    FEMALE = "female"

    PROFESSIONAL_STATUS_CHOICES = [
        (WORKING_PROFESSIONAL, WORKING_PROFESSIONAL),
        (STUDENT, STUDENT),
        (FREELANCER, FREELANCER),
        (OTHER, OTHER)
    ]

    GENDER_CHOICES = [
        (MALE, MALE),
        (FEMALE, FEMALE),
        (OTHER, OTHER)
    ]

    event = models.ForeignKey(
        "db.Event",
        on_delete=models.CASCADE,
        related_name="registrations",
    )
    email = models.EmailField()
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    professional_status = models.CharField(
        max_length=100, choices=PROFESSIONAL_STATUS_CHOICES, default=OTHER
    )
    organization = models.CharField(max_length=100, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    gender = models.CharField(
        max_length=15,
        choices=GENDER_CHOICES
    )
    linkedin = models.URLField()
    github = models.URLField(null=True, blank=True)
    twitter = models.URLField(null=True, blank=True)
    other_links = models.URLField(null=True, blank=True)
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
