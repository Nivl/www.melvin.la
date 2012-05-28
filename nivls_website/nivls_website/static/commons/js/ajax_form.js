function ajax_form(form_selector, form_url, callback, error_msg, remove_form, file_upload, progress_selector) {

    remove_form = typeof remove_form !== 'undefined' ? remove_form : true;
    file_upload = typeof file_upload !== 'undefined' ? file_upload : false;
    progress_selector = typeof progress_selector !== 'undefined' ? progress_selector : 'progress';

    var target_name = form_selector;
    if (target_name[0] == '#' || target_name[0] == '.')
	target_name = target_name.substring(1);

    $(form_selector).submit(function() {
	var form_data = new FormData($(form_selector)[0]);

	$(form_selector)
	    .find("button[type='submit']")
	    .button('loading');

        $.ajax({
            type: "POST",
            data: file_upload ? form_data : $(form_selector).serialize(),
            url: form_url,
            cache: false,
            dataType: "html",
            contentType: file_upload ? false : 'application/x-www-form-urlencoded',
            processData: file_upload != true,

	    xhr: function() {
	    	if (file_upload == false)
	    	    return $.ajaxSettings.xhr();

	    	myXhr = $.ajaxSettings.xhr();
	    	if(myXhr.upload){
                    myXhr.upload.addEventListener('progress', function(e) {
	    		if(e.lengthComputable)
			{
			    var percent = Math.round(e.loaded * 100 / e.total);
	    		    $(progress_selector + '-bar').width(percent + '%');
			    if (percent == 100)
				$(progress_selector).removeClass('active');
			}
	    	    }, false);
	    	}
	    	return myXhr;
            },

            success: function(html, textStatus) {
		var form = $(html).find(form_selector);
		if (form.text() == '') {
		    if (remove_form) {
			$(form_selector).replaceWith(html);
		    } else {
			$(form_selector)
			    .find("button[type='submit']")
			    .button('reset');

			$(form_selector).before(html);
			$(form_selector).replaceWith('<div class="centered-text" id="' + target_name + '"><img src="' + STATIC_URL + '/commons/img/ajax-loader.gif" alt="loading..." /></div>');

			$('<div>').load(form_url.concat(' ', form_selector), function() {
			    $(form_selector).replaceWith($(this).html());
			    callback();
			});
		    }
		} else {
		    $(form_selector).replaceWith(form)
		}
                callback();
	    },

            error: function (XMLHttpRequest, textStatus, errorThrown) {
		$(form_selector)
		    .find("button[type='submit']")
		    .button('reset')

                $(form_selector).before('<div class="alert alert-error alert-block fade in"><a class="close" data-dismiss="alert">×</a><h4 class="alert-heading">{% trans "Error!" %}</h4>' + error_msg + '</div>');
            }
        });
        return false;
    });
}