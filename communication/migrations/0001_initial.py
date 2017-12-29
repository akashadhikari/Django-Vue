# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-12-29 02:13
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
            name='Clientlist',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('client_name', models.CharField(max_length=255)),
                ('date_created', models.DateTimeField(auto_now_add=True)),
                ('date_modified', models.DateTimeField(auto_now=True)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='clientlist', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Detaillist',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('medium', models.CharField(choices=[('Inbound Call', 'Inbound Call'), ('Outbound Call', 'Outbound Call'), ('Inbound Email', 'Inbound Email'), ('Outbound Email', 'Outbound Email'), ('Inbound Call', 'Inbound Call'), ('Outbound Call', 'Outbound Call')], max_length=255)),
                ('medium_status', models.CharField(choices=[('Successful', 'Successful'), ('Unsuccessful', 'Unsuccessful')], max_length=10)),
                ('contact_person', models.CharField(max_length=255)),
                ('remarks', models.TextField(max_length=999)),
                ('client', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='client', to='communication.Clientlist')),
            ],
        ),
    ]
