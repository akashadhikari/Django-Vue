from . import views
from django.conf.urls import url
from .views import ProcessListViewSet, ProcessDetailsViewSet

app_name = 'lead'
urlpatterns = [

    # Here's some API view
    url(r'^processlist/$', ProcessListViewSet.as_view(), name="Processlist"),
    url(r'^processlist/(?P<pk>[0-9]+)/$', ProcessDetailsViewSet.as_view(), name='Processdetail'),
]