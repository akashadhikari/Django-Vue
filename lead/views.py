from rest_framework import viewsets, generics
from .models import Process
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from .serializers import ProcessSerializer

class ProcessListViewSet(generics.ListCreateAPIView):
    queryset = Process.objects.all()
    serializer_class = ProcessSerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter, DjangoFilterBackend)
    search_fields = ('service', 'stage')
    filter_fields = ('service', 'stage')

    def perform_create(self, serializer):
        """Save the post data when creating a new instance."""
        serializer.save()

class ProcessDetailsViewSet(generics.RetrieveUpdateDestroyAPIView):
    """This class handles the http GET, PUT and DELETE requests."""

    queryset = Process.objects.all()
    serializer_class = ProcessSerializer