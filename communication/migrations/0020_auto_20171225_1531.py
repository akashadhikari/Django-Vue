# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-12-25 15:31
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('communication', '0019_auto_20171225_1524'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='process',
            name='salestage',
        ),
        migrations.RemoveField(
            model_name='stageaction',
            name='salestage',
        ),
        migrations.DeleteModel(
            name='Process',
        ),
        migrations.DeleteModel(
            name='Salestage',
        ),
        migrations.DeleteModel(
            name='Stageaction',
        ),
    ]
