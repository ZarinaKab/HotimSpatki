from django.contrib import admin

from .models import Category, Product, InventoryStatus, Customer

# Register your models here.

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'category', 'inventoryStatus')

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name']

@admin.register(InventoryStatus)
class InventoryStatusAdmin(admin.ModelAdmin):
    list_display = ['name']

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ('name', 'is_premium')


# admin.site.register(Product)
# admin.site.register(Category)
# admin.site.register(InventoryStatus)
# admin.site.register(Customer)
