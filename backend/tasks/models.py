from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=100, unique=True,
                            blank=False, null=False)


class Task(models.Model):
    description = models.TextField(blank=False, null=False)
    is_completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
