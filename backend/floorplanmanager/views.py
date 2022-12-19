from django.shortcuts import render
from rest_framework import viewsets
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from .serializers import UserSerializer, FloorPlanSerializer
from .models import User, FloorPlan

# Create your views here.

class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.users.all()


class FloorPlanView(viewsets.ModelViewSet):
    serializer_class = FloorPlanSerializer
    queryset = FloorPlan.floor_plans.all()
