from django.urls import path

from djangoindia.api.views.community_partner import CommunityPartnerAPIView

urlpatterns = [
    path("community-partners/", CommunityPartnerAPIView.as_view(), name="list_community_partners"),
]