/**
 * Wilderness Today Interactive Trail Map
 * -------------------------------------------------------------
 * Powers the interactive US National Scenic & Historic Trails explorer.
 * Handles SVG trail path overlays, dynamic trail facts loaded from JSON,
 * responsive slide-out sidebars (Trail Details and Trail Records),
 * mobile drawer navigation, and trail hover highlights.
 */

$(document).ready(function () {
    'use strict';

    /**
     * Supported National Trails & Dataset Index Mapping
     */
    const trailsMap = {
        'adt-trail': 0, // American Discovery Trail
        'pct-trail': 2, // Pacific Crest Trail
        'cdt-trail': 3, // Continental Divide Trail
        'gwl-trail': 4, // Great Western Loop
        'at-trail':  5, // Appalachian Trail
        'nct-trail': 6  // North Country Trail
    };

    /**
     * Common UI State Transition
     * Prepares the map canvas, hides inactive trail images, and brings in the top facts bar.
     */
    const applyCommonState = () => {
        $('.trail-top-bar-cont').addClass('trail-top-slide-down slide-in-top').removeClass('slide-in-top');
        $('image').removeClass('display-show');
        $('.trail-top-bar-cont').addClass('slide-in-top');

        $('.trail-top-bar-facts').addClass('slide-in-top').delay(510).queue(function (next) {
            $(this).removeClass('slide-in-top');
            next();
        });

        $('.trail-records-position').addClass('display-show');

        const windowWidth = $(window).width();
        if (windowWidth >= 991.99) {
            $('.trail-right-bar-cont').removeClass('slide-in-right');
            $('.trail-records-bar-cont').removeClass('slide-in-bottom');
            $('.trail-map svg').addClass('svg-resize');
        } else {
            $('.trail-left-bar-cont').removeClass('display-show');
            $('.trail-top-bar-cont').removeClass('ricky-hamburgby');
            $('.trail-map-cont').removeClass('frank-the-hamburg-tank');
            $('.trail-map').removeClass('trail-map-mobile');
        }
    };

    /**
     * Trail Link Clicks & Hover Interactions
     * Dynamically registers selection and hover highlight handlers for each trail class.
     */
    Object.keys(trailsMap).forEach(function (trailClass) {
        // Trail Selection Click
        $(document).on('click', `a.${trailClass}`, function (e) {
            e.preventDefault();
            applyCommonState();
            $(`image.${trailClass}`).addClass('display-show');
        });

        // Trail Path Hover Effect
        $(`.${trailClass}`).hover(
            function () { $(`image.${trailClass}`).removeClass('trail-path'); },
            function () { $(`image.${trailClass}`).addClass('trail-path'); }
        );
    });

    /**
     * Close Right Sidebar Drawer (.fa-times-right-bar)
     */
    $(document).on('click', '.fa-times-right-bar', function () {
        $('.trail-top-bar-facts').removeClass('slide-up-out');
        const windowWidth = $(window).width();

        if (windowWidth >= 991.99) {
            $('.trail-records-position').removeClass('trail-records-slide');
            $('.trail-right-bar-cont').removeClass('trail-right-width-plus slide-in-right');
            $('.trail-map-cont').removeClass('trail-map-width-minus');
            $('.trail-map').removeClass('trail-map-mobile trail-map-mobile--record');
        } else {
            $('.trail-right-bar-cont').removeClass('slide-in-bottom trail-right-top-plus');
            $('.trail-records-position').removeClass('trail-records-slide-up');
            $('svg').removeClass('svg-resize');
        }
    });

    /**
     * Trail Records Stats Drawer Toggle (.trail-records-position)
     */
    $(document).on('click', '.trail-records-position', function (e) {
        e.preventDefault();
        const windowWidth = $(window).width();

        if (windowWidth >= 991.99) {
            $('.trail-right-bar-cont').addClass('slide-in-right trail-right-width-plus');
            $('.trail-map-cont').addClass('trail-map-width-minus');
            $('.trail-map').addClass('trail-map-mobile--record');
            $('.trail-top-bar-facts').addClass('slide-up-out');
            $('.trail-top-bar-cont').addClass('trail-top-slide-down slide-in-top');
            $('.trail-records-position').addClass('trail-records-slide slide-in-right-tr');
        } else {
            $('.trail-right-bar-cont').addClass('slide-in-bottom trail-right-top-plus');
            $('.trail-records-position').addClass('trail-records-slide-up slide-in-bottom');
            $('.trail-left-bar-cont').removeClass('display-show');
        }
    });

    /**
     * Window Resize Handler: Reset responsive layout classes across desktop/mobile breakpoints
     */
    $(window).on('resize', function () {
        const windowWidth = $(window).width();

        if (windowWidth < 991.99) {
            $('.trail-records-position').removeClass('trail-records-slide slide-in-right-tr');
            $('.trail-right-bar-cont').removeClass('trail-right-width-plus slide-in-bottom');
            $('.trail-map-width-minus').removeClass('trail-map-width-minus');
            $('.trail-map').removeClass('trail-map-mobile--record');
            $('.trail-top-bar-cont').removeClass('slide-in-top');
            $('.trail-map svg').removeClass('svg-resize');
            $('.trail-top-bar-facts').removeClass('slide-up-out');
        } else {
            $('.trail-top-bar-cont').removeClass('slide-in-top ricky-hamburgby');
            $('.trail-map').removeClass('trail-map-mobile');
            $('.trail-records-position').removeClass('trail-records-slide-up');
            $('.trail-left-bar-cont').removeClass('display-show');
            $('.trail-map-cont').removeClass('frank-the-hamburg-tank');
            $('.trail-right-bar-cont').removeClass('trail-right-top-plus');
        }
    });

    /**
     * Mobile Navigation Drawer Toggle (.ron-hamburgundy)
     */
    $(document).on('click', '.ron-hamburgundy', function (e) {
        e.preventDefault();
        $('.trail-left-bar-cont').toggleClass('display-show');
        $('.trail-map-cont').toggleClass('frank-the-hamburg-tank');
        $('.trail-map').toggleClass('trail-map-mobile');
        $('.trail-top-bar-cont').toggleClass('ricky-hamburgby');
        $('.trail-right-bar-cont').removeClass('trail-right-top-plus');
        $('.trail-records-position').removeClass('trail-records-slide-up');
    });

    /**
     * Load Trail Dataset and Populate Content on Trail Selection
     */
    $.getJSON('json/trail-data.json', function (json) {
        if (!json || !json.TRAIL) return;

        /**
         * Updates DOM content elements with trail facts from JSON index
         * @param {number} idx - Index in JSON dataset arrays
         */
        const populateTrailData = (idx) => {
            $('.trail-top-bar-name h2').html(json.TRAIL[idx] || '');
            $('.dis').html(json.DIS[idx] || '');
            $('.dis-blurb').html(json.DISBLURB[idx] || '');
            $('.hp').html(json.HP[idx] || '');
            $('.lp').html(json.LP[idx] || '');
            $('.fact').html(json.FACT[idx] || '');
            $('.record').html(json.RECORD[idx] || '');
        };

        // Attach data population handlers for each trail
        Object.keys(trailsMap).forEach(function (trailClass) {
            const dataIndex = trailsMap[trailClass];
            $(document).on('click', `.${trailClass}`, function () {
                populateTrailData(dataIndex);
            });
        });
    }).fail(function (err) {
        console.error('Failed to load trail-data.json:', err);
    });
});