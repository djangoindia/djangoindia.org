from django.db import models

from .base import BaseModel

class CommunityPartner(BaseModel):
    name = models.CharField(max_length=255)
    website = models.URLField(max_length=255, blank=True, null=True)
    contact_name = models.CharField(max_length=255)
    contact_email = models.EmailField()
    contact_number = models.CharField(max_length=15, blank=True, null=True)
    description = models.TextField()

    def __str__(self):
        """
        Return a string representation of the community partner.

        This is the name of the community partner. It is used as the 
        default string representation of the object in the Django admin 
        interface and in any other context where an object needs to be 
        represented as a string.
        """
        return self.name