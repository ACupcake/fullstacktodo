from rest_framework import viewsets
import django_filters.rest_framework
from django.db.models import Max
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status

from todo.models import Todo
from todo.permissions import isOwner
from todo.serializers import TodoSerializer
from rest_framework.permissions import IsAuthenticated

class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    permission_classes = [ isOwner, IsAuthenticated ]
    filter_backends = [
        django_filters.rest_framework.DjangoFilterBackend,
    ]
    filterset_fields = ("done", "id")

    def get_queryset(self):
        queryset = super().get_queryset()
        return queryset.filter(created_by=self.request.user)

    def create(self, request, *args, **kwargs):
        request.data["created_by"] = request.user.id
        request.data["modified_by"] = request.user.id
        return super().create(request, *args, **kwargs)

    def partial_update(self, request, *args, **kwargs):
        request.data["modified_by"] = request.user.id
        return super().partial_update(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        request.data["modified_by"] = request.user.id
        return super().update(request, *args, **kwargs)

    @action(methods=["post"], detail=False, permission_classes=[isOwner])
    def orderOld(self, request, *args, **kwargs):
        # TODO: write tests

        for order in request.data["new_order"]:
            todo = Todo.objects.get(id=request.data["new_order"][order])
            if todo.created_by == request.user:
                todo.order = order
                todo.save()

        return Response(status=status.HTTP_200_OK)

    @action(methods=["post"], detail=False, permission_classes=[isOwner])
    def order(self, request, *args, **kwargs):
        # TODO: write tests

        id_list = request.data["new_order"]
        todo_qs = Todo.objects.filter(created_by=request.user.id)
        todo_qs = todo_qs.filter(pk__in=id_list)

        for todo in todo_qs:
            todo.order = id_list.index(todo.id)

        Todo.objects.bulk_update(todo_qs, ["order"])

        return Response(status=status.HTTP_200_OK)
