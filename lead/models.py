from django.contrib.auth.models import User
from django.db import models
from rest_framework.compat import MinValueValidator, MaxValueValidator
from django.core.exceptions import ValidationError
from django.utils.translation import gettext as _
from polymorphic_tree.models import PolymorphicMPTTModel, PolymorphicTreeForeignKey

SERVICE_CHOICES = (
    ("Hardware", "Hardware"),
    ("Software", "Software"),
)

class Process(models.Model):
    service = models.CharField(max_length=15, choices=SERVICE_CHOICES)
    income = models.IntegerField(default=0)
    discount = models.IntegerField(default=0)
    tax_percent = models.PositiveIntegerField(default=1, validators=[MinValueValidator(1), MaxValueValidator(25)])
    unit = models.PositiveIntegerField(default=1, validators=[MinValueValidator(1)])
    bulk = models.BooleanField(default=False)
    stage = models.PositiveIntegerField(default=1, validators=[MinValueValidator(1), MaxValueValidator(10)])
    created = models.DateTimeField(auto_now_add=True)

    def grand_total(self):
        return (self.income - self.discount + (self.tax_percent*self.income)/100)

    def clean(self):
        # Don't allow Suspecting entries to have a remainder_date.
        if self.service == 'Hardware' and self.stage>5:
            raise ValidationError({'service': _('Hardware service has no more than 5 stages.')})

        if self.bulk == 0 and self.stage>1:
            raise ValidationError({'bulk': _('Items not purchased in bulk but Unit is defined more than 1.')})

        if self.bulk == 1 and self.stage==1:
            raise ValidationError({'bulk': _('Items purchased in bulk but unit is equal to 1.')})

    #To call the model clean method we will override save method.
    def save(self, *args, **kwargs):
        self.clean()
        return super(Process, self).save(*args, **kwargs)

    def __str__(self):
        return "{} at stage {}".format(self.service, self.stage)

    class Meta:
        ordering = ('-created',)

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


# Create 3 derived models for the tree nodes:

class CategoryNode(BaseTreeNode):
    opening_title = models.CharField(_("Opening title"), max_length=200)

    class Meta:
        verbose_name = _("Category node")
        verbose_name_plural = _("Category nodes")


class TextNode(BaseTreeNode):
    extra_text = models.TextField()

    # Extra settings:
    can_have_children = False

    class Meta:
        verbose_name = _("Text node")
        verbose_name_plural = _("Text nodes")

