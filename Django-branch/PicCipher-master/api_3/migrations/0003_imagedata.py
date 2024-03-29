# Generated by Django 4.1.12 on 2023-10-05 17:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api_3', '0002_uploadedimage'),
    ]

    operations = [
        migrations.CreateModel(
            name='ImageData',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image_url', models.URLField()),
                ('ocr_text', models.TextField()),
                ('tags', models.FileField(max_length=1000, null=True, upload_to='')),
            ],
        ),
    ]
