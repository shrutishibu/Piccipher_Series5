from django.urls import path
from . import views

urlpatterns = [
    path('upload/images', views.upload_image, name='upload_image'),
    path('upload/success/', views.upload_success, name='upload_success'),
    #path('upload_fail/', views.upload_fail, name='upload_fail')
]
