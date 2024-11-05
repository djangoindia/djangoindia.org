from rest_framework import serializers

from djangoindia.db.models.communication import ContactUs, Subscriber


class SubscriberSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=100)
    email = serializers.EmailField()

    def create(self, validated_data):
        return Subscriber.objects.create(**validated_data)


class ContactUsSerializer(serializers.Serializer):
    first_name = serializers.CharField(max_length=100)
    last_name = serializers.CharField(max_length=100)
    email = serializers.EmailField()
    message = serializers.CharField()

    def create(self, validated_data):
        return ContactUs.objects.create(**validated_data)
