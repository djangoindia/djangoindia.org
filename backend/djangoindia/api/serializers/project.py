from rest_framework import serializers

from djangoindia.db.models.project import Project


class ProjectSubmissionSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField(max_length=255, required=True)
    description = serializers.CharField(required=True)
    company_email = serializers.EmailField(required=False, allow_null=True)
    github_link = serializers.URLField(required=True)
    website_link = serializers.URLField(required=False, allow_blank=True)
    tech_stack = serializers.CharField(required=False, allow_blank=True)
    keywords = serializers.CharField(required=False, allow_blank=True)
    status = serializers.ChoiceField(
        choices=["pending", "approved", "rejected"], read_only=True
    )
    submitted_by = serializers.HiddenField(default=serializers.CurrentUserDefault())
    created_at = serializers.DateTimeField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)

    def create(self, validated_data):
        """Create and return a new `Project` instance."""
        return Project.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """Update and return an existing `Project` instance."""
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance


class ProjectPublicSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    title = serializers.CharField()
    description = serializers.CharField()
    github_link = serializers.URLField(allow_null=True, required=False)
    website_link = serializers.URLField(allow_null=True, required=False)
    tech_stack = serializers.CharField(allow_blank=True, allow_null=True)
    keywords = serializers.CharField(allow_blank=True, allow_null=True)
    submitted_at = serializers.DateTimeField()
    submitted_by = serializers.SerializerMethodField()

    def get_submitted_by(self, obj):
        user = obj.submitted_by
        return {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
        }
