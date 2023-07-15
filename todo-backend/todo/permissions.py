from rest_framework.permissions import BasePermission

class isOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user == obj.created_by
    
    def has_permission(self, request, view):
        return super().has_permission(request, view)
