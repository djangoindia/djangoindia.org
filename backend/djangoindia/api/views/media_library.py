from djangoindia.api.serializers.media_library import (
    FolderSerializer,
    FolderLiteSerializer
)
from rest_framework import status, viewsets
from rest_framework.response import Response

from cabinet.models import Folder
from django.core.exceptions import ValidationError

class MediaLibraryAPIView(viewsets.GenericViewSet):
    queryset = Folder.objects.filter(parent__isnull=True).prefetch_related('files', 'children__files')
    lookup_field="name"

    def get_serializer_class(self):
        if self.request.method == 'GET':
            if 'name' in self.kwargs:
                return FolderSerializer
            else:
                return FolderLiteSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        try:
            serializer = self.get_serializer(self.get_object())
            return Response(serializer.data)
        except ValidationError as e:
            return Response(
                {"message": str(e)}, status=status.HTTP_400_BAD_REQUEST
            )
        except Folder.DoesNotExist:
            return Response(
                {"message": "Folder not found"}, status=status.HTTP_404_NOT_FOUND
            )