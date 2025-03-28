from django import forms
from django.contrib.admin.widgets import FilteredSelectMultiple

from djangoindia.db.models.communication import EventCommunication, Subscriber
from djangoindia.db.models.event import Event
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
        queryset=Subscriber.objects.all(),
        widget=FilteredSelectMultiple("recipents", False),
        required=False,
    )

    class Meta:
        model = Update
        fields = [
            "email_subject",
            "type",
            "email_body",
            "recipients",
        ]


class PromoteFromWaitlistForm(forms.Form):
    _selected_action = forms.CharField(widget=forms.MultipleHiddenInput)
    number_to_promote = forms.IntegerField(
        min_value=1, label="Number of people to promote"
    )


class EventCommunicationForm(forms.ModelForm):
    recipient = forms.ModelMultipleChoiceField(
        queryset=EventCommunication.objects.all(),
        widget=FilteredSelectMultiple("recipent", False),
        required=False,
    )

    class Meta:
        model = EventCommunication
        fields = [
            "event",
            "recipient",
            "subject",
            "body",
            "status",
            "sent_at",
            "err_msg",
        ]
