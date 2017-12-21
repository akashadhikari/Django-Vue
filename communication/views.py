from rest_framework import viewsets, generics
from .models import Process, Purpose

from .serializers import ProcessSerializer, PurposeSerializer

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

class PurposeListViewSet(generics.ListCreateAPIView):
    queryset = Purpose.objects.all()
    serializer_class = PurposeSerializer

    def perform_create(self, serializer):
        """Save the post data when creating a new instance."""
        serializer.save()

class PurposeDetailsViewSet(generics.RetrieveUpdateDestroyAPIView):
    """This class handles the http GET, PUT and DELETE requests."""

    queryset = Purpose.objects.all()
    serializer_class = PurposeSerializer