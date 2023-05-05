from django.contrib import admin

from .models import Category, Product, InventoryStatus, User

# Register your models here.

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'inventoryStatus_id', 'get_categories', 'image')

    def get_categories(self, obj):
        return ", ".join([c.name for c in obj.category.all()])

    get_categories.short_description = 'Categories'

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name']

@admin.register(InventoryStatus)
class InventoryStatusAdmin(admin.ModelAdmin):
    list_display = ['name']

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'password')


# admin.site.register(Product)
# admin.site.register(Category)
# admin.site.register(InventoryStatus)
# admin.site.register(User)
