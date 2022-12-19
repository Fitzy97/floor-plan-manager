from django.db import models

class User(models.Model):
    id = models.BigAutoField(primary_key=True)
    user_name = models.CharField(max_length=120, unique=True)
    password = models.CharField(max_length=120)

    users = models.Manager()

    def _str_(self):
        return self.user_name

class FloorPlan(models.Model):
    id = models.BigAutoField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length = 30, unique=True)
    height = models.IntegerField()
    width = models.IntegerField()
    room_length = models.IntegerField()

    floor_plans = models.Manager()

    def _str_(self):
        return self.title
