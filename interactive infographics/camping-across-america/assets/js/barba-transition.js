/**
 * Camping Across America - Barba.js PJAX Fade Transition
 * -------------------------------------------------------------
 * Creates smooth seamless page-to-page transitions without full browser reloads
 * by animating opacity during container swapping and initializing UI components.
 */

/* global Barba */

if (typeof Barba !== 'undefined') {
    /**
     * Custom Fade Transition Definition
     * Inherits from Barba.BaseTransition to orchestrate async fade out and fade in.
     */
    const FadeTransition = Barba.BaseTransition.extend({
        /**
         * Triggered automatically when navigation starts.
         * Waits for the new container to finish loading and the current container to fade out.
         */
        start: function () {
            Promise
                .all([this.newContainerLoading, this.fadeOut()])
                .then(this.fadeIn.bind(this));
        },

        /**
         * Fades out the old container element
         * @returns {Promise} jQuery animation promise
         */
        fadeOut: function () {
            return $(this.oldContainer).animate({ opacity: 0 }).promise();
        },

        /**
         * Prepares and smoothly fades in the incoming page container
         */
        fadeIn: function () {
            const _this = this;
            const $el = $(this.newContainer);

            // Hide previous container
            $(this.oldContainer).hide();

            // Set initial state for new container
            $el.css({
                visibility: 'visible',
                opacity: 0
            });

            // Animate opacity to 1 and signal completion to Barba
            $el.animate({ opacity: 1 }, 400, function () {
                _this.done();
            });
        }
    });

    /**
     * Assign custom transition to Barba PJAX router
     */
    Barba.Pjax.getTransition = function () {
        return FadeTransition;
    };
}

/**
 * Bootstrap Carousel Default Options
 * Disable auto-cycling and pause on hover.
 */
$(function () {
    'use strict';
    if ($.fn.carousel) {
        $('.carousel').carousel({
            pause: true,
            interval: false
        });
    }
});
