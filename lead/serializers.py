from .models import Process
from rest_framework import serializers

class ProcessSerializer(serializers.ModelSerializer):

    grand_total = serializers.ReadOnlyField()

    class Meta:
        model = Process
        fields = ('id', 'service', 'income', 'discount', 'tax_percent', 'grand_total', 'unit', 'bulk', 'stage', 'created')