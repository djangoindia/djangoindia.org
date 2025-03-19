from rest_framework import serializers

from djangoindia.db.models.communication import ContactUs, Subscriber


class SubscriberSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=100)
    email = serializers.EmailField()

    def create(self, validated_data):
        """
        Create a new Subscriber object from validated data.

        Args:
            validated_data (dict): A dictionary of validated data.

        Returns:
            Subscriber: A new Subscriber object created from validated data.
        """
        return Subscriber.objects.create(**validated_data)


class ContactUsSerializer(serializers.Serializer):
    first_name = serializers.CharField(max_length=100)
    last_name = serializers.CharField(max_length=100)
    email = serializers.EmailField()
    message = serializers.CharField()

    def create(self, validated_data):
        """
        Create a new ContactUs object from validated data.

        Args:
            validated_data (dict): A dictionary of validated data.

        Returns:
            ContactUs: A new ContactUs object created from validated data.
        """
        return ContactUs.objects.create(**validated_data)
