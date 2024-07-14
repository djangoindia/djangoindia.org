from .event import urlpatterns as event_urls
from .communication import urlpatterns as communication_urls

urlpatterns = event_urls + communication_urls
