from rest_framework import viewsets, generics
from .models import Process, BaseTreeNode
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend


from .serializers import ProcessSerializer, BaseTreeNodeSerializer

class ProcessListViewSet(generics.ListCreateAPIView):
    queryset = Process.objects.all()
    serializer_class = ProcessSerializer

    def perform_create(self, serializer):
        """Save the post data when creating a new instance."""
        serializer.save()

class ProcessDetailsViewSet(generics.RetrieveUpdateDestroyAPIView):
    """This class handles the http GET, PUT and DELETE requests."""

    queryset = Process.objects.all()
    serializer_class = ProcessSerializer

class BaseTreeNodeView(generics.ListCreateAPIView):
    queryset = BaseTreeNode.objects.all()
    queryset = queryset.toplevel()
    serializer_class = BaseTreeNodeSerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    search_fields = ('id', 'title')