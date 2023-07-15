from model_bakery import baker
from django.contrib.auth.models import User
import pytest
from todo.models import Todo
from rest_framework.test import APIRequestFactory
from rest_framework.test import force_authenticate
from todo.views import TodoViewSet
from rest_framework.test import APIClient

# TODO: need to test modified_by, in update and partial_update
# but user todo sharing is not yet implemented.


factory = APIRequestFactory()
view = TodoViewSet.as_view({
    'get': 'list',
    "post": "create",
    "put": "update",
    "patch": "partial_update",
    "delete": "destroy",
})
view_retrive =  TodoViewSet.as_view({
    "get": "retrieve",
})

class TestTodoViewset:
    @pytest.mark.django_db(True)
    def test_queryset_owner_get_owned_todos(self):
        user1 = baker.make(User, username="user1")
        user2 = baker.make(User, username="user2")

        baker.make(Todo, created_by=user1)
        baker.make(Todo, created_by=user1)
        baker.make(Todo, created_by=user1)
    
        baker.make(Todo, created_by=user2)

        request = factory.get('api/v1/todo/')
        force_authenticate(request, user=user1)
        response = view(request)
        assert response.data['count'] == 3

        request = factory.get('api/v1/todo/')
        force_authenticate(request, user=user2)
        response = view(request)
        assert response.data['count'] == 1
    
    @pytest.mark.django_db(True)
    def test_queryset_not_logged_get_none(self):
        user1 = baker.make(User, username="user1")
        user2 = baker.make(User, username="user2")

        baker.make(Todo, created_by=user1)
        baker.make(Todo, created_by=user1)
        baker.make(Todo, created_by=user1)
    
        baker.make(Todo, created_by=user2)

        request = factory.get('api/v1/todo/')
        with pytest.raises(TypeError):
            response = view(request)

    @pytest.mark.django_db(True)
    def test_create_todo_has_created_by(self):
        user = baker.make(User, username="user")

        client = APIClient()
        client.force_authenticate(user=user)
        response = client.post('/api/v1/todo/', {'title': 'test todo created by'}, format='json')

        assert response.data['created_by'] == user.id
        assert response.data['modified_by'] == user.id

    @pytest.mark.django_db(True)
    def test_todo_is_only_modifiable_by_creator(self):
        user = baker.make(User, username="user")
        user2 = baker.make(User, username="user2")

        client = APIClient()
        client.force_authenticate(user=user)
        response = client.post('/api/v1/todo/', {'title': 'test todo modified by'}, format='json')

        todo_id = response.data['id']

        client.logout()
        client.force_authenticate(user=user2)
        response = client.patch(
            '/api/v1/todo/' + str(todo_id) + '/',
            {'title': 'test todo modified by'},
            format='json'
        )

        assert response.status_code == 404

    @pytest.mark.django_db(True)
    def test_todo_is_only_readable_by_creator(self):
        user = baker.make(User, username="user")
        user2 = baker.make(User, username="user2")

        client = APIClient()
        client.force_authenticate(user=user)
        response = client.post('/api/v1/todo/', {'title': 'test todo modified by'}, format='json')

        todo_id = response.data['id']

        client.logout()
        client.force_authenticate(user=user2)
        response = client.get('/api/v1/todo/' + str(todo_id) + '/')

        assert response.status_code == 404