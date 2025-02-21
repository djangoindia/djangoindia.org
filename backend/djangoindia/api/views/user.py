# Module imports
from rest_framework import serializers, status
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

    def partial_update(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = self.get_serializer(user, data=request.data, partial=True)

        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()

            return Response(UserMeSerializer(user).data, status=status.HTTP_200_OK)
        except serializers.ValidationError as e:
            return Response(
                {
                    "message": e.detail,
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        except Exception as e:
            return Response(
                {
                    "message": "Something went wrong",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

    def deactivate(self, request):
        pass


class UpdateUserOnBoardedEndpoint(BaseAPIView):
    def patch(self, request):
        user = User.objects.get(pk=request.user.id, is_active=True)
        user.is_onboarded = request.data.get("is_onboarded", False)
        user.save()
        return Response({"message": "Updated successfully"}, status=status.HTTP_200_OK)
