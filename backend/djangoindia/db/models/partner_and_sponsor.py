from django.core.exceptions import ValidationError
from django.db import models

from .base import BaseModel


class Sponsor(BaseModel):
    class SponsorType(models.TextChoices):
        INDIVIDUAL = "individual"
        ORGANIZATION = "organization"

    name = models.CharField(max_length=255)
    email = models.CharField(max_length=100)
    type = models.CharField(max_length=20, choices=SponsorType.choices)
    logo = models.ImageField(upload_to="sponsors/logos/")
    url = models.URLField(max_length=500, blank=True, null=True)
    description = models.TextField(max_length=500, null=True, blank=True)

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

    sponsor_details = models.ForeignKey(
        Sponsor, on_delete=models.CASCADE, related_name="sponsorships"
    )
    event = models.ForeignKey(
        "db.Event",
        on_delete=models.CASCADE,
        related_name="sponsors",
        null=True,
        blank=True,
    )
    tier = models.CharField(max_length=20, choices=SponsorshipTier.choices)
    type = models.CharField(max_length=30, choices=SponsorshipType.choices)
    amount_inr = models.IntegerField(null=True, blank=True)

    def clean(self):
        super().clean()
        if (
            self.type == self.SponsorshipType.COMMUNITY_SPONSORSHIP
            and self.tier
            not in [
                self.SponsorshipTier.INDIVIDUAL,
                self.SponsorshipTier.ORGANIZATION,
                self.SponsorshipTier.GRANT,
            ]
        ):
            raise ValidationError(
                "For community sponsorship, tier must be 'individual', 'organization' or 'grant."
            )
        elif self.type == self.SponsorshipType.EVENT_SPONSORSHIP and self.tier not in [
            self.SponsorshipTier.PLATINUM,
            self.SponsorshipTier.GOLD,
            self.SponsorshipTier.SILVER,
            self.SponsorshipTier.VENUE_SPONSORS,
            self.SponsorshipTier.FOOD_SPONSORS,
            self.SponsorshipTier.GRANT,
            self.SponsorshipTier.SCHWAG_SPONSORS,
        ]:
            raise ValidationError(
                "For event sponsorship, tier must be either 'platinum', 'gold', 'silver', 'venue_sponsors', 'food_sponsors', 'grant_sponsors' or 'schwag_sponsors'."
            )

    def __str__(self):
        return f"{self.sponsor_details.name} - {self.tier} - {self.type}"


class CommunityPartner(BaseModel):
    name = models.CharField(max_length=255)
    logo = models.ImageField(upload_to="partners/logos/")
    website = models.URLField(max_length=255, blank=True, null=True)
    contact_name = models.CharField(max_length=255)
    contact_email = models.EmailField()
    contact_number = models.CharField(max_length=15, blank=True, null=True)
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.name
