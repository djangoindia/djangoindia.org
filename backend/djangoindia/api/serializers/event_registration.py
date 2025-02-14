from rest_framework import serializers

from django.utils import timezone

from djangoindia.api.serializers.user import UserLiteSerializer
from djangoindia.db.models import EventUserRegistration


class EventUserRegistrationSerializer(serializers.ModelSerializer):
    user = UserLiteSerializer(read_only=True)
    status = serializers.CharField(read_only=True)

    class Meta:
        model = EventUserRegistration
        fields = [
            "id",
            "user",
            "status",
            "first_time_attendee",
            "rsvp_notes",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["first_time_attendee"]

    def validate_event(self, event):
        now = timezone.now()

        if event.start_date > now:
            raise serializers.ValidationError(
                "Registration for this event has not started yet."
            )

        if event.end_date <= now:
            raise serializers.ValidationError("Registration for this event has ended.")

        if event.registration_end_date <= now:
            raise serializers.ValidationError("Registration for this event has ended.")

        return event

    def create(self, validated_data):
        # Set the user from the context
        validated_data["user"] = self.context["request"].user
        return super().create(validated_data)
