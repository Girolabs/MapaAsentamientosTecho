# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0002_remove_asentamiento_numero_encuesta'),
    ]

    operations = [
        migrations.AlterField(
            model_name='asentamiento',
            name='numero_familias',
            field=models.BigIntegerField(blank=True),
        ),
    ]
