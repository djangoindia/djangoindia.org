# Module imports
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from djangoindia.api.serializers import UserMeSerializer, UserSerializer
from djangoindia.db.models import User

from .base import BaseAPIView, BaseViewSet


class UserEndpoint(BaseViewSet):
    serializer_class = UserSerializer
    model = User
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

    def retrieve(self, request):
        serialized_data = UserMeSerializer(request.user).data
        return Response(
            serialized_data,
            status=status.HTTP_200_OK,
        )

    def deactivate(self, request):
        pass


class UpdateUserOnBoardedEndpoint(BaseAPIView):
    def patch(self, request):
        user = User.objects.get(pk=request.user.id, is_active=True)
        user.is_onboarded = request.data.get("is_onboarded", False)
        user.save()
        return Response({"message": "Updated successfully"}, status=status.HTTP_200_OK)
