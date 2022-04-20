from rest_framework.viewsets import ModelViewSet, GenericViewSet
from .serializers import ProjectModelSerializer, NotesModelSerializer
from .models import Project, Notes
from .filters import ProjectFilter, NotesFilter
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin, CreateModelMixin, DestroyModelMixin


class ProjectLimitOffsetPagination(LimitOffsetPagination):
   default_limit = 10

class ProjectViewSet(ListModelMixin, RetrieveModelMixin, UpdateModelMixin, CreateModelMixin, DestroyModelMixin, GenericViewSet):
    serializer_class = ProjectModelSerializer
    queryset = Project.objects.get_queryset().order_by('id')
    filterset_class = ProjectFilter
    # pagination_class = ProjectLimitOffsetPagination


class NotesLimitOffsetPagination(LimitOffsetPagination):
   default_limit = 20



class NotesViewSet(ListModelMixin, RetrieveModelMixin, UpdateModelMixin, CreateModelMixin, DestroyModelMixin, GenericViewSet):
    serializer_class = NotesModelSerializer
    queryset = Notes.objects.get_queryset().order_by('id')
    filterset_class = NotesFilter
    # pagination_class = NotesLimitOffsetPagination


    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()
        

