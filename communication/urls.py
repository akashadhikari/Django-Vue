from . import views
from django.conf.urls import url
from .views import BaseTreeNodeView, CategoryNodeView

app_name = 'communication'
urlpatterns = [

    url(r'^processlist/$', BaseTreeNodeView.as_view(), name="processlist"),
    # url(r'^processlist/(?P<pk>[0-9]+)/$', BaseTreeNodeDetailsView.as_view(), name='processdetail'),
    url(r'^categories/$', CategoryNodeView.as_view(), name="categories"),
    # url(r'^categories/(?P<pk>[0-9]+)/$', CategoryNodeDetailsView.as_view(), name='categoriesdetail'),
]