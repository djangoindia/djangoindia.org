from rest_framework import serializers

from djangoindia.db.models.event import Event, EventRegistration,Sponsor



class SponsorDataSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=255)
    contact = serializers.CharField(max_length=100)
    sponsor_type = serializers.CharField()
    logo = serializers.ImageField()
    url = serializers.URLField(allow_blank=True, allow_null=True)
    
class SponsorSerializer(serializers.Serializer):
    sponsor_data = SponsorDataSerializer()
    sponsorship_tier = serializers.CharField()
    sponsorship_type = serializers.CharField()


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
    sponsors = SponsorSerializer(many=True, read_only=True)

    def to_representation(self, instance):
        """Override to_representation to include the related sponsors, including community sponsors."""
        representation = super().to_representation(instance)
        event_sponsors = instance.sponsors.all()
        community_sponsors = Sponsor.objects.filter(event__isnull=True)
        event_sponsors_data = SponsorSerializer(event_sponsors, many=True).data
        community_sponsors_data = SponsorSerializer(community_sponsors, many=True).data
        representation['sponsors'] = {
            'event_sponsors': event_sponsors_data,
            'community_sponsors': community_sponsors_data,
        }
        return representation


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
