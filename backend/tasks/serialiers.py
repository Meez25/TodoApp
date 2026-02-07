from .models import Category, Task
from rest_framework import serializers


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name"]


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ["id", "description",
                  "is_completed", "created_at", "category"]
