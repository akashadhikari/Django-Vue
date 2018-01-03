from rest_framework import serializers

from .models import Clientlist, SalesStage, SalesSub


class ClientlistSerializer(serializers.ModelSerializer):
    def get_users(self, instance):
        return instance.user.username

    def get_fields(self):
        fields = super().get_fields()

        if self.context['request'].method == 'GET':
            fields['users'] = serializers.SerializerMethodField()

        return fields

    class Meta:
        model = Clientlist
        fields = '__all__'


class SalesStageSerializer(serializers.ModelSerializer):

    def get_client(self, obj):
        return obj.client.client_name

    def get_fields(self):
        fields = super().get_fields()

        if self.context['request'].method == 'GET':
            fields['client'] = serializers.SerializerMethodField()

        return fields

    class Meta:
        model = SalesStage
        fields = '__all__'

class SalesSubSerializer(serializers.ModelSerializer):

    class Meta:
        model = SalesSub
        fields = ('substage', 'sales_substage')