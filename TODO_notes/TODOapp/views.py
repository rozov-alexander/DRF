from rest_framework.viewsets import ModelViewSet
from .serializers import ProjectModelSerializer, NotesModelSerializer
from .models import Project, Notes
from djangorestframework_camel_case.parser import CamelCaseJSONParser


class ProjectViewSet(ModelViewSet):
    serializer_class = ProjectModelSerializer
    queryset = Project.objects.all()
    parser_classes = CamelCaseJSONParser


class NotesViewSet(ModelViewSet):
    serializer_class = NotesModelSerializer
    queryset = Notes.objects.all()
    parser_classes = CamelCaseJSONParser

