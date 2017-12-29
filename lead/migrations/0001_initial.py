# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-12-29 02:13
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import rest_framework.compat


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Process',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('service', models.CharField(choices=[('Hardware', 'Hardware'), ('Software', 'Software')], max_length=15)),
                ('income', models.IntegerField(default=0)),
                ('discount', models.IntegerField(default=0)),
                ('tax_percent', models.PositiveIntegerField(default=1, validators=[rest_framework.compat.MinValueValidator(1), rest_framework.compat.MaxValueValidator(25)])),
                ('unit', models.PositiveIntegerField(default=1, validators=[rest_framework.compat.MinValueValidator(1)])),
                ('bulk', models.BooleanField(default=False)),
                ('stage', models.PositiveIntegerField(default=1, validators=[rest_framework.compat.MinValueValidator(1), rest_framework.compat.MaxValueValidator(10)])),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='process_list', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ('-created',),
            },
        ),
    ]
