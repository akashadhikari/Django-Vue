from rest_framework import viewsets, generics
from .models import Process
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from .serializers import ProcessSerializer, StatsSerializer
from users.permissions import IsManager
from rest_framework import permissions
# from .permissions import IsOwner
from django.contrib.auth.models import User

class ProcessListViewSet(generics.ListCreateAPIView):
    queryset = Process.objects.all()
    serializer_class = ProcessSerializer
    permission_classes = (IsManager,)
    filter_backends = (filters.SearchFilter, filters.OrderingFilter, DjangoFilterBackend)
    search_fields = ('service', 'stage')
    filter_fields = ('service', 'stage')

    def perform_create(self, serializer):
            serializer.save() # Adding owner=self.request.user

class ProcessDetailsViewSet(generics.RetrieveUpdateDestroyAPIView):
    queryset = Process.objects.all()
    serializer_class = ProcessSerializer
    permission_classes = (IsManager,)

class StatsViewSet(generics.ListCreateAPIView):
    queryset = Process.objects.all() # Process.objects.filter(service='Hardware').count()
    serializer_class = StatsSerializer

################################PANDAS#######################

from rest_pandas import PandasView
from .serializers import ProcessSerializer

# Short version (leverages default DRP settings):
class ProcessPandasView(PandasView):
    queryset = Process.objects.all()
    serializer_class = ProcessSerializer