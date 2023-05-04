from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed
from django.contrib import auth
from rest_framework_simplejwt.tokens import RefreshToken, TokenError

from .models import Product, Category, User


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
        extra_kwargs = {'category': {'required': False, 'default': None}}


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class ProductModelSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())
    seller = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = '__all__'

    def get_seller(self, obj):
        return obj.seller.username


class CategoryModelSerializer(serializers.ModelSerializer):
    products = serializers.PrimaryKeyRelatedField(many=True, queryset=Product.objects.all())

    class Meta:
        model = Category
        fields = '__all__'


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=68, min_length=6, write_only=True)

    class Meta:
        model = User
        fields = ['email', 'username', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class LoginSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=68, min_length=6, write_only=True)
    tokens = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['password', 'username', 'tokens']

    def get_tokens(self, obj):
        user = User.objects.get(username=obj['username'])
        refresh = RefreshToken.for_user(user)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token)
        }

    def validate(self, attrs):
        username = attrs.get('username', '')
        password = attrs.get('password', '')
        user = auth.authenticate(username=username, password=password)
        if not user:
            raise AuthenticationFailed('Invalid credentials, try again')
        if not user.is_active:
            raise AuthenticationFailed('Account disabled, contact admin')
        return {
            'username': user.username,
            'tokens': self.get_tokens(attrs)
        }


class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()

    def save(self, **kwargs):
        try:
            RefreshToken(self.token).blacklist()
        except TokenError:
            self.fail('bad_token')
