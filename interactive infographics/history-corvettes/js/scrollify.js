/**
 * History of Corvettes Interactive Timeline & Generation Specs
 * -------------------------------------------------------------
 * Powers the section-based scroll snapping via Scrollify, circle navigation tracking,
 * and scroll-triggered animated performance metric counters for Corvette generations C1 through C7.
 */

$(function () {
    'use strict';

    /**
     * Scrollify Setup
     * Configures full-page vertical section snapping and syncs active status with the sidebar circle navigation.
     */
    if ($.scrollify) {
        $.scrollify({
            section: '.scrollifyer',
            scrollSpeed: 390,
            before: function (index, sections) {
                const sectionName = sections[index].attr('data-section-name');
                const targetHref = '#' + sectionName;

                // Sync active indicator on circle navigation
                $('.circle-nav a.active').removeClass('active');
                $(`.circle-nav a[href="${targetHref}"]`).addClass('active');
            }
        });
    }

    /**
     * Navigation Click Handlers
     * Scrolls to target section upon clicking circle nav indicators, arrows, or footer links.
     */
    $('.circle-nav a, .arrow-nav, .footer-link').on('click', function (e) {
        e.preventDefault();
        const targetSection = $(this).attr('href');
        if ($.scrollify && targetSection) {
            $.scrollify.move(targetSection);
        }
    });
});

/**
 * Animated Counter Function
 * Animates a numeric element from its current text value to its `data-count` target value.
 * @param {jQuery} $counterEl - Target counter element
 */
function animateCounter($counterEl) {
    if ($counterEl.data('animated')) return; // Avoid re-triggering animation once finished

    const countTarget = parseFloat($counterEl.attr('data-count'));
    if (isNaN(countTarget)) return;

    $counterEl.data('animated', true);

    $({ countNum: parseFloat($counterEl.text()) || 0 }).animate(
        { countNum: countTarget },
        {
            duration: 6600,
            easing: 'easeOutExpo',
            step: function () {
                $counterEl.text(parseFloat(this.countNum).toFixed(1));
            },
            complete: function () {
                $counterEl.text(countTarget);
            }
        }
    );
}

/**
 * Scroll Triggered Generation Animations
 * Monitors scroll events to check if any Corvette generation section (C1-C7) is visible in the viewport,
 * triggering visual animations and performance metric counters.
 */
$(document).on('scroll', function () {
    // Total number of Corvette generation sections (C1 through C7)
    const TOTAL_GENERATIONS = 7;

    for (let gen = 1; gen <= TOTAL_GENERATIONS; gen++) {
        const $wrap = $(`.corv-${gen}-wrap`);

        // Check if generation section is currently visible on screen (using onscreen.js plugin)
        if ($wrap.length && $wrap.is(':onScreen')) {
            // Trigger CSS animation for vehicle illustration
            $(`.paused${gen}`).addClass(`corv-${gen}-play`);

            // Animate each metric counter in this generation section
            $(`.counter${gen}`).each(function () {
                animateCounter($(this));
            });
        }
    }
});