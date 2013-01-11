var $ = django.jQuery

$(document).ready(function() {
    var domain_name = window.location.hostname.replace("admin", "blog");

    var pub_date = $('#id_pub_date_0').val().split("/");
    if (pub_date[2] !== undefined) {
        pub_date = pub_date[2] + "/" + pub_date[1] + "/" + pub_date[0];
    } else {
        var pub_date = $('#id_pub_date_0').val().split("-");
        pub_date = pub_date[0] + "/" + pub_date[1] + "/" + pub_date[2];
    }
    var slug = $('#id_slug').val();
    var url = domain_name + '/blog/preview/' + pub_date + "/" + slug + "/";

    $('#id_content')
	.before('<a href="http://' + url + '" target="_blank">Preview</a><br/>');
});
