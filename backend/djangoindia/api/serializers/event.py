from rest_framework import serializers

from djangoindia.db.models.event import Event, EventRegistration



class SponsorDetailsSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=255)
    type = serializers.CharField()
    logo = serializers.ImageField()
    url = serializers.URLField(allow_blank=True, allow_null=True)
    
class SponsorSerializer(serializers.Serializer):
    sponsor_details = SponsorDetailsSerializer()
    tier = serializers.CharField()
    type = serializers.CharField()


class EventSerializer(serializers.Serializer):
    id = serializers.UUIDField(read_only=True)
    slug = serializers.SlugField(read_only=True)
    name = serializers.CharField(max_length=100)
    description = serializers.CharField()
    cover_image = serializers.ImageField()
    venue= serializers.CharField()
    city= serializers.CharField()
    venue_map_link= serializers.URLField()
    start_date= serializers.DateTimeField()
    end_date= serializers.DateTimeField()
    registration_end_date= serializers.DateTimeField()
    event_mode = serializers.CharField()
    max_seats = serializers.IntegerField()
    seats_left = serializers.IntegerField()
    sponsors = SponsorSerializer(many=True, read_only=True, source='event_sponsors')


class EventRegistrationSerializer(serializers.Serializer):
    event = serializers.PrimaryKeyRelatedField(queryset=Event.objects.all())
    email = serializers.EmailField()
    first_name = serializers.CharField(max_length=255)
    last_name = serializers.CharField(max_length=255)
    professional_status = serializers.ChoiceField(choices=EventRegistration.ProfessionalStatus)
    gender = serializers.ChoiceField(choices=EventRegistration.Gender)
    organization = serializers.CharField(max_length=100,required=False, allow_blank=True)
    description = serializers.CharField(required=False, allow_blank=True)
    linkedin = serializers.URLField()
    github = serializers.URLField(required=False, allow_blank=True)
    twitter = serializers.URLField(required=False, allow_blank=True)
    other_links = serializers.URLField(required=False, allow_blank=True)
    rsvp = serializers.BooleanField(default=False)

    def create(self, validated_data):
        return EventRegistration.objects.create(**validated_data)
