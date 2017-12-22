from django.contrib import admin
from .models import Process, Salestage, Stageaction, Celestial

# Register your models here.

admin.site.register(Process)
admin.site.register(Salestage)
admin.site.register(Stageaction)
admin.site.register(Celestial)

# from django.contrib import admin
# from lead.models import *
# from django.apps import apps

# for model in apps.get_app_config('lead').models.values():
#     admin.site.register(model)
