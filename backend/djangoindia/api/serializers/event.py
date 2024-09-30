from rest_framework import serializers

from djangoindia.db.models.event import Event, EventRegistration
from djangoindia.db.models.partner_and_sponsor import CommunityPartner
from .partner_and_sponsor import SponsorSerializer
from .volunteer import VolunteerSerializer


class EventLiteSerializer(serializers.Serializer):
    id = serializers.UUIDField(read_only=True)
    slug = serializers.SlugField(read_only=True)
    name = serializers.CharField(max_length=100)
    cover_image = serializers.ImageField()
    city= serializers.CharField()
    start_date= serializers.DateTimeField()
    event_mode = serializers.CharField()
    seats_left = serializers.IntegerField()

class EventSerializer(EventLiteSerializer):
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
    partners = serializers.SerializerMethodField()
    volunteers = VolunteerSerializer(many=True, read_only=True, source='event_volunteers')

    def get_partners(self, obj):
        return CommunityPartner.objects.values("name","logo","website","description")

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
