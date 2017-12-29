from rest_framework.permissions import BasePermission
from .models import Clientlist

class IsOwner(BasePermission):
    """Custom permission class to allow only Clientlist owners to edit them."""

    def has_object_permission(self, request, view, obj):
        """Return True if permission is granted to the Clientlist owner."""
        if isinstance(obj, Clientlist):
            return obj.owner == request.user
        return obj.owner == request.user