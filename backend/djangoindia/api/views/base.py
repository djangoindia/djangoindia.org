# Python imports
import zoneinfo

from django_filters.rest_framework import DjangoFilterBackend

# Third part imports
from rest_framework import status
from rest_framework.exceptions import APIException
from rest_framework.filters import SearchFilter
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet

from django.conf import settings

# Django imports
from django.utils import timezone


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


class PaginationMixin:
    @property
    def paginator(self):
        """
        The paginator instance associated with the view, or `None`.
        """
        if not hasattr(self, "_paginator"):
            if self.pagination_class is None:
                self._paginator = None
            else:
                self._paginator = self.pagination_class()
        return self._paginator

    def paginate_queryset(self, queryset):
        """
        Return a single page of results, or `None` if pagination
        is disabled.
        """
        if self.paginator is None:
            return queryset
        return self.paginator.paginate_queryset(queryset, self.request, view=self)

    def get_paginated_response(self, data):
        """
        Return a paginated style `Response` object for the given
        output data.
        """
        if self.paginator is None:
            return Response(data)
        return self.paginator.get_paginated_response(data)


class BaseViewSet(TimezoneMixin, ModelViewSet, PaginationMixin):
    model = None

    permission_classes = [
        IsAuthenticated,
    ]

    filter_backends = (
        DjangoFilterBackend,
        SearchFilter,
    )

    filterset_fields = []

    search_fields = []

    pagination_class = api_settings.DEFAULT_PAGINATION_CLASS

    def get_queryset(self):
        try:
            return self.queryset or self.model.objects.all()
        except Exception as e:
            raise APIException("Please check the view", status.HTTP_400_BAD_REQUEST)

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


class BaseAPIView(TimezoneMixin, APIView, PaginationMixin):
    permission_classes = [
        IsAuthenticated,
    ]

    filter_backends = (
        DjangoFilterBackend,
        SearchFilter,
    )

    filterset_fields = []

    search_fields = []

    pagination_class = api_settings.DEFAULT_PAGINATION_CLASS

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
