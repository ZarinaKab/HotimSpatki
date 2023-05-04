from django.db import models
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    email = models.EmailField(max_length=255, unique=True, db_index=True)

    def __str__(self):
        return self.username

    def tokens(self):
        refresh = RefreshToken.for_user(self)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token)
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


class Category(models.Model):
    name = models.CharField(max_length=255)
    is_premium = models.BooleanField(default=False)

    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'premium': self.is_premium
        }


class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    inventoryStatus = models.ForeignKey(InventoryStatus, on_delete=models.CASCADE, related_name='products')
    seller = models.ForeignKey(User, on_delete=models.CASCADE, related_name='products')
    buyers = models.ManyToManyField(User, through='SavedProduct', related_name='saved_products')
    category = models.ManyToManyField(Category)

    class Meta:
        verbose_name = 'Product'
        verbose_name_plural = 'Products'

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'price': self.price,
            'category': self.category,
            'inventoryStatus': self.inventoryStatus,
            'seller': self.seller,
            'buyers': self.buyers,
        }


class SavedProduct(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    is_seller = models.BooleanField(default=False)

    class Meta:
        verbose_name = 'SavedProduct'
        verbose_name_plural = 'SavedProducts'

    def tp_json(self):
        return {
            'id': self.id,
            'user': self.user,
            'product': self.product,
            'is_seller': self.is_seller,
        }


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    is_premium = models.BooleanField(default=False)
    premium_categories = models.ManyToManyField(Category, through='PremiumCategory')

    class Meta:
        verbose_name = 'UserProfile'
        verbose_name_plural = 'UserProfiles'

    def to_json(self):
        return {
            'user': self.user,
            'premium': self.is_premium,
            'premium_categories': self.premium_categories,
        }


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    total_price = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        verbose_name = 'Order'
        verbose_name_plural = 'Orders'

    def to_json(self):
        return {
            'id': self.id,
            'user': self.user,
            'product': self.product,
            'quantity': self.quantity,
            'total_price': self.total_price,
        }


class PremiumCategory(models.Model):
    user_profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    class Meta:
        verbose_name = 'PremiumCategory'
        verbose_name_plural = 'PremiumCategories'

    def to_json(self):
        return {
            'user_profile': self.user_profile,
            'category': self.category,
        }


class Payment(models.Model):
    stripe_charge_id = models.CharField(max_length=50)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    amount = models.FloatField()
    timestamp = models.DateTimeField(auto_now_add=True)


class ActiveProductManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(is_active=True)
