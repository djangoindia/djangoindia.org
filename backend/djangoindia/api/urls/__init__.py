from .event import urlpatterns as event_urls
from .newsletter import urlpatterns as newsletter_urls

urlpatterns = event_urls + newsletter_urls
