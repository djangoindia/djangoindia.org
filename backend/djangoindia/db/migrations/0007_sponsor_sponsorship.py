# Generated by Django 4.2.5 on 2024-08-28 05:39

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('db', '0006_contactus_created_at_contactus_updated_at_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Sponsor',
            fields=[
                ('id', models.UUIDField(db_index=True, default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('name', models.CharField(max_length=255)),
                ('email', models.CharField(max_length=100)),
                ('type', models.CharField(choices=[('individual', 'individual'), ('organization', 'organization')], max_length=20)),
                ('logo', models.ImageField(upload_to='sponsors/logos/')),
                ('url', models.URLField(blank=True, max_length=500, null=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Sponsorship',
            fields=[
                ('id', models.UUIDField(db_index=True, default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('tier', models.CharField(choices=[('platinum', 'platinum'), ('gold', 'gold'), ('silver', 'silver'), ('individual', 'individual'), ('organization', 'organization')], max_length=20)),
                ('type', models.CharField(choices=[('community_sponsorship', 'community_sponsorship'), ('event_sponsorship', 'event_sponsorship')], max_length=30)),
                ('event', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='sponsors', to='db.event')),
                ('sponsor_details', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sponsorships', to='db.sponsor')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]