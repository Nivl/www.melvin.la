from django.conf.urls.defaults import patterns, include, url
from sitemaps import *

sitemaps = {
    'lab_project': ProjectSitemap,
    }

urlpatterns = patterns(
    '',
    url(r'^project/(?P<slug>[-\w]+)/$', 'lab.views.project', name='project'),
)

