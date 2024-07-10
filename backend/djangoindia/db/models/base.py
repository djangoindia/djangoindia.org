import uuid

# Django imports
from django.db import models


class BaseModel(models.Model):
    id = models.UUIDField(
        default=uuid.uuid4,
        unique=True,
        editable=False,
        db_index=True,
        primary_key=True,
    )

    class Meta:
        abstract = True