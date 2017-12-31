from .models import Process
from rest_framework import serializers
from django.contrib.auth.models import User

# class ProcessSerializer(serializers.ModelSerializer):

#     user = serializers.ReadOnlyField(source='user.username')
#     grand_total = serializers.ReadOnlyField()

#     class Meta:
#         model = Process
#         fields = ('id', 'user', 'service', 'income', 'discount', 'tax_percent', 'grand_total', 'unit', 'bulk', 'stage', 'created')

# class UserSerializer(serializers.ModelSerializer):
#     """A user serializer to aid in authentication and authorization."""

#     # Always use the related_name defined on models
#     process_list = serializers.PrimaryKeyRelatedField(
#         many=True, queryset=Process.objects.all())

#     class Meta:
#         """Map this serializer to the default django user model."""
#         model = User
#         fields = ('id', 'username', 'process_list')

from rest_framework import serializers

from .models import Process


class ProcessSerializer(serializers.ModelSerializer):
    def get_user(self, instance):
        return instance.user.username

    def get_fields(self):
        fields = super().get_fields()

        if self.context['request'].method == 'GET':
            fields['user'] = serializers.SerializerMethodField()

        return fields

    class Meta:
        model = Process
        fields = ('id', 'user', 'service', 'income', 'discount', 'tax_percent', 'grand_total', 'unit', 'bulk', 'stage', 'created')