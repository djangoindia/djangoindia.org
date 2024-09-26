from django.urls import path

from djangoindia.api.views.partner_and_sponsor import CommunityPartnerAndSponsorAPIView

urlpatterns = [
    path("sponsors-and-partners/", CommunityPartnerAndSponsorAPIView.as_view(), name="list_community_sponsors_and_partners"),
]