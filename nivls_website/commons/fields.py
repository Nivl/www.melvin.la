from django.db import models
from widgets import ColorPickerWidget, CroppedImageWidget
from django.core.exceptions import ValidationError

class ColorField(models.CharField):
    def __init__(self, *args, **kwargs):
        kwargs['max_length'] = 10
        super(ColorField, self).__init__(*args, **kwargs)

    def formfield(self, **kwargs):
        kwargs['widget'] = ColorPickerWidget
        return super(ColorField, self).formfield(**kwargs)

class CroppedImageField(models.CharField):
    def __init__(self
                 , image, ratio, min_size=(0,0), max_size=(0,0)
                 , initial=((0,0), (0,0)), *args, **kwargs):
        kwargs['max_length'] = 255
        super(CroppedImageField, self).__init__(*args, **kwargs)

    def formfield(self, **kwargs):
        kwargs['widget'] = CroppedImageWidget
        return super(CroppedImageField, self).formfield(**kwargs)
