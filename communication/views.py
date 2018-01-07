from rest_framework import viewsets, generics
from .models import Clientlist, SalesStage, SalesSub
# from rest_framework import filters
# from django_filters.rest_framework import DjangoFilterBackend
from .serializers import ClientlistSerializer, SalesStageSerializer, SalesSubSerializer
from users.permissions import IsManager
from rest_framework import permissions
from .permissions import IsOwnerOrReadOnly
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAdminUser,
    IsAuthenticatedOrReadOnly,
    )

class ClientlistViewSet(generics.ListCreateAPIView):
    queryset = Clientlist.objects.all()
    serializer_class = ClientlistSerializer
    permission_classes = (IsManager,)
    # filter_backends = (filters.SearchFilter, filters.OrderingFilter, DjangoFilterBackend)
    # search_fields = ('client_name')
    # filter_fields = ('client_name')

    def perform_create(self, serializer):
            serializer.save() # Adding owner=self.request.user

class ClientlistDetailsViewSet(generics.RetrieveUpdateDestroyAPIView):
    queryset = Clientlist.objects.all()
    serializer_class = ClientlistSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

class SalesStageListView(generics.ListCreateAPIView):
    queryset = SalesStage.objects.all()
    serializer_class = SalesStageSerializer
    # filter_backends = (filters.SearchFilter, filters.OrderingFilter, DjangoFilterBackend)
    # filter_fields = ('sales_stage', 'substage')

class SalesStageEditView(generics.RetrieveUpdateDestroyAPIView):
    queryset = SalesStage.objects.all()
    serializer_class = SalesStageSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

class SalesSubListView(generics.ListCreateAPIView):
    queryset = SalesSub.objects.all()
    serializer_class = SalesSubSerializer

class SalesSubEditView(generics.RetrieveUpdateDestroyAPIView):
    queryset = SalesSub.objects.all()
    serializer_class = SalesSubSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]