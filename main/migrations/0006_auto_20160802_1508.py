# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0005_auto_20160802_1502'),
    ]

    operations = [
        migrations.AlterField(
            model_name='asentamiento',
            name='asentamiento_intervenido_techo',
            field=models.CharField(max_length=1000, blank=True),
        ),
    ]
