from django.conf.urls import url, include

from .views import (
	ClientlistViewSet,
	ClientlistDetailsViewSet,
	SalesStageListView,
	SalesStageListView,
	SalesStageEditView,
	SalesSubListView,
	SalesSubEditView
	)

urlpatterns = [

    url(r'^clientlist/$', ClientlistViewSet.as_view(), name="client_create"),
    url(r'^clientlist/(?P<pk>[0-9]+)/$', ClientlistDetailsViewSet.as_view(), name="client_details"),

    url(r'^saleslist/$', SalesStageListView.as_view(), name="sales_list"),
    url(r'^saleslist/(?P<pk>[0-9]+)/$', SalesStageEditView.as_view(), name="sales_edit"),

    url(r'^salessublist/$', SalesSubListView.as_view(), name="sales_sublist"),
    url(r'^salessublist/(?P<pk>[0-9]+)/$', SalesSubEditView.as_view(), name="sales_subedit"),
]