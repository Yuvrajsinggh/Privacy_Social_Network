# Generated by Django 4.2.4 on 2023-09-25 09:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0006_alter_user_managers_postreport'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='anonymous_status',
            field=models.BooleanField(default=False),
        ),
    ]
