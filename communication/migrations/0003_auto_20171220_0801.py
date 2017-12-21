# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-12-20 08:01
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('communication', '0002_auto_20171220_0748'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='process',
            name='medium_status',
        ),
        migrations.AlterField(
            model_name='process',
            name='medium',
            field=models.CharField(choices=[('Email', 'Email'), ('SMS', 'SMS'), ('Inbound Call', 'Inbound Call'), ('Outbound Call', 'Outbound Call'), ('Visit', 'Visit')], default='Email', max_length=10),
        ),
        migrations.AlterField(
            model_name='process',
            name='purpose',
            field=models.CharField(choices=[('Job Posting', 'Job Posting'), ('Approval', 'Approval'), ('Payment Collection', 'Payment Collection'), ('General Query', 'General Query')], default='General_Query', max_length=50),
        ),
    ]