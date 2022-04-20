import json
from mixer.backend.django import mixer
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
# from mixer.backend.django import mixer
from TODOapp.views import ProjectViewSet, NotesViewSet
from TODOapp.models import Project, Notes
from usersapp.views import CustomUserViewSet
from usersapp.models import CustomUser

class TestProjectViewSet(TestCase):
    # test №1
    def test_get_project_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/project/')
        view = ProjectViewSet.as_view({'get': 'list'})
        response = view(request) 
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestNotesViewSet(TestCase):
    # test №2
    def test_get_notes_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/notes/')
        view = NotesViewSet.as_view({'get': 'list'})
        response = view(request) 
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestCustomUserViewSet(TestCase):
    # test №3
    def test_get_user_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/customuser/')
        view = CustomUserViewSet.as_view({'get': 'list'})
        response = view(request) 
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # test №4
    def test_update_user(self):
        factory = APIRequestFactory()
        request = factory.post('/api/customuser/', {'username': 'ttt_testuser_ttt', 'password': 'qwerty'}, format='json')
        view = CustomUserViewSet.as_view({'post': 'update'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    # test №5
    def test_create_project(self):
        factory = APIRequestFactory()
        request = factory.post('/api/project/', {'name': 'ttt_testproject_ttt', 'users': [1,]}, format='json')
        admin = CustomUser.objects.create_superuser('admin@admin.com', 'admin', '123456')
        force_authenticate(request, admin)
        view = ProjectViewSet.as_view({'post': 'create'})
        response = view(request) 
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    # test №6
    def test_get_detail_user(self):
        user = CustomUser.objects.create(email='admin@admin.com', username='admin', password='123456', is_superuser=True, is_active=True)
        client = APIClient()
        response = client.get(f'/api/CustomUser/{user.id}/') 
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # test №7  
    def test_get_detail_project(self):
        user = CustomUser.objects.create(email='admin@admin.com', username='admin', password='123456', is_superuser=True, is_active=True)
        project = Project.objects.create(name='TTTT_test_TTTT')
        client = APIClient()
        response = client.get(f'/api/Project/{project.id}/') 
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # test №8
    def test_edit_user_guest(self):
        user = CustomUser.objects.create(email='admin@admin.com', username='admin', password='123456', is_superuser=True, is_active=True)
        client = APIClient()
        response = client.put(f'/api/CustomUser/{user.id}/', {'username':'user1', 'password':'654321'}) 
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    # test №9
    def test_edit_admin(self): 
        user = CustomUser.objects.create_superuser(email='admin3@admin.com', username='admin3', password='123456', first_name='ttt', last_name='ddd')
        project = Project.objects.create(name='TTTT_test_TTTT')
        client = APIClient()
        client.login(username='admin3', password='123456')
        response = client.put(f'/api/Project/{project.id}/', {'name':'Changes', 'users': ['1']})
        self.assertEqual(response.status_code, status.HTTP_200_OK) 
        project = Project.objects.get(id=project.id) 
        self.assertEqual(project.name, 'Changes') 
        client.logout()

    # test №10
class TestBookViewSet(APITestCase):
    def test_get_list(self):
        response = self.client.get('/api/Project/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # test №11
    def test_edit_admin(self):
        project = Project.objects.create(name='TTTT_test_TTTT')
        user = CustomUser.objects.create_superuser(email='admin3@admin.com', username='admin', password='123456', first_name='ttt', last_name='ddd')
        self.client.login(username='admin', password='123456')
        response = self.client.put(f'/api/Project/{project.id}/', {'name':'Changes', 'users': ['1']})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        project = Project.objects.get(id=project.id)
        self.assertEqual(project.name,'Changes')

    # test №12
    def test_edit_mixer(self):
        project = mixer.blend(Project)
        user = CustomUser.objects.create_superuser(email='admin3@admin.com', username='admin', password='123456', first_name='ttt', last_name='ddd')
        self.client.login(username='admin', password='123456')
        response = self.client.put(f'/api/Project/{project.id}/', {'name':'Changes', 'users': ['1']})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        project = Project.objects.get(id=project.id)
        self.assertEqual(project.name,'Changes')