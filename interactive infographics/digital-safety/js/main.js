/**
 * Digital Safety - Main Statistics & Device Usage Module
 * -------------------------------------------------------------
 * Powers the interactive data visualizer including:
 * - Scroll-to-top and sticky quiz CTA buttons
 * - Smooth anchor link navigation
 * - Device usage doughnut charts (Computers, Gaming Consoles, Mobile Phones)
 * - Online activity engagement percentage indicators (98%, 10%, 42%, 29%)
 * - Scroll-triggered animated progress bars (68%, 4%, 24%, 11%, 95%)
 */

$(document).ready(function () {
    'use strict';

    /**
     * Scroll-to-Top & Sticky CTA Trigger
     */
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 100) {
            $('#scroll').fadeIn();
            $('.sticky-test-btn a').fadeIn().css('display', 'flex');
        } else {
            $('#scroll').fadeOut();
            $('.sticky-test-btn a').fadeOut();
        }
    });

    $('#scroll').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 600);
        return false;
    });

    /**
     * Smooth Anchor Navigation
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

    /* =========================================================================
       Scroll Viewport Detection & Animation Triggers
    ========================================================================= */
    let computerInView = false;
    let gamingInView = false;
    let phoneInView = false;

    let computerTriggered = false;
    let gamingTriggered = false;
    let phoneTriggered = false;

    const triggeredProgress = {};

    let iScrollPos = 0;
    let dir = 'down';

    /**
     * Helper: Check if element is in viewport
     */
    function isScrolledIntoView(elem) {
        const $el = $(elem);
        if (!$el.length) return false;

        const docViewTop = $(window).scrollTop();
        const docViewBottom = docViewTop + $(window).height();
        const elemTop = $el.offset().top;
        const elemBottom = elemTop + $el.height();

        return (elemTop <= docViewBottom) && (elemBottom >= docViewTop);
    }

    /**
     * Progress Bar Animation Helper
     * @param {number} val - Progress percentage value
     */
    function triggerProgressBar(val) {
        if (triggeredProgress[val]) return;
        triggeredProgress[val] = true;
        $(`.progress-bar${val}`).addClass(`animate${val}`);
        $(`.val${val}`).addClass(`progress-value${val}`);
    }

    // Scroll listener for device charts & progress bars
    $(window).on('scroll', function () {
        const iCurScrollPos = $(this).scrollTop();
        dir = (iCurScrollPos > iScrollPos) ? 'down' : 'up';
        iScrollPos = iCurScrollPos;

        if (isScrolledIntoView('#computer-pie')) {
            if (dir === 'down') renderComputerPie();
        } else {
            computerInView = false;
        }

        if (isScrolledIntoView('#gaming-pie')) {
            if (dir === 'down') renderGamingPie();
        } else {
            gamingInView = false;
        }

        if (isScrolledIntoView('#phone-pie')) {
            if (dir === 'down') renderPhonePie();
        } else {
            phoneInView = false;
        }

        if (dir === 'down') {
            const progressValues = [68, 4, 24, 11, 95];
            progressValues.forEach(function (val) {
                if (isScrolledIntoView(`.progress-bar${val}`)) {
                    triggerProgressBar(val);
                }
            });
        }
    });

    /**
     * Helper to instantiate standardized doughnut charts
     * @param {string} canvasId - Element ID of target canvas
     * @param {number} userPercent - Percentage of users
     */
    function createDoughnutChart(canvasId, userPercent) {
        if (typeof Chart === 'undefined') return;
        const ctx = document.getElementById(canvasId);
        if (!ctx) return;

        return new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Users', 'Non-users'],
                datasets: [{
                    backgroundColor: ['#C00010', '#7d0201'],
                    data: [userPercent, 100 - userPercent]
                }]
            },
            options: {
                cutoutPercentage: 80,
                legend: { display: false },
                elements: {
                    arc: { borderWidth: 0 }
                },
                tooltips: { enabled: false },
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    /**
     * Scroll-Triggered Device Doughnut Charts
     */
    function renderComputerPie() {
        if (computerInView || computerTriggered) return;
        computerInView = true;
        computerTriggered = true;
        createDoughnutChart('computer-pie', 72);
    }

    function renderGamingPie() {
        if (gamingInView || gamingTriggered) return;
        gamingInView = true;
        gamingTriggered = true;
        createDoughnutChart('gaming-pie', 67);
    }

    function renderPhonePie() {
        if (phoneInView || phoneTriggered) return;
        phoneInView = true;
        phoneTriggered = true;
        createDoughnutChart('phone-pie', 40);
    }

    /**
     * Static Top-Level Metric Doughnut Charts
     * (98% Video, 10% Messaging, 42% Social Media, 29% Educational Tools)
     */
    if (typeof Chart !== 'undefined') {
        Chart.defaults.global.legend.display = false;
        createDoughnutChart('pie-chart1', 98);
        createDoughnutChart('pie-chart2', 10);
        createDoughnutChart('pie-chart3', 42);
        createDoughnutChart('pie-chart4', 29);
    }
});
