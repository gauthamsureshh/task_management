from django.urls import path
from . import views

urlpatterns=[
    path('register',views.register),
    path('login',views.login),
    path('createtask',views.create_task),
    path('alluser',views.all_user),
    path('alltask',views.get_task),
    path('assigntask',views.assign_task),
    path('listtask/<int:id>',views.list_task),
    path('logout',views.log_out),
    path('deletetask/<int:id>',views.del_task),
    path('edittask/<int:id>',views.edit_task)
]