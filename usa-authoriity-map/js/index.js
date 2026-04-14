$(function () {
    $(document).on('click', '.btn-states', function () {
        $('.opacity-top').removeClass('opacity-top').addClass('opacity-top-shift');
        $('.opacity-bot').removeClass('opacity-bot').addClass('opacity-bot-shift');
    });

    $(document).on('click', '.land', function () {
        $('.land').removeClass('land-active');
        $(this).addClass('land-active');
    });


    $.getJSON("json/usa-data.json", function (json) {
        json.STATE.forEach((state, index) => {
            const $stateEl = $(`path[title="${state}"]`);
            $stateEl.attr('data-toggle', 'modal');
            $stateEl.attr('data-target', '#usaModal');
            $stateEl.attr('data-state', json.STATE[index]);
            $stateEl.attr('data-campground', json.CAMPGROUND[index]);
            $stateEl.attr('data-camping_fee', json.CAMPING_FEE[index]);
            $stateEl.attr('data-hours', json.HOURS[index]);
            $stateEl.attr('data-rating_stars', json.STARS[index]);
            $stateEl.attr('data-rating', json.RATING[index]);
            $stateEl.attr('data-learnmore', json.LINK[index]);
        });
    });

    ;
    $('path').click(function () {
        $('#data-state h4 > span').text(this.dataset.state);
        $('#data-campground p > span').text(this.dataset.campground);
        $('#data-camping_fee p > span').text(this.dataset.camping_fee);
        $('#data-hours p > span').text(this.dataset.hours);
        $('#data-rating_stars').attr('src', this.dataset.rating_stars + '.png');
        $('#data-rating p > span').text(this.dataset.rating);
        $('#data-learnmore a').attr('href', this.dataset.learnmore);
    });

});
