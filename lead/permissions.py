from rest_framework.permissions import BasePermission
from .models import Process

class IsOwner(BasePermission):
    """Custom permission class to allow only Process owners to edit them."""

    def has_object_permission(self, request, view, obj):
        """Return True if permission is granted to the Process owner."""
        if isinstance(obj, Process):
            return obj.owner == request.user
        return obj.owner == request.user