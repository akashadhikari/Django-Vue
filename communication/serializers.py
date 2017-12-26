from .models import TextNode, CategoryNode, BaseTreeNode
from rest_framework import serializers
from rest_framework_recursive.fields import RecursiveField


class TextNodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = TextNode
        fields = ('extra_text')

class CategoryNodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoryNode
        fields = ('opening_title',)

class BaseTreeNodeSerializer(serializers.ModelSerializer):
    subcategories = serializers.ListSerializer(source="children",child=RecursiveField())
    # opening_title = CategoryNodeSerializer(many=True)
    class Meta:
        model = BaseTreeNode
        fields = ('id', 'title', 'subcategories')