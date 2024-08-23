from django import forms

from djangoindia.db.models.event import Event
from djangoindia.db.models.communication import NewsletterSubscription
from djangoindia.db.models.update import Update


class EventForm(forms.ModelForm):
    class Meta:
        model = Event
        fields = "__all__"
        widgets = {
            "description": forms.Textarea(attrs={"placeholder": "Enter markdown here"})
        }

class EmailForm(forms.Form):
    subject = forms.CharField(max_length=255, required=True)
    message = forms.CharField(widget=forms.Textarea, required=True)

class UpdateForm(forms.ModelForm):
    recipients = forms.ModelMultipleChoiceField(
        queryset=NewsletterSubscription.objects.all(),
        widget=forms.CheckboxSelectMultiple,
        required=False
    )

    class Meta:
        model = Update
        fields = ['title', 'update_type', 'content', 'recipients']