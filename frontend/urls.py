# -*- coding: utf-8 -*-

from django.conf.urls import url
from django.views.generic.base import TemplateView

urlpatterns = [
    url(r'^frontend/$', TemplateView.as_view(template_name='frontend/index.html'), name='vue_index'),
]

