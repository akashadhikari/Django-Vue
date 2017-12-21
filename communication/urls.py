from . import views
from django.conf.urls import url
from .views import ProcessListViewSet, ProcessDetailsViewSet, PurposeListViewSet, PurposeDetailsViewSet

app_name = 'communication'
urlpatterns = [

    # Here's some API view
    url(r'^processlist/$', ProcessListViewSet.as_view(), name="Processlist"),
    url(r'^processlist/(?P<pk>[0-9]+)/$', ProcessDetailsViewSet.as_view(), name='Processdetail'),
    url(r'^purposelist/$', PurposeListViewSet.as_view(), name="Purposelist"),
    url(r'^purposelist/(?P<pk>[0-9]+)/$', PurposeDetailsViewSet.as_view(), name='Purposedetail'),

]