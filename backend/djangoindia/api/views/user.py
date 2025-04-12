# Module imports
from rest_framework import serializers, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from djangoindia.api.serializers import UserMeSerializer, UserSerializer
from djangoindia.db.models import User

from .base import BaseAPIView, BaseViewSet


class UserEndpointViewSet(BaseViewSet):
    """
    API ViewSet to handle authenticated user's profile retrieval and update.

    Supported actions:
        - GET: Retrieve current user's profile data.
        - PATCH (partial_update): Update user details partially.
    """

    serializer_class = UserSerializer
    model = User
    permission_classes = [IsAuthenticated]

    def get_object(self):
        """
        Return the currently authenticated user instance.
        """
        return self.request.user

    def retrieve(self, request):
        """
        Retrieve the authenticated user's profile.

        Returns:
            Response: Serialized user profile data.
        """
        user = self.get_object()
        serialized_data = self.serializer_class(user).data
        return Response(serialized_data, status=status.HTTP_200_OK)

    def partial_update(self, request, *args, **kwargs):
        """
        Partially update the authenticated user's profile.

        Args:
            request (Request): The HTTP request with partial update data.

        Returns:
            Response: Updated user data or error message.
        """
        user = self.get_object()
        serializer = self.get_serializer(user, data=request.data, partial=True)

        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
            serializer_data = self.serializer_class(user).data
            return Response(serializer_data, status=status.HTTP_200_OK)
        except serializers.ValidationError as e:
            return Response(
                {"message": e.detail},
                status=status.HTTP_400_BAD_REQUEST,
            )
        except Exception as e:
            return Response(
                {"message": "Something went wrong: " + str(e)},
                status=status.HTTP_400_BAD_REQUEST,
            )

    def deactivate(self, request):
        """
        Placeholder for deactivating user account.

        TODO: Implement deactivation logic.
        """
        pass


class UpdateUserOnBoardedAPIView(BaseAPIView):
    """
    API endpoint to update a user's onboarding status.

    This sets the `is_onboarded` flag for the authenticated user.
    """

    permission_classes = [IsAuthenticated]

    def patch(self, request):
        """
        Partially update the user's onboarding status.

        Request body:
            {
                "is_onboarded": true | false
            }

        Returns:
            Response: Success message.
        """
        user = User.objects.get(pk=request.user.id, is_active=True)
        user.is_onboarded = request.data.get("is_onboarded", False)
        user.save()
        return Response({"message": "Updated successfully"}, status=status.HTTP_200_OK)
