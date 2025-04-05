from django.urls import path

from djangoindia.api.views.media_library import MediaLibraryViewSet


# URL conf
urlpatterns = [
    path(
        "media-library/", MediaLibraryViewSet.as_view({"get": "get"}), name="list_media"
    ),
    path(
        "media-library/<slug:name>/",
        MediaLibraryViewSet.as_view({"get": "retrieve"}),
        name="get_media",
    ),
]
