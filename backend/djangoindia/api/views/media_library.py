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


# Define logger at the module level
logger = logging.getLogger(__name__)


class MediaLibraryAPIView(BaseViewSet):
    queryset = Folder.objects.filter(parent__isnull=True).prefetch_related(
        "files", "children__files"
    )
    lookup_field = "name"
    permission_classes = [AllowAny]

    def get_serializer_class(self):
        if self.request.method == "GET":
            return FolderSerializer if "name" in self.kwargs else FolderLiteSerializer
        return FolderLiteSerializer

    def get_object(self):
        queryset = self.filter_queryset(self.get_queryset())
        lookup_value = self.kwargs.get(self.lookup_field)

        logger.info(f"Looking up event for slug: {lookup_value}")

        if lookup_value:
            event = Event.objects.filter(slug=lookup_value).values("name").first()
            logger.info(f"Event lookup result: {event}")

            if event:
                try:
                    obj = queryset.get(name=event["name"])
                    logger.info(f"Folder found: {obj}")
                    return obj
                except Folder.DoesNotExist:
                    logger.warning("No matching folder found")
                    raise Http404("No matching folder found")

            logger.warning("No event found with this slug")
            raise Http404("No event found with this slug")

        logger.error("No identifier provided")
        raise ValidationError("No identifier provided")

    def get(self, request, *args, **kwargs):
        logger.info("Hello I'm here")
        return self.list(request, *args, **kwargs)

    def list(self, request, *args, **kwargs):
        logger.info("Hello I'm in list")
        queryset = self.filter_queryset(self.get_queryset())
        logger.info(f"{queryset}")
        serializer_class = self.get_serializer_class()
        logger.info(f"{serializer_class}")
        serializer = serializer_class(queryset, many=True)
        logger.info(f"{serializer.data}")
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
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
