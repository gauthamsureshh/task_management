from django.contrib.auth import authenticate,logout
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from .models import Tasks,AssignedTask
from .forms import RegisterForm
from .serializers import TaskSerializer,AssignedSerializer,UserSerializer
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework.status import HTTP_400_BAD_REQUEST,HTTP_404_NOT_FOUND,HTTP_200_OK,HTTP_401_UNAUTHORIZED
from rest_framework.authtoken.models import Token

#api to register new user
@api_view(['POST'])
@permission_classes((AllowAny,))
def register(request):
    form=RegisterForm(data=request.data)
    if form.is_valid():
        form.save()
        return Response("Account Created Successfully",status=status.HTTP_201_CREATED)
    return Response(form.errors,status=status.HTTP_400_BAD_REQUEST)

#api to login registered user
@api_view(['POST'])
@permission_classes((AllowAny,))
def login(request):
    username=request.data.get('username')
    password=request.data.get('password')
    if not username or not password:
        context={'error':'Provide Username and Password'}
        return Response(context,status=HTTP_400_BAD_REQUEST)
    user=authenticate(username=username,password=password)
    if not user:
        context={'error':'Invalid Credentials'}
        return Response(context,status=HTTP_400_BAD_REQUEST)
    token,_=Token.objects.get_or_create(user=user)
    context={'token':token.key,'id':user.id}
    return Response(context,status=HTTP_200_OK)

#api to create new tasks
@api_view(['POST'])
@permission_classes([AllowAny,])
def create_task(request):
    if request.method=='POST':
        serializer=TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
#api to get all the tasks listed on database
@api_view(['GET'])
@permission_classes([AllowAny,])
def get_task(request):
    task=Tasks.objects.all()
    serializer=TaskSerializer(task,many=True)
    return Response(serializer.data)


#api to return all the users in database
@api_view(['GET'])
@permission_classes([AllowAny,])
def all_user(request):
    users=User.objects.all()
    serializer=UserSerializer(users, many=True)
    return Response(serializer.data)
    
#api to assign a task to user
@api_view(['POST'])
@permission_classes([AllowAny,])
def assign_task(request):
    if request.method=='POST':
        serializer=AssignedSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
#api to list all the assigned tasks to a particular user
@api_view(['GET'])
@permission_classes((AllowAny,))
def list_task(request,id):
    user_task=AssignedTask.objects.filter(user_id=id)
    task_ids=user_task.values_list('task_id',flat=True)
    tasks=Tasks.objects.filter(id__in=task_ids)
    serializer=TaskSerializer(tasks,many=True)
    
    #Calculate counts
    total_task=tasks.count()
    completed_task=tasks.filter(status='Completed').count()
    in_progress=tasks.filter(status='InProgress').count()
    
    response_data={
        'tasks':serializer.data,
        'total_task':total_task,
        'completed_task':completed_task,
        'in_progress':in_progress
    }
    
    return Response(response_data,status=status.HTTP_200_OK)

#api to perform logout
@api_view(['POST'])
@permission_classes((AllowAny,))
def log_out(request):
    logout(request)
    context={'details':'Logged Out'}
    return Response(context,status=status.HTTP_200_OK)

#api to delete a particular task
@api_view(['DELETE'])
@permission_classes((AllowAny,))
def del_task(request,id):
    task=Tasks.objects.get(id=id)
    task.delete()
    return Response("Task Deleted")

#api to edit a particular task
@api_view(['GET','PUT'])
@permission_classes([AllowAny,])
def edit_task(request,id):
    task=get_object_or_404(Tasks,id=id)
    if request.method=="GET":
        serializer=TaskSerializer(task)
        return Response(serializer.data)
    elif request.method=='PUT':
        serializer=TaskSerializer(task,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)