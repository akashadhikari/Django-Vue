from rest_framework import serializers
from .models import Process

class ProcessSerializer(serializers.ModelSerializer):
	class Meta:
		model = Process
		fields = ('id', 'client_name', 'contact_person', 'medium_action', 'medium_type', 'medium_status', 'stage', 'remainder_date', 'created')
