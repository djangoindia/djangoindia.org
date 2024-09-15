from django.db import models

from .base import BaseModel

class CommunityPartner(BaseModel):
    organization_name = models.CharField(max_length=255)
    organization_website = models.URLField(max_length=255, blank=True, null=True)
    organization_email = models.EmailField()
    contact_person_name = models.CharField(max_length=255)
    contact_person_email = models.EmailField()
    contact_person_phone_number = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField()

    def __str__(self):
        """
        Return a string representation of the community partner.

        This is the organization name. It is used as the default string
        representation of the object in the Django admin interface and
        in any other context where an object needs to be represented as
        a string.
        """
        return self.organization_name