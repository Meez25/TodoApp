from rest_framework import viewsets, mixins
from .serialiers import TaskSerializer, CategorySerializer
from .models import Category, Task
from django.http import JsonResponse


class CategoryViewSet(mixins.ListModelMixin,
                      mixins.CreateModelMixin,
                      viewsets.GenericViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class TaskViewSet(mixins.ListModelMixin,
                  mixins.CreateModelMixin,
                  mixins.UpdateModelMixin,
                  mixins.DestroyModelMixin,
                  viewsets.GenericViewSet):
    """
    ViewSet pour gérer les tâches.
    GET /api/tasks/ - Liste toutes les tâches
    (avec filtre optionnel par catégorie)
    POST /api/tasks/ - Crée une nouvelle tâche
    PATCH /api/tasks/<id>/ - Met à jour une tâche (notamment is_completed)
    DELETE /api/tasks/<id>/ - Supprime une tâche
    """
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    def get_queryset(self):
        """
        Permet de filtrer les tâches par catégorie via le paramètre
        ?category_id=X
        """
        queryset = Task.objects.all().order_by('-created_at')
        category_id = self.request.query_params.get('category_id', None)

        if category_id is not None:
            queryset = queryset.filter(category_id=category_id)

        return queryset


def health_check(request):
    return JsonResponse({"status": "ok", "message": "API is healthy"})


def trigger_error(request):
    """Une vue conçue pour créer une erreur 500."""
    # Cette ligne va inévitablement provoquer une erreur
    division_by_zero = 1 / 0
    return JsonResponse({"this": "will never be returned"})
