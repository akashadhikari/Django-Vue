from . import views
from django.conf.urls import url
from .views import BaseTreeNodeView

app_name = 'communication'
urlpatterns = [

    url(r'^processlist/$', BaseTreeNodeView.as_view(), name="processlist"),
    # url(r'^processlist/(?P<pk>[0-9]+)/$', BaseTreeNodeDetailsView.as_view(), name='processdetail'),
]