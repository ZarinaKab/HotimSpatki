from django.db import models

# Create your models here.

class Customer(models.Model):
    name = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    is_premium = models.BooleanField(default=False)

    class Meta:
        verbose_name = 'Customer'
        verbose_name_plural = 'Customers'

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'password': self.password,
            'is_premium': self.is_premium,
        }



class Category(models.Model):
    name = models.CharField(max_length=50)

    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
        }

class InventoryStatus(models.Model):
    name = models.CharField(max_length=50)

    class Meta:
        verbose_name = 'InventoryStatus'
        verbose_name_plural = 'InventoryStatuses'

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
        }

class Product(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(max_length=500)
    price = models.IntegerField(default=0)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    inventoryStatus = models.ForeignKey(InventoryStatus, on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'Product'
        verbose_name_plural = 'Products'

    def tp_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'price': self.price,
            'category': self.category,
            'inventoryStatus': self.inventoryStatus,
        }
