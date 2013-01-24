import os
from django.db import models
from django.conf import settings
from django.utils.translation import ugettext_lazy as _
from lab.models import Project as LabProject
from commons.models import I18nSite


class NavigationLink(models.Model):
    site = models.ForeignKey(
        I18nSite,
        default=settings.SITE_ID,
        verbose_name=_("site"))

    name = models.CharField(
        max_length=255,
        verbose_name=_("name"))

    description = models.CharField(
        max_length=255,
        verbose_name=_("description"))

    link = models.CharField(
        max_length=255,
        verbose_name=_("link"))

    attributes = models.CharField(
        max_length=255,
        blank=True,
        null=True,
        verbose_name=_("attributes"))

    icon = models.CharField(
        max_length=30,
        verbose_name=_("icon"))

    order = models.PositiveSmallIntegerField(
        default=0,
        verbose_name=_("order"))

    def __unicode__(self):
        return self.name

    class Meta:
        ordering = ["order"]
        verbose_name = _("navigation link")
        verbose_name_plural = _("navigation links")


class Profile(models.Model):
    site = models.OneToOneField(
        I18nSite,
        primary_key=True,
        default=settings.SITE_ID,
        verbose_name=_("site"))

    about_me = models.TextField(
        verbose_name=_("about me"))

    def __unicode__(self):
        return self.site.language

    class Meta:
        verbose_name = _("profile")
        verbose_name_plural = _("profiles")


class ContactLink(models.Model):
    name = models.CharField(
        max_length=255,
        verbose_name=_("name"))

    link = models.URLField(
        verbose_name=_("link"))

    attributes = models.CharField(
        max_length=255,
        blank=True,
        null=True,
        verbose_name=_("attributes"))

    icon = models.CharField(
        max_length=30,
        verbose_name=_("icon"))

    order = models.PositiveSmallIntegerField(
        default=0,
        verbose_name=_("order"))

    def __unicode__(self):
        return self.name

    class Meta:
        ordering = ["order"]
        verbose_name = _("contact link")
        verbose_name_plural = _("contact links")


 ###########################################################################
##                                                                          ##
##                                Work                                      ##
##                                                                          ##
  ###########################################################################

class WorkType(models.Model):
    site = models.ForeignKey(
        I18nSite,
        default=settings.SITE_ID,
        verbose_name=_("site"))

    name = models.CharField(
        max_length=255,
        verbose_name=_("name"))

    slug = models.SlugField(
        verbose_name=_("slug"))

    def __unicode__(self):
        return self.name

    class Meta:
        unique_together = ('site', 'slug')
        verbose_name = _("work Type")
        verbose_name_plural = _("work Types")


class WorkProject(models.Model):
    lab = models.ForeignKey(
        LabProject,
        primary_key=True,
        limit_choices_to={'site': settings.SITE_ID},
        verbose_name=_("lab"))

    order = models.PositiveSmallIntegerField(
        default=0,
        verbose_name=_("order"))

    screenshot = models.ImageField(
        upload_to='about/portfolio/',
        help_text='350x214 px',
        verbose_name=_("screenshot"))

    description = models.TextField(
        verbose_name=_("description"))

    works = models.ManyToManyField(
        WorkType,
        limit_choices_to={'site': settings.SITE_ID},
        verbose_name=_("work"))

    def __unicode__(self):
        return self.lab.name

    def save(self, *arg, **kwargs):
        try:
            origin = WorkProject.objects.get(pk=self.pk)
            if origin.screenshot != self.screenshot:
                if os.path.exists(origin.screenshot.path):
                    os.remove(origin.screenshot.path)
        except WorkProject.DoesNotExist:
            pass
        super(WorkProject, self).save(*arg, **kwargs)

    class Meta:
        ordering = ["order"]
        verbose_name = _("work Project")
        verbose_name_plural = _("work Projects")


  ###########################################################################
##                                                                          ##
##                                  C.V.                                    ##
##                                                                          ##
  ###########################################################################

