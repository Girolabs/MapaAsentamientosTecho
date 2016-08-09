# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0004_asentamiento_asentamiento_intervenido_techo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='asentamiento',
            name='asentamiento_intervenido_techo',
            field=models.BooleanField(default=False),
        ),
    ]
