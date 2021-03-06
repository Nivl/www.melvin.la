from django.conf import settings
from django.contrib.sites.models import Site
from commons.models import SiteAdmin


def app(context):
    return {'STATIC_ROOT': settings.STATIC_ROOT,
            'FB_APP_ID': settings.FACEBOOK_APP_ID,
            'DOMAIN_NAME': Site.objects.get_current().domain,
            'DEBUG': str(settings.DEBUG).lower(),
            'ADMIN': SiteAdmin().get_admin(),
            'BRAND_NAME': settings.BRAND_NAME}
