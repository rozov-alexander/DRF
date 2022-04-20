from rest_framework.serializers import ModelSerializer
from .models import CustomUser, Project, Notes
from usersapp.serializers import CustomUserModelSerializer


class ProjectModelSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'


class NotesModelSerializer(ModelSerializer):
    users = CustomUserModelSerializer(many=True)

    class Meta:
        model = Notes
        fields = '__all__'
