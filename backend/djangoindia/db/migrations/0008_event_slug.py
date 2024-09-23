# Generated by Django 4.2.5 on 2024-09-23 10:32

from django.db import migrations, models

def generate_slugs(apps, schema_editor):
    YourModel = apps.get_model('db', 'event')
    for obj in YourModel.objects.all():
        if not obj.slug:
            obj.slug = slugify(obj.name)
            obj.save()

class Migration(migrations.Migration):

    dependencies = [
        ('db', '0007_sponsor_remove_event_event_end_date_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='slug',
            field=models.SlugField(default='slug', max_length=255, unique=True),
            preserve_default=False,
        ),
        migrations.RunPython(generate_slugs),
    ]
