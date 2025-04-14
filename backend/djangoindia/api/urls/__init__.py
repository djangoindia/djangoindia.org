from .authentication import urlpatterns as auth_urls
from .communication import urlpatterns as communication_urls
from .event import urlpatterns as event_urls
from .media_library import urlpatterns as media_library_urls
from .partner_and_sponsor import urlpatterns as community_partner_urls
from .project import urlpatterns as project_urls
from .user import urlpatterns as user_urls


urlpatterns = (
    event_urls
    + communication_urls
    + community_partner_urls
    + media_library_urls
    + user_urls
    + auth_urls
    + project_urls
)
