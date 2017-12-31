from django.conf.urls import url, include
from rest_framework.authtoken.views import obtain_auth_token
from .views import ClientlistViewSet, ClientlistDetailsViewSet, DetaillistView, DetailEditView, SalesStageListView, SalesStageEditView, SalesSubListView, SalesSubEditView

urlpatterns = [

    url(r'^clientlist/$', ClientlistViewSet.as_view(), name="client_create"),
    url(r'^clientlist/(?P<pk>[0-9]+)/$', ClientlistDetailsViewSet.as_view(), name="client_details"),

    url(r'^detaillist/$', DetaillistView.as_view(), name="detail_list"),
    url(r'^detaillist/(?P<pk>[0-9]+)/$', DetailEditView.as_view(), name="detail_edit"),

    url(r'^saleslist/$', SalesStageListView.as_view(), name="sales_list"),
    url(r'^saleslist/(?P<pk>[0-9]+)/$', SalesStageEditView.as_view(), name="sales_edit"),

    url(r'^salessublist/$', SalesSubListView.as_view(), name="sales_sublist"),
    url(r'^salessublist/(?P<pk>[0-9]+)/$', SalesSubEditView.as_view(), name="sales_subedit"),
]