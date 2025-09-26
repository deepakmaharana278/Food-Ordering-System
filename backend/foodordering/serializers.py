# convert django model to json (serialization)
# convert json to model (deserialization) 

from rest_framework import serializers
from .models import *

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category()
        fields = ['id','category_name','creation_date']