from rest_framework import serializers
from .models import Process

class ProcessSerializer(serializers.ModelSerializer):
	class Meta:
		model = Process
		fields = ('id', 'client_name', 'value', 'medium', 'purpose', 'stage', 'remainder_date', 'created')