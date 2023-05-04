from django.contrib import admin

from .models import Category, Product, InventoryStatus, User

# Register your models here.

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'inventoryStatus_id')

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name']

# @admin.register(InventoryStatus)
# class InventoryStatusAdmin(admin.ModelAdmin):
#     list_display = ['name']

# @admin.register(User)
# class UserAdmin(admin.ModelAdmin):
#     list_display = ('name', 'is_premium')


# admin.site.register(Product)
# admin.site.register(Category)
admin.site.register(InventoryStatus)
admin.site.register(User)
