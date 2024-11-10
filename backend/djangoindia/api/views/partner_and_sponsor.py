from rest_framework import generics
from rest_framework.mixins import ListModelMixin

from djangoindia.api.serializers.partner_and_sponsor import (
    CommunityPartnerAndSponsorSerializer,
)
from djangoindia.db.models.partner_and_sponsor import CommunityPartner, Sponsorship


class CommunityPartnerAndSponsorAPIView(generics.GenericAPIView, ListModelMixin):
    serializer_class = CommunityPartnerAndSponsorSerializer

    def get_queryset(self):
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
            'community_partners': partners_queryset,
            'community_sponsors': sponsors_queryset
        }
    
    def get(self, request):
        queryset=self.get_queryset()
        serializer=CommunityPartnerAndSponsorSerializer(queryset)
        return Response(serializer.data)
