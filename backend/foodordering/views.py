from django.shortcuts import render
from rest_framework.decorators import api_view, parser_classes
from django.contrib.auth import authenticate
from rest_framework.response import Response
from .models import *
from .serializers import *
from rest_framework.parsers import MultiPartParser, FormParser
import random
from django.contrib.auth.hashers import make_password
from django.db.models import Q
from django.contrib.auth.hashers import check_password
from django.shortcuts import get_object_or_404

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

#Search page
@api_view(['GET'])
def foods_search(request):
    query = request.GET.get('q','')
    foods = Food.objects.filter(item_name__icontains=query) #__icontains -> check substring
    serializer = foodSerializer(foods,many=True)
    return Response(serializer.data)

#Home page product
@api_view(['GET']) 
def random_foods(request):
    foods = list(Food.objects.all())
    random.shuffle(foods)
    limited_foods = foods[0:9]
    serializer = foodSerializer(limited_foods,many=True)
    return Response(serializer.data)

# Register user
@api_view(['POST'])
def register(request):
    first_name = request.data.get('first_name')
    last_name = request.data.get('last_name')
    email = request.data.get('email')
    mobile = request.data.get('mobile')
    password = request.data.get('password')
    if User.objects.filter(email=email).exists() or User.objects.filter(mobile=mobile).exists():
        return Response({"message":"Email or Mobile already registered"},status=400)
    User.objects.create(first_name=first_name,last_name=last_name,email=email,mobile=mobile,password = make_password(password))
    return Response({"message":"User Registered Successfully"},status=201)

# User Login
@api_view(['POST'])
def login(request):
    emailcont = request.data.get('emailcont')
    password = request.data.get('password')

    try:
        user = User.objects.get(Q(email=emailcont) | Q(mobile=emailcont))
        if check_password(password,user.password):
            return Response({"message":"Login successful","userId":user.id,"userName":f'{user.first_name} {user.last_name}'},status=200)
        else:
            return Response({"message":"Invalid Creadential"},status=401)
    except:
        return Response({"message":"User not found"},status=404)
    

# Food Detail
@api_view(['GET']) 
def food_detail(request,id):
    # food = Food.objects.get(id=id)
    food = get_object_or_404(Food,id=id)
    serializer = foodSerializer(food)
    return Response(serializer.data)

# Add to cart
@api_view(['POST'])
def add_to_cart(request):
    user_id = request.data.get('userId')
    food_id = request.data.get('foodId')

    try:
        user = User.objects.get(id=user_id)
        food = Food.objects.get(id=food_id)

        order, created = Order.objects.get_or_create(
            user=user,
            food=food,
            is_order_placed=False,
            defaults={'quantity': 1}
        )

        if not created:
            order.quantity += 1
            order.save()

        return Response({"message": "Food added to cart successfully"}, status=200)

    except User.DoesNotExist:
        return Response({"message": "User not found"}, status=404)
    except Food.DoesNotExist:
        return Response({"message": "Food not found"}, status=404)
    except Exception as e:
        print("Add to cart error:", e)  # logs error in console
        return Response({"message": "Something went wrong"}, status=500)

    
# Cart page
@api_view(['GET']) 
def get_cart_item(request,user_id):
    orders = Order.objects.filter(user_id=user_id,is_order_placed=False).select_related('food')
    serializer = CartOrderSerializer(orders,many=True)
    return Response(serializer.data)

# update cart quantity
@api_view(['PUT'])
def update_cart_quantity(request):
    order_id = request.data.get('orderId')
    quantity = request.data.get('quantity')

    try:
        order = Order.objects.get(id=order_id,is_order_placed=False)
        order.quantity = quantity
        order.save()

        return Response({"message":"Quantity updated successfull"},status=200)
    except:
        return Response({"message":"Something went wrong"},status=404)
    
# Delete Cart Item
@api_view(['DELETE'])
def delete_cart_item(request,order_id):
    try:
        order = Order.objects.get(id=order_id,is_order_placed=False)
        order.delete()

        return Response({"message":"Item Deleted successfull"},status=200)
    except:
        return Response({"message":"Something went wrong"},status=404)

