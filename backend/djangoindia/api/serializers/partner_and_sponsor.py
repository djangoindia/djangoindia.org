from rest_framework import serializers


class SponsorDetailsSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=255)
    type = serializers.CharField()
    logo = serializers.ImageField()
    url = serializers.URLField(allow_blank=True, allow_null=True)
    
class SponsorSerializer(serializers.Serializer):
    sponsor_details = SponsorDetailsSerializer()
    tier = serializers.CharField()

class CommunityPartnerSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=255)
    logo = serializers.ImageField()
    website = serializers.URLField(max_length=255, required=False, allow_blank=True)
    description = serializers.CharField()

class CommunityPartnerAndSponsorSerializer(serializers.Serializer):
    sponsors = SponsorSerializer(many=True, read_only=True)
    partners = CommunityPartnerSerializer(many=True, read_only=True)