from django.db import models
from .base import BaseModel

class NewsletterSubscription(BaseModel):
    name = models.CharField(max_length=100)
    email = models.EmailField()

    def __str__(self):
        return self.email