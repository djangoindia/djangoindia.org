# Generated by Django 4.2.5 on 2024-09-30 04:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('db', '0011_communitypartner'),
    ]

    operations = [
        migrations.AddField(
            model_name='sponsor',
            name='description',
            field=models.TextField(blank=True, max_length=500, null=True),
        ),
    ]
