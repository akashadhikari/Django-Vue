from django.contrib import admin
from django.utils.translation import ugettext_lazy as _
from polymorphic_tree.admin import PolymorphicMPTTParentModelAdmin, PolymorphicMPTTChildModelAdmin
from . import models

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

class DateNodeAdmin(BaseChildAdmin):
    pass


# Create the parent admin that combines it all:

class TreeNodeParentAdmin(PolymorphicMPTTParentModelAdmin):
    base_model = models.BaseTreeNode
    child_models = (
        (models.DescriptionNode, BaseChildAdmin),
        (models.DateNode, DateNodeAdmin),  # custom admin allows custom edit/delete view.
    )

    list_display = ('title', 'actions_column',)

admin.site.register(models.BaseTreeNode, TreeNodeParentAdmin)