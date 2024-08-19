from rest_framework import serializers

from djangoindia.db.models.event import Event, EventRegistration


class EventSerializer(serializers.Serializer):
    id = serializers.UUIDField(read_only=True)
    name = serializers.CharField(max_length=100)
    description = serializers.CharField()
    cover_image = serializers.ImageField()
    venue= serializers.CharField()
    city= serializers.CharField()
    venue_map_link= serializers.URLField()
    event_start_date= serializers.DateTimeField()
    event_end_date= serializers.DateTimeField()
    registration_end_date= serializers.DateTimeField()
    event_mode = serializers.CharField()


class EventRegistrationSerializer(serializers.Serializer):
    event = serializers.PrimaryKeyRelatedField(queryset=Event.objects.all())
    email = serializers.EmailField()
    first_name = serializers.CharField(max_length=255)
    last_name = serializers.CharField(max_length=255)
    occupation = serializers.ChoiceField(choices=EventRegistration.OCCUPATION_CHOICES)
    gender = serializers.ChoiceField(choices=EventRegistration.GENDER_CHOICES)
    linkedin = serializers.URLField()
    github = serializers.URLField(required=False, allow_blank=True)
    twitter = serializers.URLField(required=False, allow_blank=True)
    other_links = serializers.URLField(required=False, allow_blank=True)
    rsvp = serializers.BooleanField(default=False)

    def create(self, validated_data):
        return EventRegistration.objects.create(**validated_data)
    