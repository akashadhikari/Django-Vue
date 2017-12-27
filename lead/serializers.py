from .models import Process
from rest_framework import serializers
from django.contrib.auth.models import User

class ProcessSerializer(serializers.ModelSerializer):

	owner = serializers.ReadOnlyField(source='owner.username')
	grand_total = serializers.ReadOnlyField()

	class Meta:
		model = Process
		fields = ('id', 'owner', 'service', 'income', 'discount', 'tax_percent', 'grand_total', 'unit', 'bulk', 'stage', 'created')

class UserSerializer(serializers.ModelSerializer):
    """A user serializer to aid in authentication and authorization."""

    # Always use the related_name defined on models
    process_list = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Process.objects.all())

    class Meta:
        """Map this serializer to the default django user model."""
        model = User
        fields = ('id', 'username', 'process_list')