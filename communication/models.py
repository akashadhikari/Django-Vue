from django.db import models

# Create your models here.

class Process(models.Model):
    client_name = models.CharField(max_length=100)
    value = models.IntegerField(default=0)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('-created',)

    def __str__(self):
        return "{}-{}".format(self.client_name, self.created)