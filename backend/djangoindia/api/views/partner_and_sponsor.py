from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from djangoindia.api.serializers.partner_and_sponsor import (
    CommunityPartnerAndSponsorSerializer,
)
from djangoindia.api.views.base import BaseAPIView
from djangoindia.db.models.partner_and_sponsor import CommunityPartner, Sponsorship


class CommunityPartnerAndSponsorAPIView(BaseAPIView):
    """
    API endpoint to retrieve a list of community partners and sponsors.

    This endpoint is publicly accessible and returns both community partners and
    sponsors who are categorized under 'community_sponsorship'.
    """

    permission_classes = [
        AllowAny,
    ]
    serializer_class = CommunityPartnerAndSponsorSerializer

    def get_queryset(self):
        """
        Prepare the data containing community partners and sponsors.

        Returns:
            dict: A dictionary with:
                - 'community_partners': QuerySet of CommunityPartner objects.
                - 'community_sponsors': QuerySet of Sponsorship objects filtered by type.
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
        Retrieve community partners and sponsors.

        Returns:
            Response: Serialized data containing both partners and sponsors.
        """
        queryset = self.get_queryset()
        page = queryset
        serializer = CommunityPartnerAndSponsorSerializer(page)
        return self.get_paginated_response(serializer.data)
