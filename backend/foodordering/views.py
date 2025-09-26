from django.shortcuts import render
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate
from rest_framework.response import Response
from .models import *

# Create your views here.

@api_view(['POST']) # django rest framework
def admin_login_api(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username,password=password)

    if user is not None and user.is_staff:
        return Response({"message":"Login Successful","username":username},status=200)
    return Response({"message":"Invalid Credentials"},status=401)


@api_view(['POST']) 
def add_category(request):
    category_name = request.data.get('category_name')


    Category.objects.create(category_name=category_name)
    return Response({"message":"Category has been created"},status=201)

