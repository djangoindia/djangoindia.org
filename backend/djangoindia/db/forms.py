from django import forms

from djangoindia.db.models.event import Event


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