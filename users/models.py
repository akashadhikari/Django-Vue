from django.conf import settings
from django.contrib.auth.models import User
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


class RelationUserType(models.Model):
    """
    User__Type
    """

    TYPE_CHOICES = (('manager', 'manager'), ('employer', 'employer'), ('jobseeker', 'jobseeker'))

    user = models.OneToOneField(User, related_name='user_type')
    usertype = models.CharField(max_length=10, choices=TYPE_CHOICES)

    def __str__(self):
        return self.user.username
