from django.contrib.auth.models import User
from django.db import models
from rest_framework.compat import MinValueValidator, MaxValueValidator
from django.core.exceptions import ValidationError
from django.utils.translation import gettext as _

SERVICE_CHOICES = (
    ("Hardware", "Hardware"),
    ("Software", "Software"),
)

class Process(models.Model):
    service = models.CharField(max_length=3, choices=SERVICE_CHOICES)
    income = models.IntegerField(default=0)
    unit = models.PositiveIntegerField(default=1, validators=[MinValueValidator(1)])
    bulk = models.BooleanField(default=False)
    stage = models.PositiveIntegerField(default=1, validators=[MinValueValidator(1), MaxValueValidator(10)])
    created = models.DateTimeField(auto_now_add=True)

    def clean(self):
        # Don't allow Suspecting entries to have a remainder_date.
        if self.service == 'Hardware' and self.stage>5:
            raise ValidationError({'Hardware service': _('Hardware service has no more than 5 stages.')})

    #To call the model clean method we will override save method.
    def save(self, *args, **kwargs):
        self.clean()
        return super(Process, self).save(*args, **kwargs)

    def __str__(self):
        return "{} by {}".format(self.service, self.user.get_full_name())

    class Meta:
        ordering = ('-created',)