from django import forms
from django.contrib import admin

from .models import Event


# Register your models here.
class EventForm(forms.ModelForm):
    class Meta:
        model = Event
        fields = "__all__"
        widgets = {
            "description": forms.Textarea(attrs={"placeholder": "Enter markdown here"})
        }


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    form = EventForm
