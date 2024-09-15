from rest_framework import serializers
from djangoindia.db.models.community_partner import CommunityPartner

class CommunityPartnerSerializer(serializers.Serializer):
    organization_name = serializers.CharField(max_length=255)
    organization_website = serializers.URLField(max_length=255, allow_blank=True, allow_null=True)
    organization_email = serializers.EmailField()
    contact_person_name = serializers.CharField(max_length=255)
    contact_person_email = serializers.EmailField()
    contact_person_phone_number = serializers.CharField(max_length=255, allow_blank=True, allow_null=True)
    description = serializers.CharField()
