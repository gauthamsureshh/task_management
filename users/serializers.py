from rest_framework import serializers
from .models import Tasks,AssignedTask
from django.contrib.auth.models import User

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model=Tasks
        fields='__all__'
class AssignedSerializer(serializers.ModelSerializer):
    class Meta:
        model=AssignedTask
        fields='__all__'
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['id','username']