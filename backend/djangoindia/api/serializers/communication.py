from rest_framework import serializers
from djangoindia.db.models.communication import NewsletterSubscription

class NewsletterSubscriptionSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=100)
    email = serializers.EmailField()

    def create(self, validated_data):
        return NewsletterSubscription.objects.create(**validated_data)