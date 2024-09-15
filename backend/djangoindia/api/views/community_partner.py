from rest_framework import generics, status
from rest_framework.mixins import CreateModelMixin, ListModelMixin
from rest_framework.response import Response
from djangoindia.db.models.community_partner import CommunityPartner
from djangoindia.api.serializers.community_partner import CommunityPartnerSerializer

class CommunityPartnerAPIView(generics.GenericAPIView, CreateModelMixin, ListModelMixin):
    queryset = CommunityPartner.objects.all()
    serializer_class = CommunityPartnerSerializer

    def get(self, request, *args, **kwargs):
        """
        List all community partners.

        Returns:
            Response: A list of community partners, each represented as a
                `CommunityPartnerSerializer` object.
        """
        return self.list(request, *args, **kwargs)