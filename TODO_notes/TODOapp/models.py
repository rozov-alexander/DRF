from django.db import models
from usersapp.models import CustomUser
from datetime import datetime

class Project(models.Model):
    name = models.CharField(max_length=64)
    repo = models.CharField(max_length=64, blank=True)
    users = models.ManyToManyField(CustomUser)

    def __str__(self):
        return self.name


class Notes(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    body = models.TextField()
    created_at = models.DateTimeField(default=datetime.now, blank=True)
    updated_at = models.DateTimeField(default=datetime.now, blank=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)
