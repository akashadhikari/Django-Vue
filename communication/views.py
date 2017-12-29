from django.contrib.auth.models import User
from .models import Clientlist, Detaillist, SalesStage
from .permissions import IsOwner
from rest_framework import generics
from rest_framework import permissions
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from .serializers import ClientlistSerializer, UserSerializer, DetaillistSerializer, SalesStageSerializer

class ClientCreateView(generics.ListCreateAPIView):
    queryset = Clientlist.objects.all()
    serializer_class = ClientlistSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwner)
    filter_backends = (filters.SearchFilter, filters.OrderingFilter, DjangoFilterBackend)
    filter_fields = ('client_name', 'owner')

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class ClientDetailsView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Clientlist.objects.all()
    serializer_class = ClientlistSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwner)

class UserView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserDetailsView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class DetaillistView(generics.ListCreateAPIView):
	queryset = Detaillist.objects.all()
	serializer_class = DetaillistSerializer
	filter_backends = (filters.SearchFilter, filters.OrderingFilter, DjangoFilterBackend)
	filter_fields = ('client', 'medium')

class DetailEditView(generics.RetrieveUpdateDestroyAPIView):
	queryset = Detaillist.objects.all()
	serializer_class = DetaillistSerializer

class SalesStageListView(generics.ListCreateAPIView):
	queryset = SalesStage.objects.all()
	serializer_class = SalesStageSerializer
	filter_backends = (filters.SearchFilter, filters.OrderingFilter, DjangoFilterBackend)
	filter_fields = ('sales_stage', 'substage')

class SalesStageEditView(generics.RetrieveUpdateDestroyAPIView):
	queryset = SalesStage.objects.all()
	serializer_class = SalesStageSerializer