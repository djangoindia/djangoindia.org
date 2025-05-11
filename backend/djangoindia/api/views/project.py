import requests

from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from django.db.models import Q

from djangoindia.api.serializers.project import (
    ProjectPublicSerializer,
    ProjectSubmissionSerializer,
)
from djangoindia.api.views.base import BaseAPIView
from djangoindia.db.models.project import Project


class ProjectSubmissionAPIView(BaseAPIView):
    """
    API view for submitting new projects.

    This view handles the submission of new Django projects, including:
    - Validating project details
    - Verifying GitHub repository
    - Checking for Django project structure
    - Creating project record

    Authentication is required to submit projects.
    """

    permission_classes = [IsAuthenticated]
    serializer_class = ProjectSubmissionSerializer

    def get_repo_tree(self, owner, repo, branch="main"):
        """
        Fetches the complete file tree of a GitHub repository.

        Args:
            owner (str): GitHub repository owner
            repo (str): GitHub repository name
            branch (str): Branch to check (default: main)

        Returns:
            list: List of file paths in the repository, or None if fetch fails
        """
        url = f"https://api.github.com/repos/{owner}/{repo}/git/trees/{branch}?recursive=1"
        try:
            response = requests.get(url, timeout=5)
            if response.status_code == 200:
                return [
                    item["path"]
                    for item in response.json().get("tree", [])
                    if item["type"] == "blob"
                ]
            return None
        except Exception as e:
            print(f"Error fetching repo tree: {e}")
            return None

    def post(self, request, *args, **kwargs):
        """
        Handle project submission.

        Args:
            request: HTTP request object containing project details

        Returns:
            Response: Success response with project details or error response
        """
        serializer = self.serializer_class(
            data=request.data, context={"request": request}
        )

        if not serializer.is_valid():
            return Response(serializer.errors, status=400)

        github_link = serializer.validated_data.get("github_link")

        # Extract owner and repo
        try:
            parts = github_link.split("/")
            owner, repo = parts[-2], parts[-1]
        except Exception as e:
            return Response(
                {"error": "Invalid GitHub repository URL format."}, status=400
            )

        # Check if project with same GitHub link already exists
        if Project.objects.filter(github_link=github_link).exists():
            return Response(
                {"error": "A project with this GitHub repository already exists."},
                status=400,
            )

        # Fetch repo tree and check for manage.py
        repo_files = self.get_repo_tree(owner, repo)
        if not repo_files:
            return Response(
                {
                    "error": "Could not retrieve repository structure or repository does not exist."
                },
                status=400,
            )

        if not any(path.endswith("manage.py") for path in repo_files):
            return Response(
                {
                    "error": "'manage.py' not found. This does not appear to be a Django project."
                },
                status=400,
            )

        project = serializer.save(submitted_by=request.user, status="pending")

        return Response(
            {
                "message": "Project submitted successfully",
                "project": self.serializer_class(project).data,
            },
            status=201,
        )


class ProjectListAPIView(BaseAPIView):
    """
    API view for listing approved projects.

    This view provides a list of all approved projects with optional filtering:
    - Search by title, description, tech stack, or keywords
    - Filter by tech stack

    No authentication is required to view projects.
    """

    permission_classes = [AllowAny]
    serializer_class = ProjectPublicSerializer

    def get_queryset(self, request):
        """
        Get filtered queryset of approved projects.

        Args:
            request: HTTP request object containing query parameters

        Returns:
            QuerySet: Filtered queryset of approved projects
        """
        search_query = request.query_params.get("q", "").strip()
        tech_stack = request.query_params.get("tech_stack", "").strip()
        queryset = Project.objects.filter(status="approved")

        if search_query:
            queryset = queryset.filter(
                Q(title__icontains=search_query)
                | Q(description__icontains=search_query)
                | Q(tech_stack__icontains=search_query)
                | Q(keywords__icontains=search_query)
            )

        if tech_stack:
            queryset = queryset.filter(tech_stack__icontains=tech_stack)

        return queryset.order_by("-created_at")

    def get(self, request, *args, **kwargs):
        """
        Handle GET request for project listing.

        Args:
            request: HTTP request object

        Returns:
            Response: List of projects matching the filters
        """
        projects = self.get_queryset(request)
        serializer = self.serializer_class(projects, many=True)
        return Response(serializer.data)