# place order 
def make_unique_order_number():
    while True:
        num = str(random.randint(100000000,999999999))
        if not OrderAddress.objects.filter(order_number=num).exists():
            return num 


@api_view(['POST'])
def place_order(request):
    user_id = request.data.get('userId')
    address = request.data.get('address')
    payment_mode = request.data.get('paymentMode')
    card_number = request.data.get('cardNumber')
    expiry = request.data.get('expiry')
    cvv = request.data.get('cvv')

    try:
        order = Order.objects.filter(user_id=user_id,is_order_placed=False)

        order_number = make_unique_order_number()

        order.update(order_number=order_number,is_order_placed=True)

        OrderAddress.objects.create(
            user_id = user_id,
            order_number = order_number,
            address = address
        )

        PaymentDetail.objects.create(
            user_id = user_id,
            order_number = order_number,
            payment_mode = payment_mode,
            card_number = card_number if payment_mode == "online" else None,
            expiry_date = expiry if payment_mode == "online" else None,
            cvv = cvv if payment_mode == "online" else None,
        )

        return Response({"message":f'Order Placed Successfully! Order No: {order_number}'},201)

    except:
        return Response({"message":"Something went wrong"},404)
    

    
# My orders page
@api_view(['GET']) 
def user_orders(request,user_id):
    orders = OrderAddress.objects.filter(user_id=user_id).order_by('-id')
    serializer = MyOrdersListSerializer(orders,many=True)
    return Response(serializer.data)

# order Detail page
@api_view(['GET']) 
def order_by_order_number(request,order_number):
    orders = Order.objects.filter(order_number=order_number,is_order_placed=True).select_related('food')
    serializer = OrderSerializer(orders,many=True)
    return Response(serializer.data)


# Order Address 
@api_view(['GET']) 
def get_order_address(request,order_number):
    address = OrderAddress.objects.get(order_number=order_number)
    serializer = OrderAddressSerializer(address)
    return Response(serializer.data)

# order Invoice
def get_invoice(request,order_number):
    orders = Order.objects.filter(order_number=order_number,is_order_placed=True).select_related('food')
    address = OrderAddress.objects.get(order_number=order_number)

    grand_total = 0
    order_data = []

    for order in orders:
        total_price = order.food.item_price * order.quantity
        grand_total += total_price
        order_data.append({
            'food':order.food,
            'quantity':order.quantity,
            'total_price':total_price
        })

    return render(request,'invoice.html',{
        'order_number':order_number,
        'address':address,
        'grand_total':grand_total,
        'orders':order_data
    })


# Profile page 
@api_view(['GET']) 
def get_user_profile(request,user_id):
    user = User.objects.get(id=user_id)
    serializer = UserSerializer(user)
    return Response(serializer.data)


