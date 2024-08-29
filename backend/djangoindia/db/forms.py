from django import forms

from djangoindia.db.models.event import Event
from djangoindia.db.models.volunteers import EventVolunteers


class EventForm(forms.ModelForm):
    class Meta:
        model = Event
        fields = "__all__"
        widgets = {
            "description": forms.Textarea(attrs={"placeholder": "Enter markdown here"})
        }

class EventVolunteerCreationForm(forms.ModelForm):
    class Meta:
        model = EventVolunteers
        fields = ("full_name" , "email" , "profile_pic" , "linkedin_url" , "twitter_url" , "bio",)

class EmailForm(forms.Form):
    subject = forms.CharField(max_length=255, required=True)
    message = forms.CharField(widget=forms.Textarea, required=True)