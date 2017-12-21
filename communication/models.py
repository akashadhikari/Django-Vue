from django.core.exceptions import ValidationError
from django.db import models
from django.utils.translation import ugettext_lazy as _


mediums = (
	('Email', 'Email'),
    ('SMS', 'SMS'),
    ('Inbound Call', 'Inbound Call'),
    ('Outbound Call', 'Outbound Call'),
    ('Visit', 'Visit'),
)

purposes = (
    ('Approach', 'Approach'),
    ('Job Posting', 'Job Posting'),
    ('Suspecting', 'Suspecting'),
    ('Prospecting', 'Prospecting'),
    ('Approval', 'Approval'),
    ('Payment Collection', 'Payment Collection'),
    ('General Query', 'General Query'),
)

stages = (
    ('A', 'A'),
    ('B', 'B'),
    ('C', 'C'),
    ('D', 'D'),
)

class Process(models.Model):
    client_name = models.CharField(max_length=100)
    value = models.IntegerField(default=0)
    medium = models.CharField(max_length=10, choices=mediums, default='Email')
    purpose = models.CharField(max_length=50, choices=purposes, default='General_Query')
    stage = models.CharField(max_length=50, choices=stages, default='Suspecting')
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