from django.db import models
from django.db.models.signals import post_save
from django.contrib.auth.models import User
from django.dispatch import receiver
from django.core.exceptions import ValidationError
from django.utils.translation import gettext as _
from rest_framework.authtoken.models import Token

class Clientlist(models.Model):
    client_name = models.CharField(max_length=255, blank=False)
    user = models.ForeignKey(User, related_name='users', on_delete=models.CASCADE)
    date_created = models.DateTimeField(auto_now_add=True)
    date_modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "{}".format(self.client_name)

MEDIUM_CHOICES = (
    ("Inbound Call", "Inbound Call"),
    ("Outbound Call", "Outbound Call"),
    ("Inbound Email", "Inbound Email"),
    ("Outbound Email", "Outbound Email"),
    ("Inbound Call", "Inbound Call"),
    ("Outbound Call", "Outbound Call"),
)

YES_NO = (
    ("Successful", "Successful"),
    ("Unsuccessful", "Unsuccessful")
)

class Detaillist(models.Model):
    client = models.ForeignKey(Clientlist, related_name='client', on_delete=models.DO_NOTHING)
    medium = models.CharField(max_length=255, choices=MEDIUM_CHOICES)
    medium_status = models.CharField(max_length=10, choices=YES_NO)
    contact_person = models.CharField(max_length=255, blank=False)
    remarks = models.TextField(max_length=999, blank=False)

    def __str__(self):
        return "{}-{}".format(self.client, self.medium)

# SalesStage - grab client name, define stage (susp, pros, approach choices)

SALES_STAGES = (
    ("Suspecting", "Suspecting"), # Contact verification
    ("Prospecting", "Prospecting"), # Client detail
    ("Approaching", "Approaching") # Service intro
)

class SalesStage(models.Model):
    substage = models.CharField(max_length=100, primary_key=True)
    sales_stage = models.CharField(max_length=100, choices=SALES_STAGES)
    client = models.ForeignKey(Clientlist, related_name='client_sales', on_delete=models.DO_NOTHING)

    def __str__(self):
        return "{}-{}-{}".format(self.client, self.sales_stage, self.substage)

    class Meta:
        unique_together = (("client", "sales_stage"),)

###
class SalesSub(models.Model):
    sales_substage = models.CharField(max_length=100, blank=False)
    substage = models.ForeignKey(SalesStage, related_name='sub_stage', on_delete=models.DO_NOTHING)

    def __str__(self):
        return "{}".format(self.sales_substage)
###

@receiver(post_save, sender=User)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)