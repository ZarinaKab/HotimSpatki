import stripe
import json
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status, generics, permissions, serializers
from rest_framework.decorators import api_view
from .models import Product, Category
from .serializers import ProductModelSerializer, CategoryModelSerializer, CategorySerializer, ProductSerializer, \
    LogoutSerializer, LoginSerializer, RegisterSerializer
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response


class ProductListView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    def post(self, request):
        # permission_classes = (IsAuthenticated,)
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)


class ProductListByCategoryView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        category_id = self.kwargs['category_id']
        category = get_object_or_404(Category, pk=category_id)
        return Product.objects.filter(category=category)

class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


    def get(self, request, *args, **kwargs):
        categories = self.get_queryset()
        serializer = self.get_serializer(categories, many=True)
        data = serializer.data
        for category in data:
            products = Product.objects.filter(category_id=category.get('id'), category__is_premium=True)
            product_serializer = ProductSerializer(products, many=True)
            category['products'] = product_serializer.data
        return Response(data)



class CategoryDetail(APIView):
    def get(self, request, pk):
        category = Category.objects.get(pk=pk)
        serializer = CategoryModelSerializer(category)
        return Response(serializer.data)


# class ProductCreateView(APIView):
#     permission_classes = [IsAuthenticated]
#
#     def post(self, request):
#         seller = request.user.userprofile
#         data = request.data.copy()
#         data['seller'] = seller.id
#         serializer = ProductModelSerializer(data=data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def category_list(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)


@api_view(['GET', 'PUT', 'DELETE'])
def ProductDetail(request, pk):
    try:
        prod = Product.objects.get(id=pk)
    except Product.DoesNotExist as e:
        return Response({'message': str(e)}, status=400)

    if request.method == 'GET':
        serializer = ProductSerializer(prod)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = ProductSerializer(instance=prod, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        print(serializer.errors)
        return Response(serializer.errors)
    elif request.method == 'DELETE':
        # permission_classes = (IsAuthenticated,)
        ret = ProductSerializer(prod).data
        prod.delete()
        return Response(ret)

class CategoryDetail(APIView):
    def get(self, request, pk):
        category = Category.objects.get(pk=pk)
        serializer = CategoryModelSerializer(category)
        return Response(serializer.data)


def post(request):
    seller = request.user.userprofile
    data = request.data.copy()
    data['seller'] = seller.id
    serializer = ProductModelSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RegisterView(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request):
        user = request.data
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        user_data = serializer.data
        return Response(user_data, status=status.HTTP_201_CREATED)


class LoginAPIView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return JsonResponse(serializer.data, status=status.HTTP_200_OK)


class LogoutAPIView(generics.GenericAPIView):
    serializer_class = LogoutSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_204_NO_CONTENT)


def createCharge(token):
    charge = stripe.Charge.create(
        amount=500,
        currency='usd',
        description='A Django charge',
        source=token,
        shipping={
            "name": "Jenny Rosen",
            "address": {
                "line1": "510 Townsend St",
                "postal_code": "98140",
                "city": "San Francisco",
                "state": "CA",
                "country": "US",
            },
        }
    )
    return charge


@csrf_exempt
def generateToken(request):
    if request.method == "POST":
        body = json.loads(request.body)
        doe = body['doe']
        month = int(doe.split('/')[0])
        year = int('20{0}'.format(doe.split('/')[1]))
        cardData = {
            "number": body['card'],
            "exp_month": month,
            "exp_year": year,
            "cvc": body['cvc'],
        }
        print(cardData)
        token = stripe.Token.create(
            card=cardData
        )
        charge = createCharge(token.id)
        return JsonResponse({
            "status": charge.status
        })


def CategoryProducts(request, pk):
    class ProductSerializer(serializers.ModelSerializer):
        category = serializers.StringRelatedField(many=True)

        class Meta:
            model = Product
            fields = ['id', 'name', 'description', 'price', 'category', 'inventoryStatus', 'seller', 'buyers', 'image']

    products = Product.objects.filter(category=pk)
    serialized_products = ProductSerializer(products, many=True)
    return JsonResponse(serialized_products.data, safe=False)

