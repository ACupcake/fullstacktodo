from rest_framework import serializers

from todo.models import Todo


class TodoSerializer(serializers.ModelSerializer):
    created_by_name = serializers.ReadOnlyField(source='created_by.username')
    modified_by_name = serializers.ReadOnlyField(source='modified_by.username')
    order = serializers.IntegerField(required=False)

    class Meta:
        model = Todo
        fields = [
            "id",
            "title",
            "description",
            "done",
            "priority",
            "created_at",
            "modified_at",
            "created_by",
            "created_by_name",
            "modified_by",
            "modified_by_name",
            'order',
        ]
