from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from floorplanmanager import views

router = routers.DefaultRouter()
router.register(r'users', views.UserView, 'user')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
