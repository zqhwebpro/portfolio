$(function () {
    $(document).on('click', '.btn-states', function () {
        $('.opacity-top').removeClass('opacity-top').addClass('opacity-top-shift');
        $('.opacity-bot').removeClass('opacity-bot').addClass('opacity-bot-shift');
    });

    $(document).on('click', '.land', function(){
      $('.land').removeClass('land-active');
      $(this).addClass('land-active');
    });   

    $.getJSON("json/wilder-data.json", function (json) {
        json.STATE.forEach((state, index) => {
            const $stateEl = $(`path[title="${state}"]`);
            $stateEl.attr('data-toggle', 'modal');
            $stateEl.attr('data-target', '#wilderModal');
            $stateEl.attr('data-state', json.STATE[index]);
            $stateEl.attr('data-cost', json.PRICE[index]);
            $stateEl.attr('data-licenseage', json.AGE[index]);
            $stateEl.attr('data-valid', json.VALID[index]);
            $stateEl.attr('data-mosthunted', json.HUNTED[index]);
            $stateEl.attr('data-season', json.SEASON[index]);
            $stateEl.attr('data-resident', json.RESIDENT[index]);
            $stateEl.attr('data-nonresident', json.NONRESIDENT[index]);
            $stateEl.attr('data-learnmore', json.LINK[index]);
        });
    });

    $('path').click(function () {
        $('#data-state h4 > span').text(this.dataset.state);
        $('#data-licenseage p > span').text(this.dataset.licenseage);
        $('#data-cost p > span').text(this.dataset.cost);
        $('#data-valid p > span').text(this.dataset.valid);
        $('#data-mosthunted p > span').text(this.dataset.mosthunted);
        $('#data-season p > span').text(this.dataset.season);
        $('#data-resident p > span').text(this.dataset.resident);
        $('#data-nonresident p > span').text(this.dataset.nonresident);
        $('#data-learnmore a').attr('href', this.dataset.learnmore);
    });

    $('.modal').on('show.bs.modal', function () {
      $('.modal .modal-dialog').attr('class', 'modal-dialog  scale-in-center  animated');
     })
     $('.modal').on('hide.bs.modal', function () {
      $('.modal .modal-dialog').attr('class', 'modal-dialog  opacity-modal  animated');
     })

});

