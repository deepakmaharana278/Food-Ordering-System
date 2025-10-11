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
    path('foods/<int:id>/',food_detail),
    path('add-cart/',add_to_cart),
    path('cart/<int:user_id>/',get_cart_item),
    path('cart/update-quantity/',update_cart_quantity),
    path('cart/delete_item/<int:order_id>/',delete_cart_item),
    path('place_order/',place_order),
    path('orders/<int:user_id>/',user_orders),
    path('orders/by_order_number/<str:order_number>/',order_by_order_number),
    path('order_address/<str:order_number>/',get_order_address),
    path('invoice/<str:order_number>/',get_invoice),
]