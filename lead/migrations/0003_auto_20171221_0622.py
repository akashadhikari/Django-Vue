# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-12-21 06:22
from __future__ import unicode_literals

from django.db import migrations, models
import rest_framework.compat


class Migration(migrations.Migration):

    dependencies = [
        ('lead', '0002_auto_20171220_0934'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='process',
            name='status',
        ),
        migrations.AlterField(
            model_name='process',
            name='service',
            field=models.CharField(choices=[('Hardware', 'Hardware'), ('Software', 'Software')], max_length=3),
        ),
        migrations.AlterField(
            model_name='process',
            name='stage',
            field=models.PositiveIntegerField(default=1, validators=[rest_framework.compat.MinValueValidator(1), rest_framework.compat.MaxValueValidator(10)]),
        ),
    ]
