from rest_framework import serializers
from .models import Process

class ProcessSerializer(serializers.ModelSerializer):
	class Meta:
		model = Process
		fields = ('id', 'service', 'income', 'unit', 'stage', 'status', 'bulk', 'created')
