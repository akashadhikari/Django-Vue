# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-12-21 07:46
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('communication', '0008_auto_20171221_0742'),
    ]

    operations = [
        migrations.AddField(
            model_name='process',
            name='contact_person',
            field=models.CharField(default='Mr. Foo Bar', max_length=100),
        ),
    ]