/**
 * History of Plumbing Interactive Infographic
 * -------------------------------------------------------------
 * Powers the interactive timeline, parallax layer effects, full-page scrolling via Scrollify,
 * sidebar navigation drawer, and ancient culture detail cards (Romans, Greece, Near East, IVC, Egypt).
 */

$(document).ready(function () {
    'use strict';

    /**
     * Parallax Layer Initialization
     * Initializes Parallax.js instances for main scene and scenes 01 through 24.
     */
    if (typeof Parallax !== 'undefined') {
        const mainScene = document.getElementById('scene');
        if (mainScene) new Parallax(mainScene);

        for (let i = 1; i <= 24; i++) {
            const sceneId = i < 10 ? `scene-0${i}` : `scene-${i}`;
            const sceneEl = document.getElementById(sceneId);
            if (sceneEl) {
                new Parallax(sceneEl);
            }
        }
    }

    /**
     * jQuery Positioning Extensions
     * Custom helpers to center or pin specific text and illustration layers.
     */
    jQuery.fn.center = function () {
        const top = -this.height() / 2;
        const bottom = -this.height() / 2;
        const left = -this.width() / 2;
        const right = -this.width() / 2;
        return this.css({
            position: 'absolute',
            'margin-left': left + 'px',
            'margin-top': top + 'px',
            'margin-right': right + 'px',
            'margin-bottom': bottom + 'px',
            left: '50%',
            top: '50%',
            right: '50%',
            bottom: '50%'
        });
    };

    jQuery.fn.bottom = function () {
        const left = -this.width() / 2;
        const right = -this.width() / 2;
        return this.css({
            position: 'absolute',
            'margin-left': left + 'px',
            'margin-right': right + 'px',
            left: '50%',
            right: '50%',
            bottom: '20%'
        });
    };

    jQuery.fn.bottom_ = function () {
        return this.css({
            position: 'absolute',
            left: '48%'
        });
    };

    jQuery.fn.left = function () {
        return this.css({
            position: 'absolute',
            left: '75%'
        });
    };

    // Apply positioning helpers to specific infographic text and graphic elements
    $('.center-text').center();
    $('.bottom-text').bottom();
    $('.landing-section .button-explore').bottom_();
    $('.container-submas-02 .king-02').left();

    /**
     * Navigation & Screen Transition Handlers
     */
    // Explore button on landing page: moves to the first interactive section
    $('#button-explore').on('click', function (e) {
        e.preventDefault();
        if ($.scrollify) $.scrollify.next();
    });

    // Return to landing page
    $('.landing-page').on('click', function (e) {
        e.preventDefault();
        $('.main-wrapper').slideDown().fadeOut(2500);
        $('.landing-section').slideDown().fadeIn(2500);
        return false;
    });

    $('.menu-list #1').on('click', function () {
        $('.main-wrapper').fadeOut('slide');
        $('.landing-section').fadeIn('slide');
    });

    /**
     * Sidebar Menu Toggle Handlers
     */
    $('.menu-toggle').on('click', function () {
        $('.menu-list, #sidebar, #sidebar .list-group').fadeIn('slide');
        $('#sidebar').css('width', '100%');
        $('.menu-toggle').fadeOut();
        $('.menu').hide();
        $('#homeSubmenu').fadeOut('slide');
        $('#sidebar .logo-plumbing img').css('height', '30px');
    });

    $('.menu-list').hide();

    $('.menu').on('click', function () {
        $('.menu-list, #sidebar .list-group').fadeIn('slide');
        $('#sidebar').css('width', '100%');
        $('.menu').hide(2500);
        $('#homeSubmenu').fadeOut('slide');
        $('#sidebar .logo-plumbing img').css('height', '30px');
    });

    $('#sidebar .close').on('click', function () {
        $('.menu-list, #sidebar .list-group').fadeOut('slide');
        $('#sidebar').css('width', '10%');
        $('.menu').show(2500);
        $('#homeSubmenu').fadeIn('slide');
        $('#sidebar .logo-plumbing img').css('height', '20px');

        if (window.matchMedia('(max-width: 992px)').matches) {
            $('.menu-toggle').fadeIn('slide');
            $('#sidebar').css('width', '0%');
            $('#homeSubmenu').hide(2500);
            $('.menu').hide();
        }
    });

    $('#sidebar .menu-list a').on('click', function () {
        $('.menu-list').fadeOut(2500);
        $('.menu').show(2500);
        $('#sidebar').css('width', '10%');
        $('#homeSubmenu').show();
        $('#sidebar .logo-plumbing img').css('height', '20px');

        if (window.matchMedia('(max-width: 992px)').matches) {
            $('.menu-toggle').fadeIn('slide');
            $('#sidebar').hide();
            $('#homeSubmenu').hide(2500);
            $('.menu').hide();
        }
    });

    // Sidebar menu item hover image preview
    $('#sidebar .menu-list ul li').hover(function () {
        $('#picture').removeClass().addClass($(this).attr('rel'));
        $(this).addClass('active').siblings().removeClass('active');
    });

    $('#homeSubmenu .item').on('click', function () {
        $(this).toggleClass('clicked');
    });

    // Auto-update caption when carousel slide changes
    $('#carouselExampleControls').on('slid.bs.carousel', function () {
        const slideId = $('.item.active').data('slide-number');
        if (slideId) {
            $('#carousel-text').html($('#slide-content-' + slideId).html());
        }
    });

    $('#sidebarCollapse').on('click', function () {
        $('#sidebar, #content').toggleClass('active');
        $('.collapse.in').toggleClass('in');
    });

    $('.mainCollapseMenuWrap .item').on('click', function () {
        $('.mainCollapseMenuWrap').removeClass('show');
    });

    /**
     * Smooth Anchor Scroll Navigation
     */
    $('.scroll').on('click', function (e) {
        e.preventDefault();
        const targetId = $(this).attr('href');
        const targetOffset = $('body').find(targetId).offset();
        if (targetOffset) {
            $('html, body').animate({ scrollTop: targetOffset.top }, 700);
            $(this).parent().addClass('active').siblings().removeClass('active');
        }
        return false;
    });

    // Bootstrap tooltip initialization
    $('[data-toggle="tooltip"]').tooltip();

    // "Did You Know?" popup toggle
    $('.bttn button').hover(
        function () { $('.btn-spn').show(); },
        function () { $('.btn-spn').hide(); }
    );

    $('.bttn button').on('click', function () {
        $('.popup-dyk').toggle(2500);
    });

    $('.popup').hide();

    /**
     * Ancient Cultures Interactive Popups
     * Maps culture IDs to CSS container selectors and manages mutual exclusivity.
     */
    const cultureSelectors = {
        roman: '.romans',
        greece: '.greece',
        nec: '.near-east-cultures',
        ivc: '.ivc',
        egypt: '.egypt'
    };

    $('.bigger-span').on('click', function () {
        const cultureKey = this.id;
        const activeSelector = cultureSelectors[cultureKey];

        if (activeSelector) {
            // Toggle active culture popup
            $(`${activeSelector} .popup`).toggle(2500);

            // Hide all other culture popups and side panels
            Object.keys(cultureSelectors).forEach(function (key) {
                if (key !== cultureKey) {
                    const selector = cultureSelectors[key];
                    $(`${selector} .popup`).hide(2500);
                    $(`${selector}-sidepop`).hide(2500);
                }
            });
        }
    });

    /**
     * Side Popup Panel & Deep-Link Scrolling
     */
    $('.side-pop-wrap').hide();

    $('.popup button, .moba-list a').on('click', function (event) {
        const hash = this.id;

        if ($('.side-pop-wrap').hasClass('side-pop-toggle')) {
            event.preventDefault();
            const $targetEl = $('#sidepop-' + hash);
            if ($targetEl.length) {
                $('.acp-section-wrap .side-pop-wrap').animate({
                    scrollTop: $targetEl.offset().top
                }, 800, function () {
                    window.location.hash = '#sidepop-' + hash;
                });
                $('.side-pop-wrap').css('scroll-behavior', 'smooth');
            }
        }

        if ($(this).is('.moba-list a')) {
            $('.menu-toggle').hide(2500);
        }

        $('.side-pop-wrap').show().addClass('side-pop-toggle').removeClass('side-pop-hide');
        $('.popup').hide(1000);
    });

    // Sub-section button toggle
    $('.container-submas-01 .bttn').on('click', function () {
        $('.container-submas-01 .sidepop').toggleClass('sidepop-toggle', 2500);
        $('.container-submas-01 .bttn').toggleClass('bttn-slide', 2500);
    });

    // Tab buttons for HAC sub-containers
    $('.text .btn').on('click', function () {
        $('.menu-toggle').hide(2500);
        const btnId = this.id;
        if (btnId === 'btn-1' || btnId === 'btn-2' || btnId === 'btn-3') {
            const num = btnId.replace('btn-', '');
            $('.container-subhac-01').slideUp(2500).fadeOut(2500);
            $('#container-subhac-' + num).fadeIn(2500);
        }
    });

    // Close side popup panel and restore main HAC container
    $('#content .close').on('click', function () {
        $('.side-pop-wrap').removeClass('side-pop-toggle').addClass('side-pop-hide');
        $('.menu-toggle').show(2500);
        $('.container-subhac-02').fadeOut(2500);
        $('.container-subhac-01').slideDown().fadeIn(2500);
    });

    /**
     * Scrollify Full-Page Snapping Configuration
     */
    if ($.scrollify) {
        $.scrollify({
            section: '.wrapper',
            afterRender: function () {
                const hash = window.location.hash;
                if (hash === '#landing') {
                    $('#sidebar').hide();
                }
            },
            after: function () {
                const hash = window.location.hash;
                if (hash === '#landing') {
                    $('#sidebar').hide();
                } else {
                    $('#sidebar').fadeIn('slide');
                    if (window.matchMedia('(max-width: 992px)').matches) {
                        $('#sidebar').hide();
                        $('.menu-toggle').fadeIn('slide');
                        $('#homeSubmenu').hide(2500);
                        $('.menu').hide();
                    }
                }
            }
        });
    }
});
