/*jslint browser:true */
/*global $, django_js_utils, ajaxPost, ajaxFormUpload */
/*global addCommentAjax, ajaxSwitchElem, ajaxCb_pushBefore, confirmPasswordAjax */
/*global STATIC_URL */


/*
    ajaxPost            : utils.js
    ajaxFormUpload      : utils.js
    ajaxSwitchElem      : utils.js
    ajaxCb_pushBefore   : utils.js

    addCommentAjax      : /blog/inc/comment_ajax.haml
    confirmPasswordAjax : /users/inc/password_confirm_ajax.haml
*/


// Callbacks

$(document).on('hidden.bs.modal', '[id^=modal-edit-]', function () {
    'use strict';

    var target = $(this).find('[id^=edit-][id$=-form]');
    target.replaceWith('<div class="loading" id="' + target.prop('id') + '"><img src="' + STATIC_URL + '/commons/img/loading-small.gif" alt="loading..."></div>');
});


// HELPERS

function clearError(that) {
    'use strict';

    $(that).find('.modal-content').css('background-color', '#fff');
}

function hideOnSuccess(that) {
    'use strict';

    $(that).parents('.modal').modal('hide');
}

function colorOnError(that) {
    'use strict';

    $(that).parents('.modal-content').css('background-color', '#f2dede');
}


/******************************************************************************
 * Contact
 *****************************************************************************/

var resolve_urls = django_js_utils.urls.resolve;

$(document).on('submit', '#contact-form', function () {
    'use strict';

    var that = this;

    ajaxPost(
        resolve_urls('contact-form'),
        '#contact-form',
        function (data, proceed) {
            if (proceed) {
                $(that).before(data);
                $.jStorage.deleteKey('contact-message');

                ajaxSwitchElem(
                    resolve_urls('contact-form'),
                    '#contact-form',
                    '*'
                );
            }
        },
        function () {
            ajaxCb_pushBefore(that);
        }
    );
    return false;
});

$(document).on('submit', '#comment-form', function () {
    'use strict';

    addCommentAjax(this);
    return false;
});

/******************************************************************************
 * Users
 *****************************************************************************/

$(document).on('submit', '#confirm-password-form', function () {
    'use strict';

    confirmPasswordAjax(this);
    return false;
});

$(document).on('submit', '#reset-password-form', function () {
    'use strict';

    var that = this;

    ajaxPost(
        resolve_urls('reset-password-form'),
        '#reset-password-form',
        function (data, proceed) {
            if (proceed) {
                $(that).before(data);

                ajaxSwitchElem(
                    resolve_urls('reset-password-form'),
                    '#reset-password-form',
                    '*'
                );
            }
        },
        function () {
            ajaxCb_pushBefore(that);
        }
    );
    return false;
});


$(document).on('submit', '#edit-account-form', function () {
    'use strict';

    var that = this;

    ajaxPost(
        resolve_urls('edit-account-form'),
        '#edit-account-form',
        function (data, proceed) {
            if (proceed) {
                hideOnSuccess(that);
            }
        },
        function () {
            colorOnError(that);
        }
    );
    return false;
});


$(document).on('shown.bs.modal', '#modal-edit-profile', function () {
    'use strict';

    var that = this;

    $.get(resolve_urls('edit-account-form'), function (data) {
        $('#edit-account-form').replaceWith(data);
        clearError(that);
    });
});


$(document).on('submit', '#edit-settings-form', function () {
    'use strict';

    var that = this;

    ajaxPost(
        resolve_urls('edit-settings-form'),
        '#edit-settings-form',
        function (data, proceed) {
            if (proceed) {
                hideOnSuccess(that);
            }
        },
        function () {
            colorOnError(that);
        }
    );
    return false;
});


$(document).on('shown.bs.modal', '#modal-edit-settings', function () {
    'use strict';

    var that = this;

    $.get(resolve_urls('edit-settings-form'), function (data) {
        $('#edit-settings-form').replaceWith(data);
        clearError(that);
    });
});


$(document).on('submit', '#edit-password-form', function () {
    'use strict';

    var that = this;

    ajaxPost(
        resolve_urls('edit-password-form'),
        '#edit-password-form',
        function (data, proceed) {
            if (proceed) {
                hideOnSuccess(that);

                $('a[href="#' + $('#edit-password-form')
                    .parents('.modal').prop('id')  + '"]')
                    .removeClass('important');

                ajaxSwitchElem(
                    resolve_urls('get-common-header'),
                    '#header-menu-user'
                );
                ajaxSwitchElem(
                    resolve_urls('edit-email-form'),
                    '#header-menu-user',
                    '*'
                );
            }
        },
        function () {
            colorOnError(that);
        }
    );
    return false;
});


$(document).on('shown.bs.modal', '#modal-edit-password', function () {
    'use strict';

    var that = this;

    $.get(resolve_urls('edit-password-form'), function (data) {
        $('#edit-password-form').replaceWith(data);
        clearError(that);
    });
});

$(document).on('submit', '#edit-email-form', function () {
    'use strict';

    var that = this;

    ajaxPost(
        resolve_urls('edit-email-form'),
        '#edit-email-form',
        function (data, proceed) {
            if (proceed) {
                hideOnSuccess(that);
            }
        },
        function () {
            colorOnError(that);
        }
    );
    return false;
});


$(document).on('shown.bs.modal', '#modal-edit-email', function () {
    'use strict';

    var that = this;

    $.get(resolve_urls('edit-email-form'), function (data) {
        $('#edit-email-form').replaceWith(data);
        clearError(that);
    });
});


$(document).on('submit', '#edit-avatar-form', function () {
    'use strict';

    var that = this;

    ajaxPost(
        resolve_urls('edit-avatar-form'),
        '#edit-avatar-form',
        function (data, proceed) {
            if (proceed) {
                $(that).before(data);

                ajaxSwitchElem(
                    resolve_urls('edit-avatar-form'),
                    '#edit-avatar-form',
                    '*'
                );
            }
        },
        function () {
            ajaxCb_pushBefore(that);
        }
    );
    return false;
});


$(document).on('submit', '#sign-up-form', function () {
    'use strict';

    var that = this;

    ajaxPost(
        resolve_urls('sign-up-form'),
        '#sign-up-form',
        function (data, proceed) {
            if (proceed) {
                $(that).before(data);

                ajaxSwitchElem(
                    resolve_urls('sign-up-form'),
                    '#sign-up-form',
                    '*'
                );
            }
        },
        function () {
            ajaxCb_pushBefore(that);
        }
    );
    return false;
});


$(document).on('submit', '#profile-picture-form', function () {
    'use strict';

    var that = this;

    ajaxFormUpload(
        resolve_urls('edit-picture-form'),
        null,
        '#profile-picture-form',
        function (data, proceed) {
            if (proceed) {
                $(that).before(data);

                ajaxSwitchElem(
                    resolve_urls('edit-picture-form'),
                    '#profile-picture-form',
                    '*'
                );
            }
        },
        function () {
            ajaxCb_pushBefore(that);
        }
    );
    return false;
});
