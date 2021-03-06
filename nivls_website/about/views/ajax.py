import markdown
from django.conf import settings
from django.shortcuts import render
from django.core.mail import EmailMultiAlternatives
from commons.forms import SingleTextareaForm
from commons.decorators import ajax_only
from commons.views import ajax_get_single_data, ajax_get_form, ajax_get_model_data
from about.models import Profile, WorkProject, NavigationLink, ContactLink
from about.forms import ContactForm, NavigationForm, ContactLinkForm


@ajax_only
def contact_form(request):
    if request.method == 'POST':
        form = ContactForm(request.POST, request=request)
        if form.is_valid():
            md = markdown.Markdown(safe_mode='escape')

            msg = md.convert(form.cleaned_data['message'])
            msg += "\n\n\n" + ('-' * 80)
            msg += "\n\n Ip : " + request.META["REMOTE_ADDR"]

            msg_html = md.convert(form.cleaned_data['message'])
            msg_html += '<br />' + ('-' * 80)
            msg_html += '<br /><br /> Ip : ' + request.META["REMOTE_ADDR"]

            mail = EmailMultiAlternatives(form.cleaned_data['subject'],
                                          msg,
                                          form.cleaned_data['email'],
                                          [row[1] for row in settings.ADMINS])
            mail.attach_alternative(msg_html, 'text/html')
            mail.send()

            return render(request, 'about/contact_ok.haml')
    else:
        form = ContactForm(request=request)

    return render(request, "about/contact_form.haml", {'form': form})


#
# Live Edit
#

# About me
def get_profile_about_me(request, pk):
    return ajax_get_single_data(request, pk, Profile, 'about_me',
                                template_name='ajax/single_field_value_md.haml')


def get_profile_about_me_form(request, pk):
    kwargs = {'attr_name': 'about_me',
              'form_obj': SingleTextareaForm,
              }

    return ajax_get_form(request, Profile, 'about-profile-about-me',
                         pk=pk,
                         perm='about.change_profile',
                         **kwargs)


# Lab descrition
def get_project_description(request, pk):
    return ajax_get_single_data(request, pk, WorkProject, 'description')


def get_project_description_form(request, pk):
    kwargs = {'attr_name': 'description',
              'form_obj': SingleTextareaForm,
              }

    return ajax_get_form(request, WorkProject, 'about-project-description',
                         pk=pk,
                         perm='about.change_project',
                         **kwargs)


# NavigationLink
def get_navigationLink_model(request, pk):
    return ajax_get_model_data(request, pk, NavigationLink,
                               template_name="about/ajax/big_badge.haml")


def get_navigationLink_model_form(request, pk):
    kwargs = {'form_obj': NavigationForm,
              }

    return ajax_get_form(request, NavigationLink, 'about-navigationLink-model',
                         pk=pk,
                         perm='about.change_navigationlink',
                         is_single=False,
                         **kwargs)


# ContactLink
def get_contactLink_model(request, pk):
    return ajax_get_model_data(request, pk, ContactLink,
                               template_name="about/ajax/big_badge.haml")


def get_contactLink_model_form(request, pk):
    kwargs = {'form_obj': ContactLinkForm,
              }

    return ajax_get_form(request, ContactLink, 'about-contactLink-model',
                         pk=pk,
                         perm='about.change_contactlink',
                         is_single=False,
                         **kwargs)
