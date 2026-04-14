/* =========================================
                Preloader
============================================ */
$(window).on('load', function () { // makes sure that whole site is loaded
    $('#status').fadeOut();
    $('#preloader').delay(350).fadeOut('slow');
});

/* =========================================
                Progress Bars
============================================ */
$(function () {

    $("#progress-elements").waypoint(function () {

        $(".progress-bar").each(function () {

            $(this).animate({
                width: $(this).attr("aria-valuenow") + "%"
            }, 2000);

        });

        this.destroy();
    }, {
        offset: 'bottom-in-view'
    });

});

/* =========================================
               Responsive Tabs
============================================ */
$(function () {

    $("#services-tabs").responsiveTabs({
        animation: 'slide'
    });

});


/* =========================================
               Portfolio
============================================ */
$(window).on('load', function () {

    // Initialize Isotope
    $("#isotope-container").isotope({});

    // filter items on button click
    $("#isotope-filters").on('click', 'button', function () {

        // get filter value
        var filterValue = $(this).attr('data-filter');

        // filter portfolio
        $("#isotope-container").isotope({
            filter: filterValue
        });

        // active button
        $("#isotope-filters").find('.active').removeClass('active');
        $(this).addClass('active');
    });
});
/* =========================================
               Magnifier
============================================ */
$(function () {

    $("#portfolio-wrapper").magnificPopup({
        delegate: 'a', // child items selector, by clicking on it popup will open
        type: 'image',
        gallery: {
            enabled: true
        }
    });

});

/* =========================================
              Navigation
============================================ */
 $(function(){

            $("#spring__button, #spring").click(function(){
                $("#winter__button").css("background-color", "#ffffff");
                $("#autumn__button").css("background-color", "#ffffff");
                $("#summer__button").css("background-color", "#ffffff");
                $("#spring__button").css("background-color", "#F6F9E7");
                $(".legend_plant").css("background-color", "#B3D02F");
                $(".legend_harvest").css("background-color", "#65751D");
                $("#section-2").css("display", "none");
                $("#section-4").css("display", "none");
                $("#section-5").css("display", "none");
                $("#section-3").fadeIn(2500);
                $("#chart__plant2 li:nth-child(n+12)::before").css("background-color", "#000");
            });

            $("#winter__button, #winter").click(function(){
                $("#winter__button").css("background-color", "#EEF6FA");
                $("#summer__button").css("background-color", "#ffffff");
                $("#autumn__button").css("background-color", "#ffffff");
                $("#spring__button").css("background-color", "#ffffff");
                $(".legend_plant").css("background-color", "#6CAFD8");
                $(".legend_harvest").css("background-color", "#3C6178");
                $("#section-3").css("display", "none");
                $("#section-4").css("display", "none");
                $("#section-5").css("display", "none");
                $("#section-2").fadeIn(2500);
            });

            $("#summer__button, #summer").click(function(){
                $("#summer__button").css("background-color", "#FDEDEA");
                $("#autumn__button").css("background-color", "#ffffff");
                $("#winter__button").css("background-color", "#ffffff");
                $("#spring__button").css("background-color", "#ffffff");
                $(".legend_plant").css("background-color", "#F26248");
                $(".legend_harvest").css("background-color", "#6B2B20");
                $("#section-3").css("display", "none");
                $("#section-2").css("display", "none");
                $("#section-5").css("display", "none"); 
                $("#section-4").fadeIn(2500);
            });

            $("#autumn__button, #autumn").click(function(){
                $("#autumn__button").css("background-color", "#fbab3c3d");
                $("#summer__button").css("background-color", "#ffffff");
                $("#winter__button").css("background-color", "#ffffff");
                $("#spring__button").css("background-color", "#ffffff");
                $(".legend_plant").css("background-color", "#FBAB3B");
                $(".legend_harvest").css("background-color", "#c17100");
                $("#section-2").css("display", "none");
                $("#section-4").css("display", "none");
                $("#section-3").css("display", "none");
                $("#section-5").fadeIn(2500);
            });


        });



/* =========================================
            TRANSITION/SMOOTHSCROLL
============================================ */

      




/* =========================================
              Mobile Menu
============================================ */
$(function () {

    // Show mobile nav
    $("#mobile-nav-open-btn").click(function () {
        $("#mobile-nav").css("height", "100%");
    });

    // Hide mobile nav
    $("#mobile-nav-close-btn, #mobile-nav a").click(function () {
        $("#mobile-nav").css("height", "0%");
    });

});

/* =========================================
                Animation
============================================ */
// animate on scroll
$(function () {
    new WOW().init();
});

// home animation on page load
$(window).on('load', function () {

    $("#home-heading-1").addClass("animated fadeInDown");
    $("#home-heading-2").addClass("animated fadeInLeft");
    $("#home-text").addClass("animated zoomIn");
    $("#home-btn").addClass("animated zoomIn");
    $("#arrow-down i").addClass("animated fadeInDown infinite");

});