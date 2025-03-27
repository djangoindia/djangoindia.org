# Python imports
import logging
import zoneinfo

# Django imports
from django_filters.rest_framework import DjangoFilterBackend

# Third part imports
from rest_framework import status
from rest_framework.exceptions import APIException
from rest_framework.filters import SearchFilter
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet

from django.conf import settings
from django.utils import timezone


logger = logging.getLogger(__name__)


class TimezoneMixin:
    """
    This enables timezone conversion according
    to the user set timezone
    """

    def initial(self, request, *args, **kwargs):
        super().initial(request, *args, **kwargs)
        if request.user.is_authenticated:
            timezone.activate(zoneinfo.ZoneInfo(request.user.user_timezone))
        else:
            timezone.deactivate()


class BaseViewSet(TimezoneMixin, ModelViewSet):
    model = None

    permission_classes = [IsAuthenticated]

    filter_backends = (DjangoFilterBackend, SearchFilter)

    filterset_fields = []

    search_fields = []

    def get_queryset(self):
        try:
            logger.info("retriving queryset")
            logger.info(f"queryset{self.get_queryset}")
            logger.info(f"obj {self.model.object.all()}")
            return self.queryset or self.model.objects.all()
        except Exception as e:
            raise APIException("Please check the view", status.HTTP_400_BAD_REQUEST)

    def filter_queryset(self, queryset):
        for backend in list(self.filter_backends):
            queryset = backend().filter_queryset(self.request, queryset, self)
        return queryset

    def dispatch(self, request, *args, **kwargs):
        try:
            response = super().dispatch(request, *args, **kwargs)
            if settings.DEBUG:
                from django.db import connection

                print(
                    f"{request.method} - {request.get_full_path()} of Queries: {len(connection.queries)}"
                )
            return response
        except Exception as exc:
            response = self.handle_exception(exc)
            return exc


class BaseAPIView(TimezoneMixin, APIView):
    permission_classes = [IsAuthenticated]

    filter_backends = (DjangoFilterBackend, SearchFilter)

    filterset_fields = []

    search_fields = []

    def filter_queryset(self, queryset):
        for backend in list(self.filter_backends):
            queryset = backend().filter_queryset(self.request, queryset, self)
        return queryset

    def dispatch(self, request, *args, **kwargs):
        try:
            response = super().dispatch(request, *args, **kwargs)
            if settings.DEBUG:
                from django.db import connection

                print(
                    f"{request.method} - {request.get_full_path()} of Queries: {len(connection.queries)}"
                )
            return response
        except Exception as exc:
            response = self.handle_exception(exc)
            return exc
