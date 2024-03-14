from django.db import models
from django.contrib.auth.models import User

class Tasks(models.Model):
    title=models.CharField(max_length=50)
    description=models.CharField(max_length=200)
    due_date=models.DateField()
    status=models.CharField(max_length=50)
    
class AssignedTask(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    task=models.ForeignKey(Tasks,on_delete=models.CASCADE)
    