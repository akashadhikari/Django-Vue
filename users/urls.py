from django.conf.urls import url
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.routers import DefaultRouter

from .views import UserViewSet, UserCreate

router = DefaultRouter()
router.register(r'', UserViewSet, base_name='user')

urlpatterns = [
    url(r'^create/$', UserCreate.as_view(), name='user-create'),
    url(r'^token-auth/', obtain_auth_token)
]

urlpatterns += router.urls
