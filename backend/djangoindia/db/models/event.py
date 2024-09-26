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
        return f"{self.name} @ {self.city} ({self.start_date.date()})"

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

class Sponsor(BaseModel):

    class SponsorType(models.TextChoices):
        INDIVIDUAL = "individual"
        ORGANIZATION = "organization"

    name = models.CharField(max_length=255)
    email = models.CharField(max_length=100)
    type = models.CharField(max_length=20, choices=SponsorType.choices)
    logo = models.ImageField(upload_to='sponsors/logos/')
    url = models.URLField(max_length=500, blank=True, null=True)

    def __str__(self):
        return self.name

    
class Sponsorship(BaseModel):
    class SponsorshipTier(models.TextChoices):
        PLATINUM = "platinum"
        GOLD = "gold"
        SILVER = "silver"
        VENUE_SPONSORS = "venue_sponsors"
        FOOD_SPONSORS = "food_sponsors"
        SCHWAG_SPONSORS = "schwag_sponsors"
        GRANT = "grant"
        INDIVIDUAL = "individual"
        ORGANIZATION = "organization"
    
    class SponsorshipType(models.TextChoices):
        COMMUNITY_SPONSORSHIP = "community_sponsorship"
        EVENT_SPONSORSHIP = "event_sponsorship"
    
    sponsor_details = models.ForeignKey(Sponsor, on_delete=models.CASCADE, related_name='sponsorships')
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='sponsors', null=True, blank=True)
    tier = models.CharField(max_length=20, choices=SponsorshipTier.choices)
    type = models.CharField(max_length=30, choices=SponsorshipType.choices)
    amount_inr = models.IntegerField(null=True, blank=True)

    def clean(self):
        super().clean()
        if self.type == self.SponsorshipType.COMMUNITY_SPONSORSHIP and self.tier not in [self.SponsorshipTier.INDIVIDUAL, self.SponsorshipTier.ORGANIZATION, self.SponsorshipTier.GRANT]:
            raise ValidationError("For community sponsorship, tier must be 'individual', 'organization' or 'grant.")
        elif self.type == self.SponsorshipType.EVENT_SPONSORSHIP and self.tier not in [self.SponsorshipTier.PLATINUM, self.SponsorshipTier.GOLD, self.SponsorshipTier.SILVER, self.SponsorshipTier.VENUE_SPONSORS, self.SponsorshipTier.FOOD_SPONSORS, self.SponsorshipTier.GRANT, self.SponsorshipTier.SCHWAG_SPONSORS]:
            raise ValidationError("For event sponsorship, tier must be either 'platinum', 'gold', 'silver', 'venue_sponsors', 'food_sponsors', 'grant_sponsors' or 'schwag_sponsors'.")


    def __str__(self):
        return f"{self.sponsor_details.name} - {self.tier} - {self.type}"
