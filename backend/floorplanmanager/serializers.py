from rest_framework import serializers
from .models import User, FloorPlan

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'user_name', 'password')

class FloorPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = FloorPlan
        fields = ('id', 'user_id', 'title', 'height', 'width', 'room_length')
