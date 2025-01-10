# Generated by Django 4.2.5 on 2025-01-10 15:24

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ("db", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="user",
            name="avatar",
            field=models.ImageField(upload_to="users/avatars/"),
        ),
        migrations.AlterField(
            model_name="user",
            name="gender",
            field=models.CharField(
                choices=[
                    ("male", "male"),
                    ("female", "female"),
                    ("not_to_specify", "not_to_specify"),
                ],
                max_length=50,
            ),
        ),
        migrations.CreateModel(
            name="SocialLoginConnection",
            fields=[
                (
                    "id",
                    models.UUIDField(
                        db_index=True,
                        default=uuid.uuid4,
                        editable=False,
                        primary_key=True,
                        serialize=False,
                        unique=True,
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                (
                    "medium",
                    models.CharField(
                        choices=[("Google", "google")], default=None, max_length=20
                    ),
                ),
                (
                    "last_login_at",
                    models.DateTimeField(default=django.utils.timezone.now, null=True),
                ),
                (
                    "last_received_at",
                    models.DateTimeField(default=django.utils.timezone.now, null=True),
                ),
                ("token_data", models.JSONField(null=True)),
                ("extra_data", models.JSONField(null=True)),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="user_login_connections",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
            options={
                "verbose_name": "Social Login Connection",
                "verbose_name_plural": "Social Login Connections",
                "db_table": "social_login_connections",
                "ordering": ("-created_at",),
            },
        ),
        migrations.CreateModel(
            name="EventUserRegistration",
            fields=[
                (
                    "id",
                    models.UUIDField(
                        db_index=True,
                        default=uuid.uuid4,
                        editable=False,
                        primary_key=True,
                        serialize=False,
                        unique=True,
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                (
                    "status",
                    models.CharField(
                        choices=[
                            ("going", "going"),
                            ("waiting", "waiting"),
                            ("not_going", "not_going"),
                        ],
                        max_length=50,
                    ),
                ),
                ("first_time_attendee", models.BooleanField(default=True)),
                (
                    "event",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="db.event"
                    ),
                ),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
            options={
                "abstract": False,
            },
        ),
    ]
