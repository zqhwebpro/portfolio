/**
 * Mom & Family Interactive State Ranking Map
 * -------------------------------------------------------------
 * Displays US state comparison metrics (overall rank, cost of living, education, healthcare).
 * Asynchronously loads ranking data, binds values to SVG state vectors, and triggers
 * animated text transitions upon selecting a state.
 */

$(function () {
    'use strict';

    /**
     * Map Region Active Highlight
     * Sets active styling for the selected SVG map path.
     */
    $(document).on('click', '.land', function () {
        $('.land').removeClass('land-active');
        $(this).addClass('land-active');
    });

    /**
     * Metrics Configuration
     * List of metric keys present in both the JSON dataset and corresponding DOM elements.
     */
    const metricFields = [
        'rank',
        'index',
        'ur_rating',
        'ur_rank',
        'cr',
        'cr_rating',
        'er_rank'
    ];

    /**
     * Load JSON dataset and attach attributes to corresponding SVG paths
     */
    $.getJSON('data.json', function (json) {
        if (!json || !json.STATE) return;

        json.STATE.forEach(function (state, index) {
            const $stateEl = $(`path[title="${state}"]`);
            $stateEl.attr('data-state', json.STATE[index] || '');

            metricFields.forEach(function (field) {
                const upperKey = field.toUpperCase();
                $stateEl.attr(`data-${field}`, json[upperKey] ? json[upperKey][index] : '');
            });
        });
    }).fail(function (err) {
        console.error('Failed to load data.json:', err);
    });

    /**
     * Helper: Trigger 'dancefade' CSS animation on updated text content
     * @param {jQuery} $element - jQuery element containing the text span
     * @param {string|number} value - New text value to display
     * @param {number} [duration=300] - Duration in ms before removing animation class
     */
    function updateAnimatedText($element, value, duration = 300) {
        $element
            .text(value || '')
            .addClass('dancefade')
            .delay(duration)
            .queue(function (next) {
                $(this).removeClass('dancefade');
                next();
            });
    }

    /**
     * State Path Click Handler
     * Updates header title and animated stat values for all metric fields
     */
    $('path').on('click', function () {
        const dataset = this.dataset;
        if (!dataset || !dataset.state) return;

        // Update state title header
        $('#data-state h2 > span')
            .text(dataset.state)
            .addClass('dancefade');

        // Update each numerical ranking and score field with animation
        metricFields.forEach(function (field) {
            const $targetSpan = $(`#data-${field} h4 > span`);
            updateAnimatedText($targetSpan, dataset[field]);
        });
    });
});
