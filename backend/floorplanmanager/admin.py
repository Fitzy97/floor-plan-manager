from django.contrib import admin
from .models import User

class UserAdmin(admin.ModelAdmin):
    list_display = ('user_name', 'password')

class FloorPlanAdmin(admin.ModelAdmin):
    list_display = ('title', 'user_id')

admin.site.register(User, UserAdmin)
