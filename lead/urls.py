from . import views
from django.conf.urls import url
from .views import ProcessListViewSet, ProcessDetailsViewSet, UserView, UserDetailsView
from django.conf.urls import include
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework.authtoken.views import obtain_auth_token

app_name = 'lead'
urlpatterns = [

    # Here's some API view
    url(r'^auth/', include('rest_framework.urls', namespace='rest_framework')), 
    url(r'^processlist/$', ProcessListViewSet.as_view(), name="Processlist"),
    url(r'^processlist/(?P<pk>[0-9]+)/$', ProcessDetailsViewSet.as_view(), name='Processdetail'),
    url(r'^users/$', UserView.as_view(), name="users"),
    url(r'users/(?P<pk>[0-9]+)/$', UserDetailsView.as_view(), name="user_details"),
    url(r'^get-token/', obtain_auth_token),
]

urlpatterns = format_suffix_patterns(urlpatterns)