from rest_framework import serializers

from django.utils import timezone

from djangoindia.db.models.event import Event, EventRegistration, EventUserRegistration

from .media_library import FolderLiteSerializer
from .partner_and_sponsor import CommunityPartnerSerializer, SponsorSerializer
from .volunteer import VolunteerSerializer


class EventLiteSerializer(serializers.Serializer):
    id = serializers.UUIDField(read_only=True)
    slug = serializers.SlugField(read_only=True)
    name = serializers.CharField(max_length=100)
    cover_image = serializers.ImageField()
    city = serializers.CharField()
    start_date = serializers.DateTimeField()
    event_mode = serializers.CharField()
    seats_left = serializers.IntegerField()


class EventSerializer(serializers.Serializer):
    id = serializers.UUIDField(read_only=True)
    slug = serializers.SlugField(read_only=True)
    name = serializers.CharField(max_length=100)
    description = serializers.CharField()
    cover_image = serializers.ImageField()
    venue = serializers.CharField()
    city = serializers.CharField()
    venue_map_link = serializers.URLField()
    start_date = serializers.DateTimeField()
    end_date = serializers.DateTimeField()
    registration_end_date = serializers.DateTimeField()
    event_mode = serializers.CharField()
    max_seats = serializers.IntegerField()
    seats_left = serializers.IntegerField()
    sponsors = SponsorSerializer(many=True, read_only=True, source="event_sponsors")
    partners = serializers.SerializerMethodField()
    volunteers = VolunteerSerializer(
        many=True, read_only=True, source="event_volunteers"
    )
    media = FolderLiteSerializer()
    registration_status = serializers.SerializerMethodField()

    def get_registration_status(self, obj):
        request = self.context.get("request")
        if request.user and request.user.is_authenticated:
            try:
                registration = EventUserRegistration.objects.get(
                    event=obj, user=request.user
                )
                return registration.status
            except EventUserRegistration.DoesNotExist:
                return None
        else:
            return None

    def get_partners(self, obj):
        partners = self.context.get("all_community_partners", [])
        return CommunityPartnerSerializer(
            partners, many=True, context=self.context
        ).data


class EventRegistrationSerializer(serializers.Serializer):
    event = serializers.PrimaryKeyRelatedField(queryset=Event.objects.all())
    email = serializers.EmailField()
    first_name = serializers.CharField(max_length=255)
    last_name = serializers.CharField(max_length=255)
    professional_status = serializers.ChoiceField(
        choices=EventRegistration.ProfessionalStatus
    )
    gender = serializers.ChoiceField(choices=EventRegistration.Gender)
    organization = serializers.CharField(
        max_length=100, required=False, allow_blank=True
    )
    description = serializers.CharField(required=False, allow_blank=True)
    linkedin = serializers.URLField()
    github = serializers.URLField(required=False, allow_blank=True)
    twitter = serializers.URLField(required=False, allow_blank=True)
    other_links = serializers.URLField(required=False, allow_blank=True)
    rsvp = serializers.BooleanField(default=False)
    include_in_attendee_list = serializers.BooleanField(default=False)

    def create(self, validated_data):
        return EventRegistration.objects.create(**validated_data)


class EventAttendeeSerializer(serializers.Serializer):
    full_name = serializers.SerializerMethodField()
    professional_status = serializers.ChoiceField(
        choices=EventRegistration.ProfessionalStatus
    )
    organization = serializers.CharField(
        max_length=100, required=False, allow_blank=True
    )
    description = serializers.CharField(required=False, allow_blank=True)
    gender = serializers.ChoiceField(choices=EventRegistration.Gender)
    email = serializers.EmailField()
    linkedin = serializers.URLField()
    github = serializers.URLField(required=False, allow_blank=True)
    twitter = serializers.URLField(required=False, allow_blank=True)
    first_time_attendee = serializers.BooleanField(default=True)
    attendee_type = serializers.ChoiceField(choices=EventRegistration.AttendeeType)

    def get_full_name(self, obj):
        return f"{obj.first_name} {obj.last_name}"


class EventUserRegistrationSerializer(serializers.ModelSerializer):
    status = serializers.CharField(required=True)
    rsvp_notes = serializers.CharField(required=False)

    class Meta:
        model = EventUserRegistration
        fields = [
            "id",
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

    def validate(self, attrs):
        # If this is an existing registration, check status transitions
        instance = getattr(self, "instance", None)

        if instance:
            current_status = instance.status
            new_status = attrs.get("status", current_status)

            # Validation for RSVPED status
            if current_status == self.Meta.model.RegistrationStatus.RSVPED:
                if new_status not in [
                    self.Meta.model.RegistrationStatus.CANCELLED,
                    current_status,
                ]:
                    raise serializers.ValidationError(
                        {"status": "RSVPED registration can only be cancelled."}
                    )

            # Validation for WAITLISTED status
            elif current_status == self.Meta.model.RegistrationStatus.WAITLISTED:
                if new_status not in [
                    self.Meta.model.RegistrationStatus.CANCELLED,
                    current_status,
                ]:
                    raise serializers.ValidationError(
                        {"status": "Waitlisted registration can only be cancelled."}
                    )

        return attrs

    def create(self, validated_data):
        # Set the user from the context
        validated_data["user"] = self.context["request"].user
        validated_data["event"] = self.context["event"]
        return super().create(validated_data)
