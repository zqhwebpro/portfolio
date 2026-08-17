/**
 * Keto Calculator UI Interactive Styling & Slider Controls
 * -------------------------------------------------------------
 * Manages active button highlight states for gender and weight goals,
 * and updates activity illustration slides dynamically based on the range input value.
 */

$(document).ready(function () {
    'use strict';

    /**
     * Gender Choice Button Toggle
     */
    $('.js-css-choice-gender').on('click', function () {
        $('.js-css-choice-gender').removeClass('active');
        $(this).addClass('active');
    });

    /**
     * Weight Goal Choice Button Toggle
     */
    $('.js-css-choice-weight').on('click', function () {
        $('.js-css-choice-weight').removeClass('active');
        $(this).addClass('active');
    });

    /**
     * Activity Level Range Slider Handler
     * Maps multiplier values (1.2 to 1.9) to visual indicator slides (slide-a through slide-e).
     */
    const activitySlideMap = {
        '1.2': 'slide-a',
        '1.375': 'slide-b',
        '1.55': 'slide-c',
        '1.725': 'slide-d',
        '1.9': 'slide-e'
    };

    function updateActivitySlide() {
        const sliderVal = $('input[type="range"]').val();
        const activeClass = activitySlideMap[sliderVal];

        if (activeClass) {
            $('.keto-range-images')
                .removeClass('slide-a slide-b slide-c slide-d slide-e')
                .addClass(activeClass);
        }
    }

    // Bind on input, change, and mousemove to support mouse, touch, and keyboard interactions
    $('.keto-range, input[type="range"]').on('input change mousemove', updateActivitySlide);
});