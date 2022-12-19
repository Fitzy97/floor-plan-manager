from django.contrib import admin
from .models import User

class UserAdmin(admin.ModelAdmin):
    list_display = ('user_name', 'password')

# Register your models here.

admin.site.register(User, UserAdmin)