from rest_framework.viewsets import ModelViewSet, GenericViewSet
from .serializers import CustomUserModelSerializer
from .models import CustomUser
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin


class CustomUserViewSet(ListModelMixin, RetrieveModelMixin, UpdateModelMixin, GenericViewSet):
    serializer_class = CustomUserModelSerializer
    queryset = CustomUser.objects.get_queryset().order_by('id')
