# convert django model to json (serialization)
# convert json to model (deserialization) 

from rest_framework import serializers
from .models import *

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id','category_name','creation_date']

class foodSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.category_name',read_only=True)
    image = serializers.ImageField(required=False)
    is_available = serializers.BooleanField(required=False,default=True)
    class Meta:
        model = Food
        fields = ['id','category','category_name','item_name','item_price','item_description','image','item_quantity','is_available']

class CartOrderSerializer(serializers.ModelSerializer):
    food = foodSerializer()
    class Meta:
        model = Order
        fields = ['id','quantity','food']


class MyOrdersListSerializer(serializers.ModelSerializer):
    order_final_status = serializers.SerializerMethodField()
    class Meta:
        model = OrderAddress
        fields = ['order_number','order_time','order_final_status']

    def get_order_final_status(self,obj):
        return obj.order_final_status or "Waiting for Restaurant confirmation"
    
    
class OrderSerializer(serializers.ModelSerializer):
    food = foodSerializer()
    class Meta:
        model = Order
        fields = ['quantity','food']