from .models import BaseTreeNode
from .serializers import BaseTreeNodeSerializer
from rest_framework import viewsets, generics
from rest_framework import filters

class BaseTreeNodeView(generics.ListCreateAPIView):
    queryset = BaseTreeNode.objects.all()
    queryset = queryset.toplevel()
    serializer_class = BaseTreeNodeSerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    search_fields = ('id', 'title')
