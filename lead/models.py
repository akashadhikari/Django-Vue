from django.contrib.auth.models import User
from django.db import models
from rest_framework.compat import MinValueValidator

SERVICE_CHOICES = (
    ("Hardware", "Hardware"),
    ("Software", "Software"),
    ("C", "C"),
    ("D", "D"),
)

STATUS_CHOICES = (
    ("PENDING", "PENDING"),
    ("APPROVED", "APPROVED")
)


class Process(models.Model):
    service = models.CharField(max_length=3, choices=SERVICE_CHOICES)
    income = models.IntegerField(default=0)
    unit = models.PositiveIntegerField(default=1, validators=[MinValueValidator(1)])
    stage = models.PositiveIntegerField(default=1, validators=[MinValueValidator(1)])
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    # lead_type = models.CharField(max_length=7, choices=LEAD_TYPE_CHOICES)
    bulk = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "{} by {}".format(self.service, self.user.get_full_name())

    class Meta:
        ordering = ('-created',)