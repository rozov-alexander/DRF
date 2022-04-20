from rest_framework.serializers import ModelSerializer
from .models import CustomUser


class CustomUserModelSerializer(ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'username', 'first_name', 'last_name']


class CustomUserModelSerializerV2(ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'username', 'first_name', 'last_name', 'is_superuser', 'is_staff']