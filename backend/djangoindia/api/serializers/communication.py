from rest_framework import serializers

from djangoindia.db.models.communication import ContactUs, Subscriber


class SubscriberSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=100)
    email = serializers.EmailField()

    def create(self, validated_data):
        """
        Create and return a new Subscriber instance.

        Args:
            validated_data (dict): Validated data containing 'name' and 'email'.

        Returns:
            Subscriber: The created Subscriber instance.
        """
        return Subscriber.objects.create(**validated_data)


class ContactUsSerializer(serializers.Serializer):
    first_name = serializers.CharField(max_length=100)
    last_name = serializers.CharField(max_length=100)
    email = serializers.EmailField()
    message = serializers.CharField()

    def create(self, validated_data):
        """
        Create and return a new ContactUs message instance.

        Args:
            validated_data (dict): Validated data containing contact form fields.

        Returns:
            ContactUs: The created ContactUs instance.
        """
        return ContactUs.objects.create(**validated_data)
