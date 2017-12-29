from django.conf.urls import url, include
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework.authtoken.views import obtain_auth_token
from .views import ClientCreateView, ClientDetailsView, UserView, UserDetailsView, DetaillistView, DetailEditView, SalesStageListView, SalesStageEditView

urlpatterns = {
	url(r'^auth/', include('rest_framework.urls', namespace='rest_framework')),

    url(r'^clientlist/$', ClientCreateView.as_view(), name="client_create"),
    url(r'^clientlist/(?P<pk>[0-9]+)/$', ClientDetailsView.as_view(), name="client_details"),

    url(r'^detaillist/$', DetaillistView.as_view(), name="detail_list"),
    url(r'^detaillist/(?P<pk>[0-9]+)/$', DetailEditView.as_view(), name="detail_edit"),

    url(r'^saleslist/$', SalesStageListView.as_view(), name="sales_list"),
    url(r'^saleslist/(?P<pk>[0-9]+)/$', SalesStageEditView.as_view(), name="sales_edit"),

    url(r'^users/$', UserView.as_view(), name="users"),
    url(r'users/(?P<pk>[0-9]+)/$', UserDetailsView.as_view(), name="user_details"),

    url(r'^get-token/', obtain_auth_token),
}

urlpatterns = format_suffix_patterns(urlpatterns)