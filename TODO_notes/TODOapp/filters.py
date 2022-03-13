from django_filters import rest_framework as filters
from .models import Project, Notes


class ProjectFilter(filters.FilterSet):
   name = filters.CharFilter(lookup_expr='contains')
   
   class Meta:
       model = Project
       fields = ['name']


class NotesFilter(filters.FilterSet):
    start_time = filters.DateTimeFilter(field_name='created_at', lookup_expr='gte')
    end_time = filters.DateTimeFilter(field_name='created_at', lookup_expr='lte')

    class Meta:
        model = Notes
        fields = ['project']
