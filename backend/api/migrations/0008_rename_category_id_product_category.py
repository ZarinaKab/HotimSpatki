# Generated by Django 4.2.1 on 2023-05-04 16:25

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_rename_category_product_category_id'),
    ]

    operations = [
        migrations.RenameField(
            model_name='product',
            old_name='category_id',
            new_name='category',
        ),
    ]
