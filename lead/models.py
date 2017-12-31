from django.contrib.auth.models import User
from django.db import models
from rest_framework.compat import MinValueValidator, MaxValueValidator
from django.core.exceptions import ValidationError
from django.utils.translation import gettext as _
from django.db.models.signals import post_save
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from django.dispatch import receiver

SERVICE_CHOICES = (
    ("Hardware", "Hardware"),
    ("Software", "Software"),
)

class Process(models.Model):
    user = models.ForeignKey(User, related_name='user', on_delete=models.CASCADE) 
    service = models.CharField(max_length=15, choices=SERVICE_CHOICES)
    income = models.IntegerField(default=0)
    discount = models.IntegerField(default=0)
    tax_percent = models.PositiveIntegerField(default=1, validators=[MinValueValidator(1), MaxValueValidator(25)])
    unit = models.PositiveIntegerField(default=1, validators=[MinValueValidator(1)])
    bulk = models.BooleanField(default=False)
    stage = models.PositiveIntegerField(default=1, validators=[MinValueValidator(1), MaxValueValidator(10)])
    created = models.DateTimeField(auto_now_add=True)

    def grand_total(self):
        return (self.income - self.discount + (self.tax_percent*self.income)/100)

    def clean(self):
        # Don't allow Hardware services to have stages more than 5.
        if self.service == 'Hardware' and self.stage>5:
            raise ValidationError({'service': _('Hardware service has no more than 5 stages.')})

        if self.bulk == 0 and self.stage>1:
            raise ValidationError({'bulk': _('Items not purchased in bulk but Unit is defined more than 1.')})

        if self.bulk == 1 and self.stage==1:
            raise ValidationError({'bulk': _('Items purchased in bulk but unit is equal to 1.')})

    #To call the model clean method we will override save method.
    def save(self, *args, **kwargs):
        self.clean()
        return super(Process, self).save(*args, **kwargs)

    def __str__(self):
        return "{} at stage {}".format(self.service, self.stage)

    class Meta:
        ordering = ('-created',)

@receiver(post_save, sender=User)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


