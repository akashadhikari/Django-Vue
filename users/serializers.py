from django.contrib.auth.models import User
from rest_framework import serializers

from .models import RelationUserType


class UserSerializer(serializers.ModelSerializer):
    usertype = serializers.SerializerMethodField()

    def get_type(self, instance):
        try:
            return RelationUserType.objects.get(user=instance).usertype
        except RelationUserType.DoesNotExist:
            return None

    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'first_name', 'last_name', 'usertype')
        read_only_fields = ('usertype',)
        extra_kwargs = {
            'password': {
                'write_only': True,
                'style': {
                    'input_type': 'password'
                }
            }
        }

    def create(self, validated_data):
        user = super().create(validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user

    def update(self, instance, validated_data):
        super().update(instance, validated_data)
        if validated_data['password']:
            instance.set_password(validated_data['password'])
            instance.save()
        return instance
