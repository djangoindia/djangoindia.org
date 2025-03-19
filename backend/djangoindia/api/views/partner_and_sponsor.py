from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from djangoindia.api.serializers.partner_and_sponsor import (
    CommunityPartnerAndSponsorSerializer,
)
from djangoindia.api.views.base import BaseAPIView
from djangoindia.db.models.partner_and_sponsor import CommunityPartner, Sponsorship


class CommunityPartnerAndSponsorAPIView(BaseAPIView):
    permission_classes = [
        AllowAny,
    ]
    serializer_class = CommunityPartnerAndSponsorSerializer

    def get_queryset(self):
        """
        Return a dictionary containing the community partners and sponsors

        Returns:
            A dictionary containing two keys, "community_partners" and
            "community_sponsors" which are the queryset of
            CommunityPartner and Sponsorship for the community partners and
            sponsors respectively.

        """
        partners_queryset = CommunityPartner.objects.all()
        sponsors_queryset = (
            Sponsorship.objects.filter(type="community_sponsorship")
            .select_related("sponsor_details")
            .only(
                "tier",
                "type",
                "sponsor_details__url",
                "sponsor_details__name",
                "sponsor_details__type",
                "sponsor_details__logo",
            )
        )

        return {
            "community_partners": partners_queryset,
            "community_sponsors": sponsors_queryset,
        }

    def get(self, request):
        """
        Return a list of community partners and sponsors.
        """
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset)
        return Response(serializer.data)
