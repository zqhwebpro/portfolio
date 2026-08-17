/**
 * USA Authority Campground Map
 * -------------------------------------------------------------
 * Handles interactive SVG map behavior, asynchronous JSON data loading,
 * active state toggling, and populating Bootstrap modal windows with state-specific
 * campground details.
 */

$(function () {
    'use strict';

    /**
     * Top & Bottom Opacity Shift
     * Shifts opacity classes on specific UI container elements when the state button is clicked.
     */
    $(document).on('click', '.btn-states', function () {
        $('.opacity-top').removeClass('opacity-top').addClass('opacity-top-shift');
        $('.opacity-bot').removeClass('opacity-bot').addClass('opacity-bot-shift');
    });

    /**
     * Map Region Active Highlight
     * Highlights the selected SVG land path while removing active styling from previously selected paths.
     */
    $(document).on('click', '.land', function () {
        $('.land').removeClass('land-active');
        $(this).addClass('land-active');
    });

    /**
     * Asynchronously load USA campground dataset and bind values to SVG paths
     * Matches the state names from the JSON file to corresponding SVG <path> elements via `title` attribute.
     */
    $.getJSON('json/usa-data.json', function (json) {
        if (!json || !json.STATE) return;

        json.STATE.forEach(function (state, index) {
            const $stateEl = $(`path[title="${state}"]`);

            // Attach Bootstrap modal triggers and dataset attributes to each SVG state path
            $stateEl.attr({
                'data-toggle': 'modal',
                'data-target': '#usaModal',
                'data-state': json.STATE[index] || '',
                'data-campground': json.CAMPGROUND[index] || '',
                'data-camping_fee': json.CAMPING_FEE[index] || '',
                'data-hours': json.HOURS[index] || '',
                'data-rating_stars': json.STARS[index] || '',
                'data-rating': json.RATING[index] || '',
                'data-learnmore': json.LINK[index] || '#'
            });
        });
    }).fail(function (err) {
        console.error('Failed to load usa-data.json:', err);
    });

    /**
     * State SVG Path Click Handler
     * Extracts dataset attributes from the clicked SVG path and populates the modal content fields.
     */
    $('path').on('click', function () {
        const dataset = this.dataset;
        if (!dataset || !dataset.state) return;

        $('#data-state h4 > span').text(dataset.state || '');
        $('#data-campground p > span').text(dataset.campground || '');
        $('#data-camping_fee p > span').text(dataset.camping_fee || '');
        $('#data-hours p > span').text(dataset.hours || '');

        if (dataset.rating_stars) {
            $('#data-rating_stars').attr('src', dataset.rating_stars + '.png');
        }

        $('#data-rating p > span').text(dataset.rating || '');
        $('#data-learnmore a').attr('href', dataset.learnmore || '#');
    });
});
