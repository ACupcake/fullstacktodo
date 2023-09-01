from django.db import models
from django.contrib.auth.models import User

class Todo(models.Model):
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=500, null=True)
    done = models.BooleanField(default=False)
    priority = models.IntegerField(default=1)
    created_at = models.DateField(auto_now_add=True)
    modified_at = models.DateField(auto_now=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="created_by")
    modified_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name="modified_by")
    order = models.PositiveIntegerField(default=1)
