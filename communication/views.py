from .models import BaseTreeNode, DescriptionNode
from .serializers import BaseTreeNodeSerializer, DescriptionNodeSerializer
from rest_framework import viewsets, generics
from rest_framework import filters

class BaseTreeNodeView(generics.ListCreateAPIView):
    queryset = BaseTreeNode.objects.all()
    queryset = queryset.toplevel()
    serializer_class = BaseTreeNodeSerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    search_fields = ('id', 'title')

# class BaseTreeNodeDetailsView(generics.RetrieveUpdateDestroyAPIView):

#     queryset = BaseTreeNode.objects.all()
#     queryset = queryset.toplevel()
#     serializer_class = BaseTreeNode

class DescriptionNodeView(generics.ListCreateAPIView):
    queryset = DescriptionNode.objects.all()
    serializer_class = DescriptionNodeSerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    search_fields = ('id', 'opening_title')

# class DescriptionNodeDetailsView(generics.RetrieveUpdateDestroyAPIView):

#     queryset = DescriptionNode.objects.all()
#     serializer_class = DescriptionNode