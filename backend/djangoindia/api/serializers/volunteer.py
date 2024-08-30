from djangoindia.db.models.volunteers import EventVolunteers
from rest_framework import serializers

class EventVolunteerSerializer(serializers.Serializer):
    full_name = serializers.CharField(max_length=100)
    email = serializers.EmailField()
    profile_pic = serializers.ImageField()
    linkedin_url = serializers.URLField()
    twitter_url = serializers.URLField()
    bio = serializers.CharField()
    
    def create(self, validated_data):
        return EventVolunteers.objects.create(**validated_data)