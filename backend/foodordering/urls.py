from django.urls import path
from .views import *

urlpatterns = [
    path('admin-login/',admin_login_api),
]