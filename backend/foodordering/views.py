from django.shortcuts import render
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate
from rest_framework.response import Response

# Create your views here.

@api_view(['POST']) # django rest framework
def admin_login_api(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username,password=password)

    if user is not None and user.is_staff:
        return Response({"message":"Login Successful","username":username},status=200)
    return Response({"message":"Invalid Credentials"},status=401)