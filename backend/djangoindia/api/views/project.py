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


class ProjectSubmissionEndPoint(BaseAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ProjectSubmissionSerializer

    def get_repo_tree(self, owner, repo, branch="main"):
        """
        Fetches the complete file tree of a GitHub repository.
        """
        url = f"https://api.github.com/repos/{owner}/{repo}/git/trees/{branch}?recursive=1"
        try:
            print(f"Fetching repository tree from: {url}")
            response = requests.get(url, timeout=5)
            if response.status_code == 200:
                return [
                    item["path"]
                    for item in response.json().get("tree", [])
                    if item["type"] == "blob"
                ]
            print(f"GitHub API error (tree): {response.status_code} - {response.text}")
            return None
        except Exception as e:
            print(f"Error fetching repo tree: {e}")
            return None

    def post(self, request, *args, **kwargs):
        print("Received project submission request.")

        serializer = self.serializer_class(
            data=request.data, context={"request": request}
        )
        if not serializer.is_valid():
            print(f"Validation errors: {serializer.errors}")
            return Response(serializer.errors, status=400)

        github_link = serializer.validated_data.get("github_link", "").rstrip("/")
        print(f"Validated GitHub link: {github_link}")

        # Extract owner and repo
        try:
            parts = github_link.split("/")
            owner, repo = parts[-2], parts[-1]
            print(f"Extracted owner: {owner}, repo: {repo}")
        except Exception as e:
            print(f"Invalid GitHub link format: {e}")
            return Response({"error": "Invalid GitHub repository URL."}, status=400)

        # Fetch repo tree and check for manage.py
        repo_files = self.get_repo_tree(owner, repo)
        if not repo_files:
            return Response(
                {"error": "Could not retrieve repository structure."}, status=400
            )

        if not any(path.endswith("manage.py") for path in repo_files):
            return Response(
                {
                    "error": "'manage.py' not found. This does not appear to be a Django project."
                },
                status=400,
            )

        print("manage.py found. Proceeding with project submission.")

        project = serializer.save(submitted_by=request.user, status="pending")

        print(f"Project submission successful. Project ID: {project.id}")
        return Response(
            {
                "message": "Project submitted successfully",
                "project": self.serializer_class(project).data,
            },
            status=201,
        )


class PublicProjectListView(BaseAPIView):
    permission_classes = [AllowAny]
    serializer_class = ProjectPublicSerializer

    def get_queryset(self, request):
        search_query = request.query_params.get("q", "").strip()
        queryset = Project.objects.filter(status="approved")

        if search_query:
            queryset = queryset.filter(
                Q(title__icontains=search_query)
                | Q(description__icontains=search_query)
                | Q(tech_stack__icontains=search_query)
                | Q(keywords__icontains=search_query)
            )
        return queryset

    def get(self, request, *args, **kwargs):
        projects = self.get_queryset(request)
        print(f"Projects found: {projects.count()}")
        serializer = self.serializer_class(projects, many=True)
        return Response(serializer.data)
