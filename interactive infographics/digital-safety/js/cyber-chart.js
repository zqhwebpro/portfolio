/**
 * Digital Safety - Cybersecurity Statistics & Animated Charts
 * -------------------------------------------------------------
 * Powers the interactive cybersecurity risk visualizations:
 * - Scroll-to-top and sticky quiz test CTA buttons
 * - Viewport scroll direction detection
 * - Chart.js doughnut chart for identity theft statistics
 * - SVG vector animations for data breaches (35 nodes), phishing incidents (15 nodes), and unsafe networks (13 nodes)
 * - Animated progress indicators for risk percentages (61%, 14%, 60%, 55%)
 */

$(document).ready(function () {
    'use strict';

    /**
     * Scroll-to-Top & Sticky Quiz CTA Trigger
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

    // Quiz button link
    $('.btn-test').on('click', function (e) {
        e.preventDefault();
        window.location.href = 'https://parent.guide/to-the-internet/digital-safety-quiz/';
        return false;
    });

    /* =========================================================================
       Scroll Viewport Detection & Animation Triggers
    ========================================================================= */
    let identityInView = false;
    let identityIsTriggered = false;

    let p61Triggered = false;
    let p14Triggered = false;
    let p60Triggered = false;
    let p55Triggered = false;

    let iScrollPos = 0;
    let dir = 'down';

    /**
     * Helper: Check if element is within the current visible viewport
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

    $(window).on('scroll', function () {
        const iCurScrollPos = $(this).scrollTop();
        dir = (iCurScrollPos > iScrollPos) ? 'down' : 'up';
        iScrollPos = iCurScrollPos;

        if (isScrolledIntoView('#identity-chart')) {
            if (dir === 'down') identityChart();
        } else {
            identityInView = false;
        }

        if (isScrolledIntoView('.svg-breaches') && dir === 'down') {
            triggerBreachesSVGs();
        }

        if (isScrolledIntoView('.svg-phishing') && dir === 'down') {
            triggerPhishingSVGs();
        }

        if (isScrolledIntoView('.svg-unsafe') && dir === 'down') {
            triggerUnsafeSVGs();
        }

        if (isScrolledIntoView('.pb61') && dir === 'down') triggerProgressBar(61);
        if (isScrolledIntoView('.pb14') && dir === 'down') triggerProgressBar(14);
        if (isScrolledIntoView('.pb60') && dir === 'down') triggerProgressBar(60);
        if (isScrolledIntoView('.pb55') && dir === 'down') triggerProgressBar(55);
    });

    /**
     * Animated Progress Bars for Percentage Stats (61%, 14%, 60%, 55%)
     * @param {number} val - Progress percentage value
     */
    function triggerProgressBar(val) {
        if (val === 61 && !p61Triggered) {
            p61Triggered = true;
            $('.pb61').addClass('p61');
            $('.pv61').addClass('proval-61');
        } else if (val === 14 && !p14Triggered) {
            p14Triggered = true;
            $('.pb14').addClass('p14');
            $('.pv14').addClass('proval-14');
        } else if (val === 60 && !p60Triggered) {
            p60Triggered = true;
            $('.pb60').addClass('p60');
            $('.pv60').addClass('proval-60');
        } else if (val === 55 && !p55Triggered) {
            p55Triggered = true;
            $('.pb55').addClass('p55');
            $('.pv55').addClass('proval-55');
        }
    }

    /**
     * SVG Node Wave Animations (Breaches, Phishing, and Unsafe Networks)
     */
    let breachesAnimated = false;
    function triggerBreachesSVGs() {
        if (breachesAnimated) return;
        breachesAnimated = true;
        for (let i = 1; i <= 35; i++) {
            const formattedIndex = i < 10 ? `0${i}` : `${i}`;
            $(`.breaches-${formattedIndex}`).addClass(`cybersec-breaches-${i}`);
        }
    }

    let phishingAnimated = false;
    function triggerPhishingSVGs() {
        if (phishingAnimated) return;
        phishingAnimated = true;
        for (let i = 1; i <= 15; i++) {
            const formattedIndex = i < 10 ? `0${i}` : `${i}`;
            $(`.phishing-${formattedIndex}`).addClass(`cybersec-phishing-${i}`);
        }
    }

    let unsafeAnimated = false;
    function triggerUnsafeSVGs() {
        if (unsafeAnimated) return;
        unsafeAnimated = true;
        for (let i = 1; i <= 13; i++) {
            const formattedIndex = i < 10 ? `0${i}` : `${i}`;
            $(`.unsafe-${formattedIndex}`).addClass(`cybersec-unsafe-${i}`);
        }
    }

    /**
     * Doughnut Chart: Identity Theft Users vs Non-users
     */
    function identityChart() {
        if (identityInView || identityIsTriggered || typeof Chart === 'undefined') return;

        identityInView = true;
        identityIsTriggered = true;

        const ctx = document.getElementById('identity-chart');
        if (!ctx) return;

        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Users', 'Non-users'],
                datasets: [{
                    backgroundColor: ['#0093B5', '#003444'],
                    data: [83, 17]
                }]
            },
            options: {
                cutoutPercentage: 80,
                legend: { display: false },
                elements: {
                    arc: { borderWidth: 0 }
                },
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    // Grid layout formatting for stats columns
    $('.col-md-3').css({ display: 'grid', 'justify-content': 'center' });
});
