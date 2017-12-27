from .models import BaseTreeNode, CategoryNode
from .serializers import BaseTreeNodeSerializer, CategoryNodeSerializer
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

class CategoryNodeView(generics.ListCreateAPIView):
    queryset = CategoryNode.objects.all()
    serializer_class = CategoryNodeSerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    search_fields = ('id', 'opening_title')

# class CategoryNodeDetailsView(generics.RetrieveUpdateDestroyAPIView):

#     queryset = CategoryNode.objects.all()
#     serializer_class = CategoryNode