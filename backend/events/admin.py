from django import forms
from django.contrib import admin

from .models import Event, EventRegistration


# Register your models here.
class EventForm(forms.ModelForm):
    class Meta:
        model = Event
        fields = "__all__"
        widgets = {
            "description": forms.Textarea(attrs={"placeholder": "Enter markdown here"})
        }


class EventRegistrationInline(admin.TabularInline):
    model = EventRegistration
    extra = 0
    readonly_fields = [field.name for field in EventRegistration._meta.get_fields()]


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    form = EventForm
    inlines = [EventRegistrationInline]


admin.site.register(EventRegistration)