# Profile update  
@api_view(['PUT']) 
def update_user_profile(request,user_id):
    user = User.objects.get(id=user_id)
    serializer = UserSerializer(user,data=request.data,partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response({"message":'Profile Updated Successfully!'},status=200)
    return Response(serializer.errors,status=400)


# Change Password  
@api_view(['POST']) 
def change_password(request,user_id):
    current_password = request.data.get('current_password')
    new_password = request.data.get('new_password')
    user = User.objects.get(id=user_id)

    if not check_password(current_password,user.password):
        return Response({"message":'Current password is inncorect'},status=400)
    

    user.password = make_password(new_password)
    user.save()
    return Response({"message":'Password changed successfully!'},status=200)


# Order Not confirmed (admin)
@api_view(['GET'])
def orders_not_confirmed(request):
    orders = OrderAddress.objects.filter(order_final_status__isnull=True).order_by('-order_time')
    serializer = OrderSummarySerializer(orders,many=True)
    return Response(serializer.data)

# Order confirmed (admin)
@api_view(['GET'])
def orders_confirmed(request):
    orders = OrderAddress.objects.filter(order_final_status="Order Confirmed").order_by('-order_time')
    serializer = OrderSummarySerializer(orders,many=True)
    return Response(serializer.data)

# Food being prepared (admin)
@api_view(['GET'])
def food_being_prepared(request):
    orders = OrderAddress.objects.filter(order_final_status="Food being Prepared").order_by('-order_time')
    serializer = OrderSummarySerializer(orders,many=True)
    return Response(serializer.data)

# Food Pickup (admin)
@api_view(['GET'])
def food_pickup(request):
    orders = OrderAddress.objects.filter(order_final_status="Food Pickup").order_by('-order_time')
    serializer = OrderSummarySerializer(orders,many=True)
    return Response(serializer.data)

# Food Delivered (admin)
@api_view(['GET'])
def food_delivered(request):
    orders = OrderAddress.objects.filter(order_final_status="Food Delivered").order_by('-order_time')
    serializer = OrderSummarySerializer(orders,many=True)
    return Response(serializer.data)

# Order Cancelled (admin)
@api_view(['GET'])
def order_cancelled(request):
    orders = OrderAddress.objects.filter(order_final_status="Food cancelled").order_by('-order_time')
    serializer = OrderSummarySerializer(orders,many=True)
    return Response(serializer.data)

# All Orders
@api_view(['GET'])
def all_orders(request):
    orders = OrderAddress.objects.all().order_by('-order_time')
    serializer = OrderSummarySerializer(orders,many=True)
    return Response(serializer.data)

# Between Date Orders
@api_view(['POST'])
def order_between_dates(request):
    from_date = request.data.get('from_date')
    to_date = request.data.get('to_date')
    status = request.data.get('status')

    orders = OrderAddress.objects.filter(order_time__date__range=[from_date,to_date])
    if status == 'not_confirmed':
        orders = orders.filter(order_final_status__isnull=True)
    elif status != 'all':
        orders = orders.filter(order_final_status=status)

    serializer = OrderSummarySerializer(orders.order_by('-order_time'),many=True)

    return Response(serializer.data)

# View Detail of Order
@api_view(['GET'])
def view_order_detail(request,order_number):

    try:
        order_address = OrderAddress.objects.select_related('user').get(order_number=order_number)
        ordered_foods = Order.objects.filter(order_number=order_number).select_related('food')
        tracking = FoodTracking.objects.filter(order__order_number=order_number)
    except:
        return Response({'error':'Something went wrong'},status=404)
    
    return Response({
        'order':OrderDetailSerializer(order_address).data,
        'foods':OrderedFoodSerializer(ordered_foods,many=True).data,
        'tracking':FoodTrackingSerializer(tracking,many=True).data,
    })
    


# Update order status
@api_view(['POST'])
def update_order_status(request):
    order_number = request.data.get('order_number')
    new_status = request.data.get('status')
    remark = request.data.get('remark')

    try:
        address = OrderAddress.objects.get(order_number=order_number)
        order = Order.objects.filter(order_number=order_number).first()
        if not order:
            return Response({'error':'Order not found'},status=404)
        FoodTracking.objects.create(order=order,remark=remark,status=new_status,order_cancelled_by_user=False)
        address.order_final_status = new_status
        address.save()
        return Response({'message':'Order status updated successfully'})
    except OrderAddress.DoesNotExist:
        return Response({'error':'Invalid Order number'},status=400)


# Search orders
@api_view(['GET'])
def search_orders(request):
    query = request.GET.get('q','')
    if query:
        orders = OrderAddress.objects.filter(order_number__icontains=query).order_by('-order_time')
    else:
        orders = []
    serializer = OrderSummarySerializer(orders,many=True)
    return Response(serializer.data)


# Manage Category Edit and delete
@api_view(['GET','PUT','DELETE']) 
def category_detail(request,id):
    try:
        category = Category.objects.get(id=id)
    except Category.DoesNotExist:
        return Response({'error':'Category Not Found'},404)
    
    if request.method == 'GET':
        serializer = CategorySerializer(category)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = CategorySerializer(category,data=request.data)
        if serializer.is_valid():
            serializer.save()
        return Response({'message':'Category updated successfully!'},200)
    elif request.method == 'DELETE':
        category.delete()
        return Response({'message':'Category Deleted successfully!'},200)
    