from django_prose_editor.fields import ProseEditorField

from django.core.exceptions import ValidationError
from django.conf import settings
from django.db import models
from django.core.mail import send_mail

from djangoindia.bg_tasks.send_update import send_mass_update_email_task

from .base import BaseModel


class Update(BaseModel):
    class UpdateType(models.TextChoices):
        DJANGO_UPDATE = "django_update"
        EVENT_UPDATE = "event_update"
        NEWSLETTER = "newsletter"
        COMMUNITY_UPDATE = "community_update"

    email_subject = models.CharField(max_length=255)
    type = models.CharField(max_length=20, choices=UpdateType.choices)
    email_body = ProseEditorField()
    recipients = models.ManyToManyField("Subscriber", related_name="received_updates")
    mail_sent = models.BooleanField(default=False)
    test_email_recipients = models.TextField(
        blank=True,
        help_text="Enter comma-separated email addresses for the test email."
    )

    def __str__(self):
        return self.email_subject

    def send_bulk_emails(self):
        if self.id and self.recipients.count() > 0:
            send_mass_update_email_task.delay(self.id)

    def send_test_email(self) -> None:
        """
        Send a test email to the test email recipients.

        Args:
            None            

        Returns:
            None

        Raises:
            ValidationError: If there is an error sending the email.
        """
        for email in self.test_email_recipients.split(","):
            email = email.strip()
            if email:
                try:
                    send_mail(
                        subject=self.email_subject,
                        message=self.email_body, 
                        from_email=settings.DEFAULT_FROM_EMAIL,
                        recipient_list=[email],
                        fail_silently=False
                    )
                except ValidationError as e:
                    raise ValidationError(f"Error sending test email: {str(e)}")
                
    def get_formatted_type(self):
        words = self.type.split("_")
        formatted_words = [word.capitalize() for word in words]
        return " ".join(formatted_words)
