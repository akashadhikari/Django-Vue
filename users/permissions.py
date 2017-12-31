from rest_framework import permissions

from .models import RelationUserType


class IsUser(permissions.BasePermission):
    """
    Permission for User to view its details
    """

    def has_object_permission(self, request, view, obj):
        return request.user and (request.user.is_staff or request.user.username == obj.username)

    def has_permission(self, request, view):
        return request.user and (
            request.user.is_staff or request.user.is_authenticated)


class IsManager(permissions.BasePermission):
    """
    Permission if user is manager
    """

    @staticmethod
    def is_manager(user):
        if user.is_authenticated:
            return RelationUserType.objects.get(user=user).type == 'manager'
        else:
            return False

    def has_object_permission(self, request, view, obj):
        return request.user and (
            request.user.is_staff or self.is_manager(request.user))

    def has_permission(self, request, view):
        return request.user and (
            request.user.is_staff or self.is_manager(request.user))
