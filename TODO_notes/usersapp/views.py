from rest_framework.viewsets import ModelViewSet
from .serializers import CustomUserModelSerializer
from .models import CustomUser


class CustomUserViewSet(ModelViewSet):
    serializer_class = CustomUserModelSerializer
    queryset = CustomUser.objects.all()
