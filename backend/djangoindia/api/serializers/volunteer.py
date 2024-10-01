from rest_framework import serializers

class VolunteerSerializer(serializers.Serializer):
    photo = serializers.ImageField(required=False)
    name = serializers.CharField(max_length=255)
    about = serializers.CharField(max_length=50, required=False)
    email = serializers.EmailField(required=False)
    twitter = serializers.URLField(required=False)
    linkedin = serializers.URLField(required=False)