# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0006_auto_20160802_1508'),
    ]

    operations = [
        migrations.AlterField(
            model_name='asentamiento',
            name='asentamiento_intervenido_techo',
            field=models.CharField(default='no', max_length=1000, blank=True),
        ),
    ]
