from rest_framework.permissions import BasePermission

class IsOwnerOrReadOnly(BasePermission):
	message = 'So, you wanna edit, huh? Why don\'t you just go to hell?'
	def has_object_permission(self,request, view, obj):
		return obj.user == request.user