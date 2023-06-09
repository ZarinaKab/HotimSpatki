from django.urls import path, re_path
from rest_framework_jwt.views import obtain_jwt_token
from rest_framework.authtoken.views import obtain_auth_token

from . import views
from .views import (ProductListView, ProductDetail, CategoryDetail, ProductListByCategoryView, category_list,
                    CategoryProducts)

urlpatterns = [
    # path('register/', views.RegisterView.as_view(), name="register"),
    # path('login/', views.LoginAPIView.as_view(), name="login"),
    # path('login/', obtain_auth_token),
    path('login/', obtain_jwt_token),
    path('logout/', views.LogoutAPIView.as_view(), name="logout"),
    path('products/', ProductListView.as_view(), name='product-list'),
    path('categories/', category_list, name='category-list'),
    path('products/<int:pk>/', ProductDetail, name='product-detail'),
    path('categories/<int:pk>/', CategoryDetail.as_view(), name='category-detail'),
    # path('products/create/', ProductCreateView.as_view(), name='product-create'),
    # path('charge/', views.charge, name='charge'),
    path('categories/<int:pk>/products/', CategoryProducts, name='product_list_by_category'),
    # path('pay', views.generateToken)
]