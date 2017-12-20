from django.db import models

mediums = (
	('Email', 'Email'),
    ('SMS', 'SMS'),
    ('Inbound Call', 'Inbound Call'),
    ('Outbound Call', 'Outbound Call'),
    ('Visit', 'Visit'),
)

purposes = (
    ('Job Posting', 'Job Posting'),
    ('Approval', 'Approval'),
    ('Payment Collection', 'Payment Collection'),
    ('General Query', 'General Query'),
)

class Process(models.Model):
    client_name = models.CharField(max_length=100)
    value = models.IntegerField(default=0)
    medium = models.CharField(max_length=10, choices=mediums, default='Email')
    purpose = models.CharField(max_length=50, choices=purposes, default='General_Query')
    remainder_date = models.DateTimeField(null=True)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('-created',)

    def __str__(self):
        return "{}-{}".format(self.client_name, self.created)