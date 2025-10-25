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

        
    
class OrderAddressSerializer(serializers.ModelSerializer):
    payment_mode = serializers.SerializerMethodField()
    class Meta:
        model = OrderAddress
        fields = ['order_number','address','order_time','order_final_status','payment_mode']

    def get_payment_mode(self,obj):
        try:
            payment = PaymentDetail.objects.get(order_number = obj.order_number)
            return payment.payment_mode
        except PaymentDetail.DoesNotExist:  
            return None  
        

    
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','first_name','last_name','email','mobile','reg_date']

    
class OrderSummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderAddress
        fields = ['id','order_number','order_time']
    

class OrderDetailSerializer(serializers.ModelSerializer):
    user_first_name = serializers.CharField(source='user.first_name')
    user_last_name = serializers.CharField(source='user.last_name')
    user_email = serializers.CharField(source='user.email')
    user_mobile = serializers.CharField(source='user.mobile')

    class Meta:
        model = OrderAddress
        fields = ['order_number','order_time','order_final_status','address','user_first_name','user_last_name','user_email','user_mobile']


class OrderedFoodSerializer(serializers.ModelSerializer):
    item_name = serializers.CharField(source='food.item_name')
    item_price = serializers.CharField(source='food.item_price')
    image = serializers.ImageField(source='food.image')

    class Meta:
        model = Order
        fields = ['item_name','item_price','image']



class FoodTrackingSerializer(serializers.ModelSerializer):

    class Meta:
        model = FoodTracking
        fields = ['remark','status','status_date','order_cancelled_by_user']

class WishlistSerializer(serializers.ModelSerializer):
    item_name = serializers.CharField(source='food.item_name')
    item_price = serializers.CharField(source='food.item_price')
    item_description = serializers.CharField(source='food.item_description')
    image = serializers.ImageField(source='food.image')

    class Meta:
        model = Wishlist
        fields = ['food_id','item_name','item_price','item_description','image']
