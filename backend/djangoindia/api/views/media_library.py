from cabinet.models import Folder
from rest_framework import status, viewsets
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from django.core.exceptions import ValidationError
from django.http import Http404

from djangoindia.api.serializers.media_library import (
    FolderLiteSerializer,
    FolderSerializer,
)
from djangoindia.db.models import Event


class MediaLibraryAPIView(viewsets.GenericViewSet):
    queryset = Folder.objects.filter(parent__isnull=True).prefetch_related(
        "files", "children__files"
    )
    lookup_field = "name"
    permission_classes = [
        AllowAny,
    ]

    def get_serializer_class(self):
        if self.request.method == "GET":
            if "name" in self.kwargs:
                return FolderSerializer
            else:
                return FolderLiteSerializer

    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())
        lookup_value = self.kwargs.get(self.lookup_field)

        if lookup_value:
            try:
                # Try to get the event by slug
                event = Event.objects.filter(slug=lookup_value).values("name").first()

                if event:
                    # If event exists, try to get the corresponding object
                    return queryset.get(name=event.get("name", ""))

                # If no event found with the given slug
                raise Event.DoesNotExist("No event found with this slug")

            except (Event.DoesNotExist, Folder.DoesNotExist):
                # Handle cases where either Event or Folder is not found
                raise Http404("No matching event or folder found")

        raise ValidationError("No identifier provided")

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
            return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Folder.DoesNotExist:
            return Response(
                {"message": "Folder not found"}, status=status.HTTP_404_NOT_FOUND
            )
