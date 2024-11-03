from djangoindia.api.views.media_library import MediaLibraryAPIView

from django.urls import path


# URL conf
urlpatterns = [
    path(
        "media-library/", MediaLibraryAPIView.as_view({"get": "get"}), name="list_media"
    ),
    path(
        "media-library/<slug:name>/",
        MediaLibraryAPIView.as_view({"get": "retrieve"}),
        name="get_media",
    ),
]
