import graphene
from graphene_django import DjangoObjectType 
from .models import Project, Notes
from usersapp.models import CustomUser


class ProjectType(DjangoObjectType):
    class Meta: 
        model = Project
        fields = '__all__'


class NotesType(DjangoObjectType):
    class Meta: 
        model = Notes
        fields = '__all__'

    
class CustomUserType(DjangoObjectType):
    class Meta: 
        model = CustomUser
        fields = '__all__'


class Query(graphene.ObjectType):
    all_notes = graphene.List(NotesType)
    def resolve_all_notes(root, info):
        return Notes.objects.all() 

    all_project = graphene.List(ProjectType)
    def resolve_all_project(root, info):
        return Project.objects.all()

    project_by_id = graphene.Field(ProjectType, id=graphene.Int(required=True))
    def resolve_project_by_id(self, info, id): 
        try:
            return Project.objects.get(id=id) 
        except Project.DoesNotExist:
            return None

    project_by_username = graphene.List(ProjectType, username=graphene.String(required=False))
    def resolve_project_by_username(self, info, username=None): 
        project = Project.objects.all()
        if username:
            project = Project.objects.filter(users__username=username) 
        return project


class ProjectMutation(graphene.Mutation): 
    class Arguments:
        name = graphene.String(required=True) 
        id = graphene.ID()
    
    project = graphene.Field(ProjectType)
        
    @classmethod
    def mutate(cls, root, info, name, id):
        project = Project.objects.get(pk=id) 
        project.name = name 
        project.save()
        return ProjectMutation(project=project)

class Mutation(graphene.ObjectType): 
    update_project = ProjectMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)