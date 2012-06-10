
/*
  Infos
  -----

  Each function in callbacks['xhr'] take the xhr as argument.

  Example
  -------

  ajaxion('/post/form',
         {
	   'selector': '#my_form',
	   'events': 'submit'
	 },
	 'POST',
	 [
	        {
		  'url': '/blog/my_post/comments/',
		  'callbacks' : [],
		  'visible': false,
		  'selectors' : [
                                  {
				    'current': '#comments'.
				    'target': '*'
		  		    'insert': false
				  }
				]
		},

		{
		  'url': '/blog/my_post/',
		  'callbacks' : [],
		  'visible': true,
		  'selectors' : [
                                  {
				    'current': '#form'.
				    'target': '#form'
		  		    'insert': true
				  }
				]
		},
     	 ],
	 {
	   'success': [{'callback': func, 'force': 0}],
	   'xhr': [func2, func3]
	   'error': [func4, func5]

	 },
	 );

*/

var _Ajaxion_this = '';

function Ajaxion(url, bind, method, to_reload, callbacks) {
    to_reload = typeof to_reload !== 'undefined' ? to_reload : [];
    callbacks = typeof callbacks !== 'undefined' ? callbacks : {};

    _Ajaxion_this = this;

    this.url = url;
    this.bind = bind;
    this.method = method;
    this.to_reload = to_reload;
    this.callbacks = callbacks;
    this.fileUpload = false;
    this.useFormOptions = true;
    this.cache = false;
    this.dataType = 'html';
    this.checkForm = true;
    this.error_msg = gettext('Your action was unable to be executed at this time. We apologise for the inconvenience.');

    this.start = ajaxion_start;
    this._xhr = _ajaxion_xhr;
    this._success = _ajaxion_success;
    this._error = _ajaxion_error;
    this._success_reload_part = _ajaxion_success_reload_part;
}

function ajaxion_start() {
    var obj = this;

    $(this.bind['selector']).bind(this.bind['events'], function() {
	var data = {};
	var contentType = 'application/x-www-form-urlencoded';
	var selector = obj.bind['selector'];

	if (obj.method == 'POST') {
	    data = $(selector).serialize();

	    if (obj.fileUpload) {
		data = new FormData($(selector)[0]);
		contentType = false;
	    }

	    if (obj.useFormOptions) {
		$(selector)
		    .find("button[type='submit']")
		    .button('loading');
	    }
	}

	$.ajax({
	    type: obj.method,
	    url: obj.url,
	    data: data,
	    cache: obj.cache,
	    dataType: obj.dataType,
	    contentType: contentType,
	    processData: obj.fileUpload == false,
	    xhr: obj._xhr,
	    error: obj._error,
	    success: obj._success,
	});
	return false;
    });
}


function _ajaxion_xhr() {
    that = _Ajaxion_this;

    var myXhr = $.ajaxSettings.xhr();

    if ('xhr' in that.callbacks) {
	for (var i=0; i<that.callbacks['xhr'].length; i++) {
	    that.callbacks['xhr'][i](myXhr);
	}
    }
    if (that.fileUpload && that.useFormOptions && myXhr.upload) {
	myXhr.upload.addEventListener('progress', function(e) {
	    if(e.lengthComputable){
		var percent = Math.round(e.loaded * 100 / e.total);
	    	$('form-progress-bar').width(percent + '%');
		if (percent == 100) {
		    $('form-progress').removeClass('active');
		}
	    }
	}, false);
    }
    return myXhr;
}


function _ajaxion_error(XMLHttpRequest, textStatus, errorThrown) {
    that = _Ajaxion_this;
    var selector = that.bind['selector'];

    if ('error' in that.callbacks) {
	for (var i=0; i<that.callbacks['error'].length; i++) {
	    that.callbacks['error'][i](XMLHttpRequest, textStatus,
				       errorThrown);
	}
    }

    if (that.method == 'POST' && that.useFormOptions) {
	$(selector)
	    .find("button[type='submit']")
	    .button('reset')

	$(selector).before('<div class="alert alert-error alert-block fade in"><a class="close" data-dismiss="alert">×</a><h4 class="alert-heading">' + gettext('Error!') + '</h4>' + that.error_msg + '</div>');
    }
}


function _ajaxion_success(html, textStatus) {
    that = _Ajaxion_this;

    var proceed = true;
    var selector = that.bind['selector'];
    if (that.method == 'POST' && that.checkForm) {
	var form = $('<noexists>' + html + '</noexists>').find(selector);
	if (form.text() != '') {
	    proceed = false;
	    $(selector).replaceWith(form);
	}
    }

    if ('success' in that.callbacks) {
	for (var i=0; i<that.callbacks['success'].length; i++) {
	    if (proceed
		|| ('force' in that.callbacks['success'][i]
		 && that.callbacks['success'][i]['force'] == true))
	    that.callbacks['success'][i]['callback'](html, textStatus);
	}
    }

    if (proceed) {
	that._success_reload_part();
    }
}


function _ajaxion_success_reload_part() {
    that = _Ajaxion_this;
    for (var i=0; i<that.to_reload.length; i++) {
	if ('visible' in that.to_reload[i]) {
	    if (that.to_reload[i]['visible']
		&& 'selectors' in that.to_reload[i]) {
		for (var j=0 in that.to_reload[i]['selectors'].length) {
		    var key = that.to_reload[i]['selectors'][j]['current']
		    $(key)
			.html('<img src="' + STATIC_URL + '/commons/img/ajax-loader.gif" alt="' + gettext('loading...') + '" />');
		}
	    }
	}
	_ajaxion_success_reload_part_async_call(i, that);
    }
}


function _ajaxion_success_reload_part_async_call(i, obj) {
    $.get(obj.to_reload[i]['url'], function (data) {
	if ('selectors' in obj.to_reload[i]) {
	    for (var j=0; j<obj.to_reload[i]['selectors'].length; j++) {
		var current = obj.to_reload[i]['selectors'][j]
		var key = current['current']
		var target = current['target']
		var content = (target == '*') ? data : $(data).find(target)
		if ('insert' in current && current['insert'] == false) {
		    $(key).replaceWith(content);
		} else {
		    $(key).html(content);
		}
	    }
	}

	if ('callbacks' in obj.to_reload[i]) {
	    for (var j=0; j<obj.to_reload[i]['callbacks'].length; j++) {
		obj.to_reload[i]['callbacks'][j](data);
	    }
	}
    });
}

function ajaxion_cb_replace(html, textStatus) {
    that = _Ajaxion_this;
    $(that.bind['selector']).replaceWith(html);
}

function ajaxion_cb_push_before(html, textStatus) {
    that = _Ajaxion_this;
    $(that.bind['selector']).before(html);
}