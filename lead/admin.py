from django.contrib import admin
from .models import Process
from django.utils.translation import ugettext_lazy as _
from polymorphic_tree.admin import PolymorphicMPTTParentModelAdmin, PolymorphicMPTTChildModelAdmin
from . import models

# Register your models here

admin.site.register(Process)


# The common admin functionality for all derived models:

class BaseChildAdmin(PolymorphicMPTTChildModelAdmin):
    GENERAL_FIELDSET = (None, {
        'fields': ('parent', 'title'),
    })

    base_model = models.BaseTreeNode
    base_fieldsets = (
        GENERAL_FIELDSET,
    )


# Optionally some custom admin code

class TextNodeAdmin(BaseChildAdmin):
    pass


# Create the parent admin that combines it all:

class TreeNodeParentAdmin(PolymorphicMPTTParentModelAdmin):
    base_model = models.BaseTreeNode
    child_models = (
        (models.CategoryNode, BaseChildAdmin),
        (models.TextNode, TextNodeAdmin),  # custom admin allows custom edit/delete view.
    )

    list_display = ('title', 'actions_column',)

admin.site.register(models.BaseTreeNode, TreeNodeParentAdmin)