# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-12-24 02:20
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('lead', '0007_anothernode'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='anothernode',
            name='basetreenode_ptr',
        ),
        migrations.DeleteModel(
            name='AnotherNode',
        ),
    ]