class CVSection(models.Model):
    site = models.ForeignKey(
        I18nSite,
        default=settings.SITE_ID,
        verbose_name=_("site"))

    name = models.CharField(
        max_length=255,
        verbose_name=_("name"))

    slug = models.SlugField(
        verbose_name=_("slug"))

    order = models.PositiveSmallIntegerField(
        default=0,
        verbose_name=_("order"))

    def __unicode__(self):
        return self.name

    class Meta:
        ordering = ["order"]
        unique_together = ('site', 'slug')
        verbose_name = _("Section")
        verbose_name_plural = _("Sections")


class CVCategory(models.Model):
    DISPLAY_TYPES = (
        ('L', 'List'),
        ('D', 'Description List'),
        ('B', 'Block'),)

    site = models.ForeignKey(
        I18nSite,
        default=settings.SITE_ID,
        verbose_name=_("site"))

    section = models.ForeignKey(
        CVSection,
        limit_choices_to={'site': settings.SITE_ID},
        verbose_name=_("Section"))

    name = models.CharField(
        max_length=255,
        verbose_name=_("name"))

    order = models.PositiveIntegerField(
        verbose_name=_("order"))

    display_type = models.CharField(
        max_length=1,
        default='L',
        choices=DISPLAY_TYPES,
        verbose_name=_("display type"))

    image = models.ImageField(
        upload_to='about/cv/category/',
        null=True,
        blank=True,
        verbose_name=_("image"))

    def __unicode__(self):
        return self.name

    class Meta:
        ordering = ['section', 'order']
        unique_together = (('order', 'section'))
        verbose_name = _("Category")
        verbose_name_plural = _("Categories")


class CVContent(models.Model):
    site = models.ForeignKey(
        I18nSite,
        default=settings.SITE_ID,
        verbose_name=_("site"))

    category = models.ForeignKey(
        CVCategory,
        limit_choices_to={'site': settings.SITE_ID},
        verbose_name=_("category"))

    order = models.PositiveSmallIntegerField(
        default=0,
        verbose_name=_("order"))

    key = models.CharField(
        max_length=255,
        blank=True,
        null=True,
        verbose_name=_("key"))

    value = models.TextField(
        verbose_name=_("value"))

    value_for_download = models.CharField(
        max_length=255,
        blank=True,
        null=True,
        verbose_name=_("value for download"))

    def __unicode__(self):
        return "%s - %s" % (self.key, self.value)

    class Meta:
        ordering = ['order']
        verbose_name = _("Content")
        verbose_name_plural = _("Contents")


class CVDocumentCategory(models.Model):
    site = models.ForeignKey(
        I18nSite,
        default=settings.SITE_ID,
        verbose_name=_("site"))

    name = models.CharField(
        max_length=255,
        verbose_name=_("name"))

    slug = models.SlugField(
        verbose_name=_("slug"))

    order = models.PositiveSmallIntegerField(
        default=0,
        verbose_name=_("order"))

    def __unicode__(self):
        return self.name

    class Meta:
        ordering = ["order"]
        unique_together = ('site', 'name')
        verbose_name = _("Document category")
        verbose_name_plural = _("Documents category")


class CVDocument(models.Model):
    site = models.ForeignKey(
        I18nSite,
        default=settings.SITE_ID,
        verbose_name=_("site"))

    category = models.ForeignKey(
        CVDocumentCategory,
        limit_choices_to={'site': settings.SITE_ID},
        verbose_name=_("category"))

    name = models.CharField(
        max_length=255,
        verbose_name=_("name"))

    order = models.PositiveSmallIntegerField(
        default=0,
        verbose_name=_("order"))

    document = models.FileField(
        upload_to='about/cv/documents/',
        verbose_name=_("document"))

    def __unicode__(self):
        return self.name

    class Meta:
        ordering = ["order"]
        unique_together = ('site', 'name')
        verbose_name = _("Document")
        verbose_name_plural = _("Documents")
