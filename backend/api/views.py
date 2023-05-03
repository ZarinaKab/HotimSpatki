import json
from django.http import JsonResponse
from django.views.generic import ListView
from rest_framework.generics import GenericAPIView
from rest_framework import mixins, views

from api.serializers import ProductSerializer, CategorySerializer
from api.models import Product, Category
from rest_framework.response import Response


class VacanciesView(GenericAPIView, mixins.CreateModelMixin, mixins.ListModelMixin):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class VacancyView(GenericAPIView, mixins.RetrieveModelMixin, mixins.DestroyModelMixin, mixins.UpdateModelMixin):
    def get(self, request, id):
        req_com = Product.objects.get(id=id)
        return Response(ProductSerializer(req_com).data)

    def put(self, request, id):
        req_com = Product.objects.get(id=id)
        data = json.loads(request.body)
        req_com.name = data.get('name', req_com.name)
        req_com.description = data.get('description', req_com.description)
        req_com.inventoryStatus = data.get('inventoryStatus', req_com.inventoryStatus)
        req_com.category = data.get('category', req_com.category)
        req_com.save()
        return Response(ProductSerializer(req_com).data)

    def delete(self, request, id):
        req_com = Category.objects.get(id=id)
        temp = req_com
        req_com.delete()
        return Response(CategorySerializer(temp).data)


class VacanciesTop(ListView, views.APIView):

    def get(self, request):
        queryset = Product.objects.all()
        queryset1 = queryset.order_by("-salary")
        return Response(ProductSerializer(queryset1, many=True).data)



class CompaniesView(views.APIView):

    def get(self, request):
        return Response(CategorySerializer(Category.objects.all(), many=True).data)

    def post(self, request):
        data = json.loads(request.body)
        com = Category.objects.create(name=data.get('name', ''))
        return Response(CategorySerializer(com).data)


class CompanyView(views.APIView):
    def get(self, request, id):
        req_com = Category.objects.get(id=id)
        return Response(CategorySerializer(req_com).data)

    def put(self, request, id):
        req_com = Category.objects.get(id=id)
        data = json.loads(request.body)
        req_com.name = data.get('name', req_com.name)
        req_com.save()
        return Response(CategorySerializer(req_com).data)

    def delete(self, request, id):
        req_com = Category.objects.get(id=id)
        temp = req_com
        req_com.delete()
        return Response(CategorySerializer(temp).data)

class CompanyVacanciesView(views.APIView):

    def get(self, request, id):
        return JsonResponse(list(Product.objects.filter(company_id=id).values()), safe=False)
