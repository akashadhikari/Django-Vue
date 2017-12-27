from .models import DateNode, DescriptionNode, BaseTreeNode
from rest_framework import serializers
from rest_framework_recursive.fields import RecursiveField


class DateNodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DateNode
        fields = ('date')

class DescriptionNodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DescriptionNode
        fields = ('opening_title',)

class BaseTreeNodeSerializer(serializers.ModelSerializer):
    subcategories = serializers.ListSerializer(source="children",child=RecursiveField())
    # opening_title = DescriptionNodeSerializer(many=True)    
    class Meta:
        model = BaseTreeNode
        fields = ('id', 'title', 'subcategories')