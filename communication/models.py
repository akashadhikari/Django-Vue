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

purposes = (
    ('Suspecting', 'Suspecting'),
    ('Prospecting', 'Prospecting'),
    ('General Query', 'General Query'),
)

class Purpose(models.Model):
    name = models.CharField(max_length=50, choices=purposes, default='Suspecting')
    purpose_description = models.CharField(max_length=100, default="Purpose description here")
    approached_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('-approached_date',)

    def __str__(self):
        return "{}-{}".format(self.name, self.approached_date)

class Process(models.Model):
    client_name = models.CharField(max_length=50)
    contact_person = models.CharField(max_length=100, default="Mr. Foo Bar")
    medium_action = models.CharField(max_length=10, choices=medium_actions, default='Inbound')
    medium_type = models.CharField(max_length=10, choices=medium_types, default='Email')
    medium_status = models.CharField(max_length=10, choices=medium_statuses, default='Success')
    remainder_date = models.DateTimeField(null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)

    def clean(self):
        # Don't allow Suspecting entries to have a remainder_date.
        if self.purpose == 'Suspecting' and self.remainder_date is not None:
            raise ValidationError({'remainder_date': _('Suspecting entries may not have a remainder date.')})

    #To call the model clean method we will override save method.
    def save(self, *args, **kwargs):
        self.clean()
        return super(Process, self).save(*args, **kwargs)

    
    class Meta:
        ordering = ('-created',)

    def __str__(self):
        return "{}-{}".format(self.client_name, self.created)

# if stage = Suspecting, return datefield
# if stage = Prospecting, return Charfield