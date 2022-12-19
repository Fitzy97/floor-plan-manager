from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from .serializers import UserSerializer, FloorPlanSerializer
from .models import User, FloorPlan

class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.users.all()

    def get_queryset(self):
        queryset = User.users.all()
        user_name = self.request.query_params.get('user_name', None)
        password = self.request.query_params.get('password', None)
        if user_name is not None and password is not None:
            return queryset.filter(user_name=user_name, password=password)


class FloorPlanView(viewsets.ModelViewSet):
    serializer_class = FloorPlanSerializer
    queryset = FloorPlan.floor_plans.all()

    def create(self, request, *args, **kwargs):
        user_id = request.data['user_id']
        title = request.data['title']
        height = request.data['height']
        width = request.data['width']
        min_length = request.data['min_length']
        max_length = request.data['max_length']
        max_doors = request.data['max_doors']

        for i in range(min_length, max_length+1):
            if width % i == 0 and height % i == 0:
                num_rooms_wide = width / i
                num_rooms_tall = height / i
                if max_doors > 1 or (num_rooms_wide * num_rooms_tall < 3):
                    data = {
                        'user_id': user_id,
                        'title': title,
                        'height': height,
                        'width': width,
                        'room_length': i
                    }
                    serializer = FloorPlanSerializer(data=data)

                    if serializer.is_valid():
                        serializer.save()
                        return Response(serializer.data, status=status.HTTP_201_CREATED)
                    else:
                        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response(status=status.HTTP_400_BAD_REQUEST)

    def get_queryset(self):
        queryset = FloorPlan.floor_plans.all()
        user = self.request.query_params.get('user', None)
        if user is not None:
            return queryset.filter(user_id=user)
