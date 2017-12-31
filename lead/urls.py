from django.conf.urls import url
from .views import ProcessListViewSet, ProcessDetailsViewSet
from django.conf.urls import include

app_name = 'lead'
urlpatterns = [
    url(r'^processlist/$', ProcessListViewSet.as_view(), name="Processlist"),
    url(r'^processlist/(?P<pk>[0-9]+)/$', ProcessDetailsViewSet.as_view(), name='Processdetail'),
]
