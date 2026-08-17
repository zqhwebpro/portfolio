/**
 * Trek Bible - Documentation & Navigation Positioner
 * -------------------------------------------------------------
 * Dynamically switches navbar alignment styles (fixed-left, fixed-right, fixed-top)
 * and adjusts body margins/paddings for responsive documentation reading.
 */

$(document).ready(function () {
    'use strict';

    /**
     * Navbar alignment click triggers
     */
    $('[data-class]').on('click', function () {
        updateNavbarClass($(this).attr('data-class'));
    });

    // Default positioning
    updateNavbarClass('fixed-left');
});

/**
 * Updates navbar CSS classes and button active state
 * @param {string} className - Target navbar position class
 */
function updateNavbarClass(className) {
    'use strict';
    $('nav')
        .removeClass(function (index, css) {
            return (css.match(/(^|\s)fixed-\S+/g) || []).join(' ');
        })
        .addClass(className);

    $('[data-class]').removeClass('active').parent('li').removeClass('active');
    $('[data-class="' + className + '"]').addClass('active').parent('li').addClass('active');

    fixBodyMargin(className);
}

/**
 * Adjusts body margins depending on navbar placement
 * @param {string} className - Position class name
 */
function fixBodyMargin(className) {
    'use strict';
    if (/fixed-(left|right)/.test(className)) {
        $('body').removeAttr('style');
        if (className === 'fixed-right') {
            $('body').css('marginLeft', 0);
        } else {
            $('body').css('marginRight', 0);
        }
    } else {
        $('body').css({
            'margin-right': 0,
            'margin-left': 0,
            'padding-top': '90px'
        });
    }
}
