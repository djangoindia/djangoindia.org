from rest_framework import serializers
from cabinet.models import Folder, File

class FileSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = File
        fields = "__all__"

class FolderLiteSerializer(serializers.ModelSerializer):
    children = serializers.SerializerMethodField()

    class Meta:
        model = Folder
        fields = ['id', 'name', 'children']
    
    def get_children(self, obj):
        return FolderLiteSerializer(obj.children.all(), many=True, context=self.context).data

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if not representation['children']:
            representation.pop('children')
        return representation

class FolderSerializer(FolderLiteSerializer):
    files = FileSerializer(many=True, read_only=True)

    class Meta(FolderLiteSerializer.Meta):
        fields = ['id', 'name', 'files', 'children']
    
    def get_children(self, obj):
        return FolderSerializer(obj.children.all(), many=True, context=self.context).data
