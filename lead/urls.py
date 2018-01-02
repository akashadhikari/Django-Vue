from django.conf.urls import url
from .views import ProcessListViewSet, ProcessDetailsViewSet, StatsViewSet, ProcessPandasView
from django.conf.urls import include

app_name = 'lead'
urlpatterns = [
    url(r'^processlist/$', ProcessListViewSet.as_view(), name="Processlist"),
    url(r'^processlist/(?P<pk>[0-9]+)/$', ProcessDetailsViewSet.as_view(), name='Processdetail'),
    url(r'^data', ProcessPandasView.as_view()),
    url(r'^stats', StatsViewSet.as_view(), name="stats"), # Pi Chart Stats
]
