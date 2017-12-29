from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Clientlist, Detaillist, SalesStage

class UserSerializer(serializers.ModelSerializer):

    # Always use the related_name defined on models
    clientlist = serializers.PrimaryKeyRelatedField(many=True, queryset=Clientlist.objects.all())

    class Meta:
        """Map this serializer to the default django user model."""
        model = User
        fields = ('id', 'username', 'clientlist')

class DetaillistSerializer(serializers.ModelSerializer):

    def get_client(self, obj):
        return obj.client.client_name

    def get_fields(self):
        fields = super().get_fields()

        if self.context['request'].method == 'GET':
            fields['client'] = serializers.SerializerMethodField()

        return fields

    class Meta:
        model = Detaillist
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

class ClientlistSerializer(serializers.ModelSerializer):

    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        """Meta class to map serializer's fields with the model fields."""
        model = Clientlist
        fields = ('id', 'client_name', 'owner', 'date_created', 'date_modified')
        read_only_fields = ('date_created', 'date_modified')