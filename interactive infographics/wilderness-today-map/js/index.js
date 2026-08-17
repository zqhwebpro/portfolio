/**
 * Wilderness Today Interactive Hunting & Wilderness Regulations Map
 * -------------------------------------------------------------------
 * Loads state hunting regulation data, binds dataset parameters to SVG paths,
 * handles custom modal opening/closing animations, and dynamically updates modal details.
 */

$(function () {
    'use strict';

    /**
     * UI Control: Shift opacity classes on state button click
     */
    $(document).on('click', '.btn-states', function () {
        $('.opacity-top').removeClass('opacity-top').addClass('opacity-top-shift');
        $('.opacity-bot').removeClass('opacity-bot').addClass('opacity-bot-shift');
    });

    /**
     * Map SVG Region Click: Highlight active land path
     */
    $(document).on('click', '.land', function () {
        $('.land').removeClass('land-active');
        $(this).addClass('land-active');
    });

    /**
     * Load hunting and wildlife dataset and attach state regulations as data attributes
     */
    $.getJSON('json/wilder-data.json', function (json) {
        if (!json || !json.STATE) return;

        json.STATE.forEach(function (state, index) {
            const $stateEl = $(`path[title="${state}"]`);

            $stateEl.attr({
                'data-toggle': 'modal',
                'data-target': '#wilderModal',
                'data-state': json.STATE[index] || '',
                'data-cost': json.PRICE[index] || '',
                'data-licenseage': json.AGE[index] || '',
                'data-valid': json.VALID[index] || '',
                'data-mosthunted': json.HUNTED[index] || '',
                'data-season': json.SEASON[index] || '',
                'data-resident': json.RESIDENT[index] || '',
                'data-nonresident': json.NONRESIDENT[index] || '',
                'data-learnmore': json.LINK[index] || '#'
            });
        });
    }).fail(function (err) {
        console.error('Failed to load wilder-data.json:', err);
    });

    /**
     * State Click: Populate modal with state-specific hunting license facts
     */
    $('path').on('click', function () {
        const dataset = this.dataset;
        if (!dataset || !dataset.state) return;

        $('#data-state h4 > span').text(dataset.state || '');
        $('#data-licenseage p > span').text(dataset.licenseage || '');
        $('#data-cost p > span').text(dataset.cost || '');
        $('#data-valid p > span').text(dataset.valid || '');
        $('#data-mosthunted p > span').text(dataset.mosthunted || '');
        $('#data-season p > span').text(dataset.season || '');
        $('#data-resident p > span').text(dataset.resident || '');
        $('#data-nonresident p > span').text(dataset.nonresident || '');
        $('#data-learnmore a').attr('href', dataset.learnmore || '#');
    });

    /**
     * Bootstrap Modal Event Handlers: Apply smooth CSS entry/exit animations
     */
    $('.modal').on('show.bs.modal', function () {
        $(this).find('.modal-dialog').attr('class', 'modal-dialog scale-in-center animated');
    });

    $('.modal').on('hide.bs.modal', function () {
        $(this).find('.modal-dialog').attr('class', 'modal-dialog opacity-modal animated');
    });
});
