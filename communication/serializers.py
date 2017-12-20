from rest_framework import serializers
from .models import Process

class ProcessSerializer(serializers.ModelSerializer):
	class Meta:
		model = Process
		fields = ('id', 'client_name', 'value', 'medium', 'purpose', 'remainder_date', 'created')