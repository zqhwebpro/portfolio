/**
 * Crop & Garden Harvesting Guide
 * -------------------------------------------------------------
 * Powers the interactive seasonal planting calendar (Spring, Summer, Autumn, Winter),
 * animated progress indicators via Waypoints, Isotope grid filtering,
 * Magnific Popup image lightboxes, responsive tabs, and WOW.js scroll animations.
 */

/* =========================================
   1. Preloader
============================================ */
$(window).on('load', function () {
    'use strict';
    // Hide status spinner first, then smoothly fade out full-page overlay
    $('#status').fadeOut();
    $('#preloader').delay(350).fadeOut('slow');
});

/* =========================================
   2. Waypoints Progress Bar Animation
============================================ */
$(function () {
    'use strict';
    if ($.fn.waypoint) {
        $('#progress-elements').waypoint(function () {
            $('.progress-bar').each(function () {
                const targetPercent = $(this).attr('aria-valuenow') + '%';
                $(this).animate({ width: targetPercent }, 2000);
            });
            this.destroy(); // Trigger animation only once
        }, {
            offset: 'bottom-in-view'
        });
    }
});

/* =========================================
   3. Responsive Content Tabs
============================================ */
$(function () {
    'use strict';
    if ($.fn.responsiveTabs) {
        $('#services-tabs').responsiveTabs({
            animation: 'slide'
        });
    }
});

/* =========================================
   4. Isotope Portfolio & Grid Filter
============================================ */
$(window).on('load', function () {
    'use strict';
    const $isotopeContainer = $('#isotope-container');
    if ($.fn.isotope && $isotopeContainer.length) {
        // Initialize Isotope layout
        $isotopeContainer.isotope({});

        // Filter items on button click
        $('#isotope-filters').on('click', 'button', function () {
            const filterValue = $(this).attr('data-filter');
            $isotopeContainer.isotope({ filter: filterValue });

            // Update active state on filter button
            $('#isotope-filters').find('.active').removeClass('active');
            $(this).addClass('active');
        });
    }
});

/* =========================================
   5. Magnific Popup Lightbox
============================================ */
$(function () {
    'use strict';
    if ($.fn.magnificPopup) {
        $('#portfolio-wrapper').magnificPopup({
            delegate: 'a',
            type: 'image',
            gallery: {
                enabled: true
            }
        });
    }
});

/* =========================================
   6. Seasonal Planting & Harvesting Switcher
============================================ */
$(function () {
    'use strict';

    /**
     * Season Visual & Content Configuration
     * Maps each season to its button colors, legend theme, and visible section.
     */
    const seasonConfig = {
        spring: {
            triggers: '#spring__button, #spring',
            buttonId: '#spring__button',
            btnBg: '#F6F9E7',
            plantColor: '#B3D02F',
            harvestColor: '#65751D',
            targetSection: '#section-3'
        },
        winter: {
            triggers: '#winter__button, #winter',
            buttonId: '#winter__button',
            btnBg: '#EEF6FA',
            plantColor: '#6CAFD8',
            harvestColor: '#3C6178',
            targetSection: '#section-2'
        },
        summer: {
            triggers: '#summer__button, #summer',
            buttonId: '#summer__button',
            btnBg: '#FDEDEA',
            plantColor: '#F26248',
            harvestColor: '#6B2B20',
            targetSection: '#section-4'
        },
        autumn: {
            triggers: '#autumn__button, #autumn',
            buttonId: '#autumn__button',
            btnBg: '#fbab3c3d',
            plantColor: '#FBAB3B',
            harvestColor: '#c17100',
            targetSection: '#section-5'
        }
    };

    const allButtons = '#spring__button, #winter__button, #summer__button, #autumn__button';
    const allSections = '#section-2, #section-3, #section-4, #section-5';

    // Register click listeners for each season
    Object.keys(seasonConfig).forEach(function (seasonKey) {
        const season = seasonConfig[seasonKey];

        $(season.triggers).on('click', function () {
            // Reset all season buttons to white background
            $(allButtons).css('background-color', '#ffffff');

            // Apply active button background color
            $(season.buttonId).css('background-color', season.btnBg);

            // Update legend color indicators
            $('.legend_plant').css('background-color', season.plantColor);
            $('.legend_harvest').css('background-color', season.harvestColor);

            // Hide inactive sections and smoothly fade in the active season's section
            $(allSections).css('display', 'none');
            $(season.targetSection).fadeIn(2500);

            // Special seasonal chart customization for spring
            if (seasonKey === 'spring') {
                $('#chart__plant2 li:nth-child(n+12)::before').css('background-color', '#000');
            }
        });
    });
});

/* =========================================
   7. Mobile Navigation Drawer
============================================ */
$(function () {
    'use strict';
    // Open full-height mobile overlay menu
    $('#mobile-nav-open-btn').on('click', function () {
        $('#mobile-nav').css('height', '100%');
    });

    // Close overlay menu on close button or nav link click
    $('#mobile-nav-close-btn, #mobile-nav a').on('click', function () {
        $('#mobile-nav').css('height', '0%');
    });
});

/* =========================================
   8. Page & Scroll Entrance Animations
============================================ */
$(function () {
    'use strict';
    // Initialize WOW.js scroll animations
    if (typeof WOW !== 'undefined') {
        new WOW().init();
    }
});

// Trigger entrance animations when whole page is loaded
$(window).on('load', function () {
    'use strict';
    $('#home-heading-1').addClass('animated fadeInDown');
    $('#home-heading-2').addClass('animated fadeInLeft');
    $('#home-text, #home-btn').addClass('animated zoomIn');
    $('#arrow-down i').addClass('animated fadeInDown infinite');
});