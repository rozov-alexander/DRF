from rest_framework.viewsets import ModelViewSet, GenericViewSet
from .serializers import CustomUserModelSerializer, CustomUserModelSerializerV2
from .models import CustomUser
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin


class CustomUserViewSet(ListModelMixin, RetrieveModelMixin, UpdateModelMixin, GenericViewSet):
    queryset = CustomUser.objects.get_queryset().order_by('id')
    def get_serializer_class(self):
        if self.request.version == '2.0':
            return CustomUserModelSerializerV2
        return CustomUserModelSerializer
