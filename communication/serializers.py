from .models import DateNode, DescriptionNode, BaseTreeNode
from rest_framework import serializers, fields
from rest_framework_recursive.fields import RecursiveField


class DateNodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DateNode
        fields = ('date')

class DescriptionNodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DescriptionNode
        fields = ('description',)

class BaseTreeNodeSerializer(serializers.ModelSerializer):
    description = serializers.SerializerMethodField()
    subcategories = serializers.ListSerializer(source="children",child=RecursiveField())
    class Meta:
        model = BaseTreeNode
        fields = ('id', 'title', 'description', 'subcategories')
        
    def get_description(self, obj):
        return obj.base_tree.description #base_tree is related name of basetreenode field
