$(document).ready(function () {
    $('.js-css-choice-gender').on('click', function () {
        $('.js-css-choice-gender').removeClass('active');
        $(this).toggleClass('active');
    });
    $('.js-css-choice-weight').on('click', function () {
        $('.js-css-choice-weight').removeClass('active');
        $(this).toggleClass('active');
    });
    $('.keto-range').mousemove(function () {
        if ($('input[type = "range"]').val() === "1.2") {
            $('.keto-range-images').removeClass('slide-b');
            $('.keto-range-images').addClass('slide-a');
        } else if ($('input[type = "range"]').val() === "1.375") {
            $('.keto-range-images').addClass('slide-b');
            $('.keto-range-images').removeClass('slide-a');
            $('.keto-range-images').removeClass('slide-c');
        } else if ($('input[type = "range"]').val() === "1.55") {
            $('.keto-range-images').addClass('slide-c');
            $('.keto-range-images').removeClass('slide-b');
            $('.keto-range-images').removeClass('slide-d');
        } else if ($('input[type = "range"]').val() === "1.725") {
            $('.keto-range-images').addClass('slide-d');
            $('.keto-range-images').removeClass('slide-e');
            $('.keto-range-images').removeClass('slide-c');
        } else if ($('input[type = "range"]').val() === "1.9") {
            $('.keto-range-images').addClass('slide-e');
            $('.keto-range-images').removeClass('slide-d');
        } else {
            console.log('Error.');
        }
    })
});