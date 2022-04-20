from django.core.management.base import BaseCommand
from usersapp.models import CustomUser


class Command(BaseCommand):
    def handle(self, *args, **options):
        # Создаём суперпользователя при помощи менеджера модели
        super_user = CustomUser.objects.create_superuser(
            "django", "django@todo_notes.local", "django"
        )
        CustomUser.objects.create_user(username='TestUser1', email='TestUser1@todo_notes.local', password='TestUser1')
        CustomUser.objects.create_user(username='TestUser2', email='TestUser2@todo_notes.local', password='TestUser2')
        CustomUser.objects.create_user(username='TestUser3', email='TestUser3@todo_notes.local', password='TestUser3')
