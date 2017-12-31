from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.viewsets import ModelViewSet

from .permissions import IsUser
from .serializers import UserSerializer


class UserViewSet(ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = (IsUser,)


class UserCreate(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
