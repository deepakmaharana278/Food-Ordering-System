from django.shortcuts import render
from rest_framework.decorators import api_view, parser_classes
from django.contrib.auth import authenticate
from rest_framework.response import Response
from .models import *
from .serializers import *
from rest_framework.parsers import MultiPartParser, FormParser

# Create your views here.
# Admin Login
@api_view(['POST']) # django rest framework
def admin_login_api(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username,password=password)

    if user is not None and user.is_staff:
        return Response({"message":"Login Successful","username":username},status=200)
    return Response({"message":"Invalid Credentials"},status=401)

# Add Category
@api_view(['POST']) 
def add_category(request):
    category_name = request.data.get('category_name')


    Category.objects.create(category_name=category_name)
    return Response({"message":"Category has been created"},status=201)

# Manage Category
@api_view(['GET']) 
def list_category(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories,many=True)
    return Response(serializer.data)

# Add Food Item
@api_view(['POST'])
@parser_classes([MultiPartParser,FormParser])

def add_food_item(request):
    serializer = foodSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message":"Food Item has been added"},status=201)
    return Response({"message":"Something went wrong"},status=400)

# Manage Food 
@api_view(['GET']) 
def list_foods(request):
    foods = Food.objects.all()
    serializer = foodSerializer(foods,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def foods_search(request):
    query = request.GET.get('q','')
    foods = Food.objects.filter(item_name__icontains=query) #__icontains -> check substring
    serializer = foodSerializer(foods,many=True)
    return Response(serializer.data)