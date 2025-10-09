from django.db import models

# Create your models here.
# User model
class User(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(max_length=50,unique=True)
    mobile = models.CharField(max_length=15)
    password = models.CharField(max_length=50)
    reg_date = models.DateTimeField(auto_now_add=True)

    # improve readable
    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    
# Category model
class Category(models.Model):
    category_name = models.CharField(max_length=50)
    creation_date = models.DateTimeField(auto_now_add=True)

    # improve readable
    def __str__(self):
        return self.category_name

# Food model
class Food(models.Model):
    category = models.ForeignKey(Category,on_delete=models.CASCADE)
    item_name = models.CharField(max_length=50)
    item_price = models.DecimalField(max_digits=10,decimal_places=2)
    item_description = models.TextField(max_length=500,null=True,blank=True)
    image = models.ImageField(upload_to='food_images/')
    item_quantity = models.CharField(max_length=50)
    is_available = models.BooleanField(default=True)

    # improve readable
    def __str__(self):
        return f"{self.item_name} ({self.item_quantity})"

# Order model
class Order(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    food = models.ForeignKey(Food,on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    is_order_placed = models.BooleanField(default=False)
    order_number = models.CharField(max_length=100,null=True)

    # improve readable
    def __str__(self):
        return f"{self.order_number} ({self.user})"
    
# Order Address model
class OrderAddress(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    order_number = models.CharField(max_length=100,null=True)
    address = models.TextField()
    order_time = models.DateTimeField(auto_now_add=True)
    order_final_status = models.CharField(max_length=200,null=True)

    # improve readable
    def __str__(self):
        return f"{self.order_number} ({self.user})"
    
# Tracking model
class FoodTracking(models.Model):
    order = models.ForeignKey(Order,on_delete=models.CASCADE)
    remark = models.CharField(max_length=200,null=True)
    status = models.CharField(max_length=200,null=True)
    status_date = models.DateTimeField(auto_now_add=True)
    order_cancelled_by_user = models.BooleanField(null=True)

    # improve readable
    def __str__(self):
        return f"{self.order} - {self.status}"
    
# Payment Detail model
class PaymentDetail(models.Model):
    PAYMENT_CHOICE =[
        ('cod','Cash on Delivery'),
        ('online','Online Payment')
    ]
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    order_number = models.CharField(max_length=100,null=True)
    payment_mode = models.CharField(max_length=20,choices=PAYMENT_CHOICE)
    card_number = models.CharField(max_length=20,null=True,blank=True)
    expiry_date = models.CharField(max_length=10,null=True,blank=True)
    cvv = models.CharField(max_length=5,null=True,blank=True)
    payment_date = models.DateTimeField(auto_now_add=True)

    # improve readable
    def __str__(self):
        return f"{self.order_number} - {self.payment_mode}"
    
    
# Review model
class Review(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    food = models.ForeignKey(Food,on_delete=models.CASCADE)
    rating = models.PositiveIntegerField(default=1)
    comment = models.TextField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    # improve readable
    def __str__(self):
        return f"Review by {self.user.first_name} for {self.food.item_name} - {self.rating} stars"
    
# Wishlist model
class Wishlist(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    food = models.ForeignKey(Food,on_delete=models.CASCADE)
    added_on = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user','food')

    # improve readable
    def __str__(self):
        return f"{self.user.first_name} {self.food.item_name}"