/**
 * Digital Safety - Access Module Progress Bars
 * -------------------------------------------------------------
 * Sets the width of Bootstrap progress bars dynamically from aria-valuenow attributes.
 */

$(document).ready(function () {
    'use strict';
    $('.progress .progress-bar').css('width', function () {
        return $(this).attr('aria-valuenow') + '%';
    });
});
