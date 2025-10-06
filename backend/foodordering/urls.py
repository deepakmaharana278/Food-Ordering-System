from django.urls import path
from .views import *

urlpatterns = [
    path('admin-login/',admin_login_api),
    path('add-category/',add_category),
    path('manage-category/',list_category),
    path('add-food-item/',add_food_item),
    path('foods/',list_foods),
    path('foods_search/',foods_search),
    path('random_foods/',random_foods),
    path('register/',register),
    path('login/',login),
]