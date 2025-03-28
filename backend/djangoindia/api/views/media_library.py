import logging

from cabinet.models import Folder
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from django.core.exceptions import ValidationError
from django.http import Http404

from djangoindia.api.serializers.media_library import (
    FolderLiteSerializer,
    FolderSerializer,
)
from djangoindia.api.views.base import BaseViewSet
from djangoindia.db.models import Event


class MediaLibraryAPIView(BaseViewSet):
    """
    API view for managing media library folders.

    This view allows retrieving folders from the media library, supporting both
    listing all root-level folders and retrieving a specific folder by its name.

    """

    queryset = Folder.objects.filter(parent__isnull=True).prefetch_related(
        "files", "children__files"
    )
    lookup_field = "name"
    permission_classes = [AllowAny]

    def get_serializer_class(self):
        """
        Returns the appropriate serializer class based on the request method.

        - Uses `FolderSerializer` if retrieving a specific folder.
        - Uses `FolderLiteSerializer` for listing folders.

        Returns:
            Serializer class (FolderSerializer or FolderLiteSerializer).
        """
        if self.request.method == "GET":
            if "name" in self.kwargs:
                return FolderSerializer
            else:
                return FolderLiteSerializer

    def get_object(self):
        """
        Retrieves a folder object based on the provided lookup value.

        The method first checks if the provided lookup value corresponds to an event's
        name via the `Event` model. If an event is found, it retrieves the matching
        folder from the queryset.

        Raises:
            Http404: If no matching event or folder is found.
            ValidationError: If no lookup value is provided.

        Returns:
            Folder: The retrieved folder object.
        """
        queryset = self.filter_queryset(self.get_queryset())
        lookup_value = self.kwargs.get(self.lookup_field)

        if lookup_value:
            event = Event.objects.filter(slug=lookup_value).values("name").first()

            if event:
                try:
                    obj = queryset.get(name=event["name"])
                    return obj
                except Folder.DoesNotExist:
                    raise Http404("No matching folder found")

            raise Http404("No event found with this slug")

        raise ValidationError("No identifier provided")

    def get(self, request, *args, **kwargs):
        """
        Handles GET requests for listing or retrieving folders.

        If no folder name is specified, it returns a list of all root-level folders.
        If a folder name is provided, it retrieves and returns the specific folder.

        Returns:
            Response: Serialized folder data.
        """
        return self.list(request, *args, **kwargs)

    def list(self, request, *args, **kwargs):
        """
        Lists all root-level folders in the media library.

        Returns:
            Response: JSON response containing a list of serialized folder data.
        """
        queryset = self.get_queryset()
        queryset = self.filter_queryset(queryset=queryset)
        serializer_class = self.get_serializer_class()
        serializer = serializer_class(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        """
        Retrieves a specific folder by its name.

        Returns:
            Response: JSON response containing serialized folder data.

        Handles:
            - `ValidationError`: Returns a 400 response if no valid identifier is provided.
            - `Folder.DoesNotExist`: Returns a 404 response if the folder is not found.
        """
        try:
            obj = self.get_object()
            serializer_class = self.get_serializer_class()
            serializer = serializer_class(obj)
            return Response(serializer.data)
        except ValidationError as e:
            return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Folder.DoesNotExist:
            return Response(
                {"message": "Folder not found"}, status=status.HTTP_404_NOT_FOUND
            )
