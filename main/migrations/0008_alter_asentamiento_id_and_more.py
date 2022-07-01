# Generated by Django 4.0.5 on 2022-06-30 21:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0007_auto_20160808_2024'),
    ]

    operations = [
        migrations.AlterField(
            model_name='asentamiento',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
        migrations.AlterField(
            model_name='asentamiento',
            name='numero_aprox_viviendas',
            field=models.BigIntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='asentamiento',
            name='numero_aprox_viviendas_precarias',
            field=models.BigIntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='asentamiento',
            name='numero_familias',
            field=models.BigIntegerField(blank=True, null=True),
        ),
    ]
