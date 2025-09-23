from django.db import models

# Create your models here.

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
    
class Category(models.Model):
    category_name = models.CharField(max_length=50)
    creation_date = models.DateTimeField(auto_now_add=True)

    # improve readable
    def __str__(self):
        return {self.category_name}


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