from datetime import datetime
from django.db import models
from commons.fields import ColorField

class Language(models.Model):
    name  = models.CharField(max_length=255)
    slug  = models.SlugField(unique=True)
    color = ColorField()

    def __unicode__(self):
        return self.name


class Licence(models.Model):
    name        = models.CharField(max_length=50)
    slug        = models.SlugField(unique=True)
    url         = models.URLField()
    image       = models.ImageField(upload_to="lab/licences/"
                                    ,null=True
                                    ,blank=True)

    def __unicode__(self):
        return self.name


class Coworker(models.Model):
    nom         = models.CharField(max_length=50)
    slug        = models.SlugField(unique=True)
    url         = models.URLField(null=True, blank=True)
    image       = models.ImageField(upload_to="lab/coworker/"
                                    ,help_text="126x126"
                                    ,null=True
                                    ,blank=True)


class Project(models.Model):
    name         = models.CharField(max_length=255)
    description  = models.TextField()
    slug         = models.SlugField(unique=True)
    start_date   = models.DateField(default=datetime.now)
    edit_date    = models.DateField(auto_now=True)
    blog_entry   = models.CharField(max_length=255, null=True, blank=True)
    src_url      = models.URLField(null=True, blank=True)
    licence      = models.ForeignKey(Licence)
    demo_link    = models.URLField(null=True, blank=True)
    demo_codebox = models.TextField(null=True, blank=True)
    languages    = models.ManyToManyField(Language,
                                          through='ProjectLanguageRate')
    coworkers    = models.ManyToManyField(Coworker)

    def __unicode__(self):
        return self.name


class ProjectLanguageRate(models.Model):
    language    = models.ForeignKey(Language)
    project     = models.ForeignKey(Project)
    rate        = models.PositiveIntegerField()


class Progression(models.Model):
    desciption  = models.TextField()
    pub_date    = models.DateField(default=datetime.now)
    project     = models.ForeignKey(Project)

    def __unicode__(self):
        return self.pub_date


class Image(models.Model):
    name        = models.CharField(max_length=255)
    desciption  = models.TextField()
    image       = models.ImageField(upload_to="labs/projets/images/")
    project     = models.ForeignKey(Project)

    def __unicode__(self):
        return self.name


class Download(models.Model):
    name          = models.CharField(max_length=50)
    desciption    = models.CharField(max_length=255)
    uploaded_file = models.ImageField(upload_to="labs/projets/downloads/")
    project       = models.ForeignKey(Project)

    def __unicode__(self):
        return self.name


class VideoHost(models.Model):
    name        = models.CharField(max_length=50)
    url         = models.URLField()
    embed_url   = models.URLField()

    def __unicode__(self):
        return self.name


class Video(models.Model):
    name        = models.CharField(max_length=255)
    desciption  = models.TextField()
    code        = models.CharField(max_length=30)
    host        = models.ForeignKey(VideoHost)
    project     = models.ForeignKey(Project)

    def __unicode__(self):
        return self.name