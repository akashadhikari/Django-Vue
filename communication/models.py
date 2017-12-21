from django.core.exceptions import ValidationError
from django.db import models
from django.utils.translation import ugettext_lazy as _


medium_actions = (
    ('Inbound', 'Inbound'),
    ('Outbound', 'Outbound'),
)

medium_types = (
    ('Email', 'Email'),
    ('SMS', 'SMS'),
    ('Call', 'Call'),
)

medium_statuses = (
    ('Success', 'Success'),
    ('Failure', 'Failure'),
)

sales_stages = (
    ('Suspecting', 'Suspecting'),
    ('Prospecting', 'Prospecting'),
    ('Approaching', 'Approaching'),
)

class Salestage(models.Model):
    stage = models.CharField(max_length=15, default="Suspecting")

    def __str__(self):
        return "{}".format(self.stage)

class Process(models.Model):
    client_name = models.CharField(max_length=50)
    contact_person = models.CharField(max_length=100, default="Mr. Foo Bar")
    medium_action = models.CharField(max_length=10, choices=medium_actions, default='Inbound')
    medium_type = models.CharField(max_length=10, choices=medium_types, default='Email')
    medium_status = models.CharField(max_length=10, choices=medium_statuses, default='Success')
    salestage = models.ForeignKey(Salestage, on_delete=models.CASCADE)
    remainder_date = models.DateTimeField(null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('-created',)

    def __str__(self):
        return "{}-{}".format(self.client_name, self.salestage)

class Stageaction(models.Model):
    action_name = models.CharField(max_length=100, default="Sample action")
    salestage = models.ForeignKey(Salestage, on_delete=models.CASCADE)

    def __str__(self):
        return "{}-{}".format(self.action_name, self.salestage)
