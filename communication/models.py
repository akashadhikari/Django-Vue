from django.core.exceptions import ValidationError
from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth.models import User
from django.utils.translation import gettext as _
from polymorphic_tree.models import PolymorphicMPTTModel, PolymorphicTreeForeignKey
import uuid

######################################################## !!! Django Polymorphic !!! ########################################################

# A base model for the tree:

class BaseTreeNode(PolymorphicMPTTModel):
    parent = PolymorphicTreeForeignKey('self', blank=True, null=True, related_name='children', verbose_name=_('parent'))
    title = models.CharField(_("Title"), max_length=200)

    def __str__(self):
        return "{}>{}".format(self.parent, self.title)

    class Meta(PolymorphicMPTTModel.Meta):
        verbose_name = _("Tree node")
        verbose_name_plural = _("Tree nodes")


# 2 derived models for the tree nodes:

class DescriptionNode(BaseTreeNode):
    basetreenode = models.OneToOneField(BaseTreeNode, related_name="base_tree")
    description = models.CharField(_("Description"), max_length=200)

    class Meta:
        verbose_name = _("Description node")
        verbose_name_plural = _("Description nodes")


class DateNode(BaseTreeNode):
    date = models.DateTimeField(null=True)

    # no additional inheritance
    can_have_children = False

    class Meta:
        verbose_name = _("Date node")
        verbose_name_plural = _("Date nodes")
