/**
 * Camping Across America - Barba.js Page Fade Transition
 * -------------------------------------------------------------
 * Provides lightweight fade-out and fade-in animations during Barba.js page transitions.
 */

/* global Barba */

if (typeof Barba !== 'undefined') {
    /**
     * Base Fade Transition Configuration
     */
    const FadeTransition = Barba.BaseTransition.extend({
        /**
         * Triggered automatically when PJAX navigation begins.
         */
        start: function () {
            Promise
                .all([this.newContainerLoading, this.fadeOut()])
                .then(this.fadeIn.bind(this));
        },

        /**
         * Fade out current container
         */
        fadeOut: function () {
            return $(this.oldContainer).animate({ opacity: 0 }).promise();
        },

        /**
         * Fade in new container and finalize transition
         */
        fadeIn: function () {
            const _this = this;
            const $el = $(this.newContainer);

            $(this.oldContainer).hide();

            $el.css({
                visibility: 'visible',
                opacity: 0
            });

            $el.animate({ opacity: 1 }, 400, function () {
                _this.done();
            });
        }
    });

    /**
     * Configure transition for PJAX router
     */
    Barba.Pjax.getTransition = function () {
        return FadeTransition;
    };
}