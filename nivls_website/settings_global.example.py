# -*- coding: utf-8 -*-
import os

DEBUG = True
TEMPLATE_DEBUG = DEBUG

DOMAIN_NAME = 'localhost:8000'

ROOT_URLCONF = 'nivls_website.urls'

INTERNAL_IPS = ('127.0.0.1',)

DEBUG_TOOLBAR_CONFIG = {
    'INTERCEPT_REDIRECTS': False,
    }

ADMINS = (
    ('admin', 'name@domain.tld'),
)

MANAGERS = ADMINS

AKISMET_API_KEY = "PUT_YOUR_KEY_HERE" # http://akismet.com/get/

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': '',
        'USER': '',
        'PASSWORD': '',
        'HOST': '',
        'PORT': '',
    }
}

USE_TZ = True # django 1.4
TIME_ZONE = 'America/Chicago'
LANGUAGE_CODE = 'en'
DATE_FORMAT = 'F, d Y'
TIME_FORMAT = 'P'
USE_I18N = True
USE_L10N = True

MEDIA_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__),
                                          "..",
                                          "media"))
MEDIA_URL = 'http://media.' + DOMAIN_NAME + '/'

STATIC_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__),
                                           "..",
                                           "static"))
STATIC_URL = 'http://static.' + DOMAIN_NAME + '/'

ADMIN_MEDIA_PREFIX = STATIC_URL + '/admin/'

STATICFILES_DIRS = (
    os.path.abspath(os.path.join(os.getcwd(), "static")),
)

# List of finder classes that know how to find static files in
# various locations.
STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
#    'django.contrib.staticfiles.finders.DefaultStorageFinder',
)

SECRET_KEY = 'dtfgyu&^*(){:"56433RDTF90po;luhsau'

TEMPLATE_LOADERS = (
    'django.template.loaders.filesystem.Loader',
    'django.template.loaders.app_directories.Loader',
#     'django.template.loaders.eggs.Loader',
)

TEMPLATE_CONTEXT_PROCESSORS = (
    'django.contrib.auth.context_processors.auth',
    'django.core.context_processors.debug',
    'django.core.context_processors.i18n',
    'django.core.context_processors.media',
    'django.core.context_processors.static',
    'django.contrib.messages.context_processors.messages',
    )

MIDDLEWARE_CLASSES = (
    'django.middleware.common.CommonMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    #'debug_toolbar.middleware.DebugToolbarMiddleware',
    'sentry.client.middleware.Sentry404CatchMiddleware',
)

TEMPLATE_DIRS = (
    os.path.join(os.path.dirname(os.path.abspath(__file__)), "templates"),
)

INSTALLED_APPS = (
    'django.contrib.markup',
    'django.contrib.humanize',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.sites',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.comments',
    'django.contrib.sitemaps',
#    'debug_toolbar',
    'sentry',
    'sentry.client',
)

DEFAULT_FILE_STORAGE = "commons.storage.UniqueFileSystemStorage"

# A sample logging configuration. The only tangible logging
# performed by this configuration is to send an email to
# the site admins on every HTTP 500 error.
# See http://docs.djangoproject.com/en/dev/topics/logging for
# more details on how to customize your logging configuration.
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'mail_admins': {
            'level': 'ERROR',
            'class': 'django.utils.log.AdminEmailHandler'
        }
    },
    'loggers': {
        'django.request': {
            'handlers': ['mail_admins'],
            'level': 'ERROR',
            'propagate': True,
        },
    }
}
