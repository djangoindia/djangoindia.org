from django.db import models
import uuid
from .base import BaseModel


class Subscriber(BaseModel):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    unsubscribe_token = models.CharField(max_length=255, unique=True, blank=True, null=True)

    def __str__(self):
        return self.email
    def generate_unsubscribe_token(self):
        self.unsubscribe_token = uuid.uuid4().hex
        self.save()


class ContactUs(BaseModel):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
