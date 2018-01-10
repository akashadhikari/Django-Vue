from django.contrib.auth.models import User
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
        fields = ('id', 'user', 'service', 'status', 'income', 'discount', 'tax_percent', 'grand_total', 'unit', 'bulk', 'stage', 'created')

class StatsSerializer(serializers.ModelSerializer):

    hardware_count = serializers.ReadOnlyField()
    software_count = serializers.ReadOnlyField()

    class Meta:
        model = Process
        fields = ('hardware_count', 'software_count')