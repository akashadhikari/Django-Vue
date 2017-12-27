# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-11-28 08:53
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='UserType',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(choices=[('manager', 'manager'), ('employer', 'employer'), ('jobseeker', 'jobseeker')], max_length=10)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='user_type', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
