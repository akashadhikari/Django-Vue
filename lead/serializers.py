from rest_framework import serializers
from .models import Process, BaseTreeNode, CategoryNode, TextNode

class ProcessSerializer(serializers.ModelSerializer):

	grand_total = serializers.ReadOnlyField()

	class Meta:
		model = Process
		fields = ('id', 'service', 'income', 'discount', 'tax_percent', 'grand_total', 'unit', 'bulk', 'stage', 'created')

######################################################## !!! Django Polymorphic !!! ########################################################

from rest_framework_recursive.fields import RecursiveField

# class TreeSerializer(serializers.Serializer):
#     name = serializers.CharField()
#     children = serializers.ListField(child=RecursiveField())

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
    class Meta:
        model = BaseTreeNode
        fields = ('id', 'title', 'subcategories')

# class BaseTreeNodeSerializer(serializers.Serializer):
#     # name = serializers.CharField()
#     children = serializers.ListField(child=RecursiveField())

#     class Meta:
#     	model = BaseTreeNode
#     	fields = ('id', 'title', 'children')
      