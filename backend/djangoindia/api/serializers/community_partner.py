from rest_framework import serializers
from djangoindia.db.models.community_partner import CommunityPartner

class CommunityPartnerSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=255)
    website = serializers.URLField(max_length=255, required=False, allow_blank=True)
    contact_name = serializers.CharField(max_length=255)
    contact_email = serializers.EmailField()
    contact_number = serializers.CharField(max_length=15, required=False, allow_blank=True)
    description = serializers.CharField()