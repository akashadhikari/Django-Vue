# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-12-21 07:42
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('communication', '0007_auto_20171221_0130'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='process',
            name='medium',
        ),
        migrations.RemoveField(
            model_name='process',
            name='stage',
        ),
        migrations.RemoveField(
            model_name='process',
            name='value',
        ),
        migrations.AddField(
            model_name='process',
            name='medium_action',
            field=models.CharField(choices=[('Inbound', 'Inbound'), ('Outbound', 'Outbound')], default='Inbound', max_length=10),
        ),
        migrations.AddField(
            model_name='process',
            name='medium_status',
            field=models.CharField(choices=[('Success', 'Success'), ('Failure', 'Failure')], default='Success', max_length=10),
        ),
        migrations.AddField(
            model_name='process',
            name='medium_type',
            field=models.CharField(choices=[('Email', 'Email'), ('SMS', 'SMS'), ('Call', 'Call')], default='Email', max_length=10),
        ),
        migrations.AlterField(
            model_name='process',
            name='client_name',
            field=models.CharField(max_length=50),
        ),
        migrations.AlterField(
            model_name='process',
            name='purpose',
            field=models.CharField(choices=[('Suspecting', 'Suspecting'), ('Prospecting', 'Prospecting'), ('General Query', 'General Query')], default='General_Query', max_length=50),
        ),
    ]
