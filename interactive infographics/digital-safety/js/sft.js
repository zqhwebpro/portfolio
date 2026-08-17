/**
 * Digital Safety - Safety Metrics (SFT) Module
 * -------------------------------------------------------------
 * Monitors scroll position to trigger entrance animations for safety statistic circles
 * (61% and 52% indicators) and manages scroll-to-top button visibility.
 */

$(document).ready(function () {
    'use strict';

    /**
     * Scroll-to-Top & Sticky CTA Trigger
     */
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 100) {
            $('#scroll').fadeIn();
            $('.sticky-test-btn a').fadeIn().css('display', 'flex');
        } else {
            $('#scroll').fadeOut();
            $('.sticky-test-btn a').fadeOut();
        }
    });

    $('#scroll').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 600);
        return false;
    });

    let progress60InView = false;
    let progress52InView = false;
    let progress61Triggered = false;
    let progress52Triggered = false;

    let iScrollPos = 0;
    let dir = 'down';

    /**
     * Helper: Check if element is in viewport
     */
    function isScrolledIntoView(elem) {
        const $el = $(elem);
        if (!$el.length) return false;

        const docViewTop = $(window).scrollTop();
        const docViewBottom = docViewTop + $(window).height();
        const elemTop = $el.offset().top;
        const elemBottom = elemTop + $el.height();

        return (elemTop <= docViewBottom) && (elemBottom >= docViewTop);
    }

    /**
     * Animated 60%/61% Circular Progress Bar
     */
    function progress60() {
        if (progress60InView || progress61Triggered) return;
        progress60InView = true;
        progress61Triggered = true;

        $('.percent60').addClass('animate61');
        $('.val61').addClass('progress-value61');
    }

    /**
     * Animated 52% Circular Progress Bar
     */
    function progress52() {
        if (progress52InView || progress52Triggered) return;
        progress52InView = true;
        progress52Triggered = true;

        $('.percent52').addClass('animate52');
        $('.val52').addClass('progress-value52');
    }

    // Scroll listener for progress triggers
    $(window).on('scroll', function () {
        const iCurScrollPos = $(this).scrollTop();
        dir = (iCurScrollPos > iScrollPos) ? 'down' : 'up';
        iScrollPos = iCurScrollPos;

        if (isScrolledIntoView('.percent60')) {
            if (dir === 'down') progress60();
        } else {
            progress60InView = false;
        }

        if (isScrolledIntoView('.percent52')) {
            if (dir === 'down') progress52();
        } else {
            progress52InView = false;
        }
    });
});