/**
 * Travel Safety & Global Statistics Interactive Infographic
 * -------------------------------------------------------------
 * Powers the interactive data visualizer including:
 * - ScrollMagic element active toggles
 * - Dynamic Chart.js visualizations (Donut generation breakdowns, duration & frequency bar charts, road fatalities, dress code perceptions)
 * - Viewport scroll entrance triggers
 * - Sidebar menu responsive scaling and custom scrollbars
 * - Smooth anchor navigation and carousel synchronization
 */

$(document).ready(function ($) {
    'use strict';

    /**
     * Responsive Window Listeners
     */
    $(window).on('resize', function () {
        if ($('#homeSubmenu').length) {
            sidebarResponsiveness();
        }
    });

    /**
     * ScrollMagic Controller & Scene Setup
     * Toggles CSS styling classes on timeline icons as they scroll into view.
     */
    if (typeof ScrollMagic !== 'undefined') {
        const scrollController = new ScrollMagic.Controller();
        const iconTriggers = ['#icon-01', '#icon-02', '#icon-03', '#icon-04', '#icon-05', '.last-icon'];

        iconTriggers.forEach(function (trigger) {
            if ($(trigger).length) {
                new ScrollMagic.Scene({
                    triggerElement: trigger,
                    duration: 200
                })
                    .setClassToggle(trigger, 'design')
                    .addTo(scrollController);
            }
        });
    }

    /**
     * Scroll-to-Top Button Handler
     */
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 100) {
            $('#scroll').fadeIn();
        } else {
            $('#scroll').fadeOut();
        }
    });

    $('#scroll').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 600);
        return false;
    });

    /**
     * Landing Screen Entry Transition
     */
    $('.main-launch').on('click', function (e) {
        e.preventDefault();
        $('.main-launch').fadeOut(1000);
        $('.main-wrapper').fadeIn(1000);
        sidebarResponsiveness();
        return false;
    });

    /**
     * Bootstrap Tooltips Configuration
     */
    if ($.fn.tooltip) {
        if ($(window).width() <= 850) {
            $('[data-toggle="tooltip"]').on('click', function () {
                $(this).tooltip('hide');
            });
        } else {
            $('[data-toggle="tooltip"]').tooltip();
        }
    }

    /**
     * Sidebar Menu Controls & Carousel Synchronization
     */
    $('#homeSubmenu .item').on('click', function () {
        $(this).toggleClass('clicked');
    });

    // Sync carousel active slide text
    $('#carouselExampleControls').on('slid.bs.carousel', function () {
        const slideId = $('.item.active').data('slide-number');
        if (slideId) {
            $('#carousel-text').html($('#slide-content-' + slideId).html());
        }
    });

    // Custom Scrollbar for Sidebar
    if ($.fn.mCustomScrollbar) {
        $('#sidebar').mCustomScrollbar({ theme: 'minimal' });
    }

    // Toggle sidebar collapse
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar, #content').toggleClass('active');
        $('.collapse.in').toggleClass('in');
    });

    $('.mainCollapseMenuWrap .item').on('click', function () {
        $('.mainCollapseMenuWrap').removeClass('show');
    });

    /**
     * Smooth Anchor Scrolling
     */
    $('.scroll').on('click', function (e) {
        e.preventDefault();
        const targetSelector = $(this).attr('href');
        const targetOffset = $('body').find(targetSelector).offset();
        if (targetOffset) {
            $('html, body').animate({ scrollTop: targetOffset.top }, 700);
            $(this).parent().addClass('active').siblings().removeClass('active');
        }
        return false;
    });

    /* =========================================================================
       Chart.js Visualizations & Scroll Viewport Triggers
    ========================================================================= */
    let pieChartInView = false;
    let chartRightInView = false;
    let chartLeftInView = false;
    let chartFatalInView = false;
    let chartDressInView = false;

    let iScrollPos = 0;
    let dir = 'down';

    let animatePieChartTriggered = false;
    let animateChartRightTriggered = false;
    let animateChartLeftTriggered = false;
    let animateChartFatalTriggered = false;
    let animateChartDressTriggered = false;

    /**
     * Helper: Check if element is within the current visible viewport
     * @param {string|jQuery} elem - DOM selector
     * @returns {boolean}
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

    // Scroll listener for lazy animating charts upon scrolling into view
    $(window).on('scroll', function () {
        const iCurScrollPos = $(this).scrollTop();
        dir = (iCurScrollPos > iScrollPos) ? 'down' : 'up';
        iScrollPos = iCurScrollPos;

        if (isScrolledIntoView('#pie-chart1')) {
            if (dir === 'down') animatePieChart();
        } else {
            pieChartInView = false;
        }

        if (isScrolledIntoView('#chartRight')) {
            if (dir === 'down') animateChartRight();
        } else {
            chartRightInView = false;
        }

        if (isScrolledIntoView('#chartLeft')) {
            if (dir === 'down') animateChartLeft();
        } else {
            chartLeftInView = false;
        }

        if (isScrolledIntoView('#chartfatal')) {
            if (dir === 'down') animateChartFatal();
        } else {
            chartFatalInView = false;
        }

        if (isScrolledIntoView('#chart-dress')) {
            if (dir === 'down') animateChartDress();
        } else {
            chartDressInView = false;
        }
    });

    /**
     * 1. Pie / Doughnut Charts (Generational Travel Spending)
     */
    function animatePieChart() {
        if (pieChartInView || animatePieChartTriggered || typeof Chart === 'undefined') return;

        pieChartInView = true;
        animatePieChartTriggered = true;

        const pieChartsDataValues = [
            { label: 'Gen Z', value: 23, color: '#3b6167' },
            { label: 'Millennials', value: 19, color: '#5b8a8f' },
            { label: 'Gen X', value: 12, color: '#94c4ce' },
            { label: 'Boomers', value: 19, color: '#bfe5ec' }
        ];

        pieChartsDataValues.forEach(function (dataItem, index) {
            const chartCanvas = document.getElementById('pie-chart' + (index + 1));
            if (chartCanvas) {
                new Chart(chartCanvas, {
                    type: 'pie',
                    data: {
                        labels: [dataItem.label, ''],
                        datasets: [{
                            backgroundColor: [dataItem.color, '#383838'],
                            borderWidth: 0,
                            data: [dataItem.value, 100 - dataItem.value]
                        }]
                    },
                    options: {
                        cutoutPercentage: 80,
                        legend: { display: false }
                    }
                });
            }
        });
    }

    /**
     * 2. Right Bar Chart (Vacation Duration in Days)
     */
    function animateChartRight() {
        if (chartRightInView || animateChartRightTriggered || typeof Chart === 'undefined') return;

        const ctx = document.getElementById('chartRight');
        if (!ctx) return;

        chartRightInView = true;
        animateChartRightTriggered = true;

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Gen Z (18-23)', 'Millennials (24-35)', 'Gen X (36-55)', 'Boomers (56+)'],
                datasets: [{
                    label: 'Last Vacation Duration in Days',
                    data: [6.6, 6.2, 6.4, 7.8],
                    backgroundColor: ['rgba(59, 97, 103)', 'rgba(91, 138, 143)', 'rgba(148, 196, 206)', 'rgba(191, 229, 236)']
                }]
            },
            options: {
                legend: { display: false },
                scales: {
                    xAxes: [{ display: false, ticks: { display: false }, gridLines: { display: false } }],
                    yAxes: [{ display: false, ticks: { beginAtZero: true }, gridLines: { display: false } }]
                }
            }
        });
    }

    /**
     * 3. Left Bar Chart (Total Number of Trips Taken Per Year)
     */
    function animateChartLeft() {
        if (chartLeftInView || animateChartLeftTriggered || typeof Chart === 'undefined') return;

        const ctx = document.getElementById('chartLeft');
        if (!ctx) return;

        chartLeftInView = true;
        animateChartLeftTriggered = true;

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Gen Z (18-23)', 'Millennials (24-35)', 'Gen X (36-55)', 'Boomers (56+)'],
                datasets: [{
                    label: 'Total Number of Trips Taken per Year',
                    data: [4.4, 5.6, 4.0, 3.5],
                    backgroundColor: ['rgba(59, 97, 103)', 'rgba(91, 138, 143)', 'rgba(148, 196, 206)', 'rgba(191, 229, 236)']
                }]
            },
            options: {
                legend: { display: false },
                scales: {
                    xAxes: [{ display: false, ticks: { display: false }, gridLines: { display: false } }],
                    yAxes: [{ display: false, ticks: { beginAtZero: true }, gridLines: { display: false } }]
                }
            }
        });
    }

    /**
     * 4. Fatalities Bar Chart (Road Fatality Rates per 100k)
     */
    function animateChartFatal() {
        if (chartFatalInView || animateChartFatalTriggered || typeof Chart === 'undefined') return;

        const ctx = document.getElementById('chartfatal');
        if (!ctx) return;

        chartFatalInView = true;
        animateChartFatalTriggered = true;

        let fontSize = 18;
        if (window.matchMedia('(max-width: 525px)').matches) {
            fontSize = 12;
        } else if (window.matchMedia('(max-width: 900px)').matches) {
            fontSize = 15;
        }

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Libya', 'Thailand', 'Malawi', 'Liberia', ['Democratic', 'Republic of', 'Congo']],
                datasets: [{
                    data: [73.4, 36.2, 35.0, 33.7, 33.2],
                    backgroundColor: ['#94c4ce', '#94c4ce', '#94c4ce', '#94c4ce', '#94c4ce']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: { display: false },
                scales: {
                    xAxes: [{
                        gridLines: { color: '#000000', display: false },
                        ticks: { autoSkip: false, maxRotation: 0, minRotation: 0, fontSize: fontSize }
                    }],
                    yAxes: [{
                        gridLines: { color: '#000000', display: false },
                        ticks: { beginAtZero: true, min: 0, max: 80, fontSize: fontSize }
                    }]
                }
            }
        });
    }

    /**
     * 5. Cultural Dress Code Perceptions Bar Chart
     */
    function animateChartDress() {
        if (chartDressInView || animateChartDressTriggered || typeof Chart === 'undefined') return;

        const ctx = document.getElementById('chart-dress');
        if (!ctx) return;

        chartDressInView = true;
        animateChartDressTriggered = true;

        let fontSize = 13;
        if ($(window).width() <= 450) {
            fontSize = 10;
        } else if ($(window).width() <= 767) {
            fontSize = 12;
        }

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Egypt', 'Pakistan', 'Iraq', ['Saudi', 'Arabia'], 'Lebanon', 'Turkey', 'Tunisia'],
                datasets: [{
                    data: [14, 22, 27, 47, 49, 52, 56],
                    backgroundColor: ['#94c4ce', '#94c4ce', '#94c4ce', '#94c4ce', '#94c4ce', '#94c4ce', '#94c4ce']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: { display: false },
                scales: {
                    xAxes: [{
                        gridLines: { color: '#000000', display: false },
                        ticks: { autoSkip: false, maxRotation: 0, minRotation: 0, fontSize: fontSize }
                    }],
                    yAxes: [{
                        gridLines: { display: false },
                        ticks: { beginAtZero: true, max: 100, fontSize: fontSize }
                    }]
                }
            }
        });
    }

    /**
     * Sidebar Layout Scaling Helper
     * Dynamically calculates icon sizing and margins based on available vertical sidebar height.
     */
    function sidebarResponsiveness() {
        const sidebarHeight = $('#homeSubmenu').height() || 0;
        let iconHeight = (sidebarHeight / 9) - 10;

        $('#homeSubmenu li').css({
            height: iconHeight,
            width: iconHeight,
            margin: '20px auto'
        });
        $('#homeSubmenu .item img').css({ padding: '15%' });

        if (sidebarHeight <= 785) {
            iconHeight = (sidebarHeight / 9) - 10;
            $('#homeSubmenu li').css({
                height: iconHeight,
                width: iconHeight,
                margin: '10px auto'
            });
            $('#homeSubmenu .item img').css({ padding: '15%' });
        }

        if (sidebarHeight <= 460) {
            iconHeight = (sidebarHeight / 10) - 5;
            $('#homeSubmenu li').css({
                height: iconHeight,
                width: iconHeight,
                margin: '8px auto'
            });
            $('#homeSubmenu .item img').css({ padding: '20%' });
        }

        if (sidebarHeight <= 375) {
            iconHeight = (sidebarHeight / 10) - 5;
            $('.trekbible-logo').css({ padding: '0 0' });
            $('#homeSubmenu li').css({
                height: iconHeight,
                width: iconHeight,
                margin: '8px auto'
            });
            $('#homeSubmenu .item img').css({ padding: '20%' });
        }
    }
});
