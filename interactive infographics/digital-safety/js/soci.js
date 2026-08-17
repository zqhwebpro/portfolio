/**
 * Digital Safety - Social Media Demographics & Stats
 * -------------------------------------------------------------
 * Powers the social media usage statistics module:
 * - Scroll-to-top button
 * - Scroll-triggered percentage animations (45%, 44%, 11%, 24%, 56%, 20%)
 * - Chart.js comparative grouped bar chart analyzing social network adoption
 *   by age group (13-17 vs 18-29 on Instagram, Snapchat, Facebook, and Twitter).
 */

$(document).ready(function () {
    'use strict';

    /**
     * Scroll-to-Top & Sticky CTA
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

    let bestGraphInView = false;
    let bestGraphTriggered = false;
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
     * Animated text progress bars
     * @param {number} val - Progress percentage value
     */
    function triggerProgress(val) {
        if (triggeredProgress[val]) return;
        triggeredProgress[val] = true;
        $(`.pro-${val}`).addClass(`animateText${val}`);
    }

    // Scroll listener for stats & graph trigger
    $(window).on('scroll', function () {
        const iCurScrollPos = $(this).scrollTop();
        dir = (iCurScrollPos > iScrollPos) ? 'down' : 'up';
        iScrollPos = iCurScrollPos;

        if (dir === 'down') {
            const progressValues = [45, 44, 11, 24, 56, 20];
            progressValues.forEach(function (val) {
                if (isScrolledIntoView(`.pro-${val}`)) {
                    triggerProgress(val);
                }
            });

            if (isScrolledIntoView('.social-media-graph-wrapp')) {
                renderSocialMediaChart();
            }
        }
    });

    /**
     * Grouped Bar Chart: Social Media Adoption Across Age Demographics
     */
    function renderSocialMediaChart() {
        if (bestGraphInView || bestGraphTriggered || typeof Chart === 'undefined') return;

        bestGraphInView = true;
        bestGraphTriggered = true;

        let fontSize = 18;
        if (window.matchMedia('(max-width: 600px)').matches) {
            fontSize = 11;
        } else if (window.matchMedia('(max-width: 823px)').matches) {
            fontSize = 12;
        }

        const ctx = $('#bar-chartcanvas');
        if (!ctx.length) return;

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Instagram', 'Snapchat', 'Facebook', 'Twitter'],
                datasets: [
                    {
                        label: '13-17 years of age',
                        data: [534, 512, 653, 237],
                        backgroundColor: ['#4e5b22', '#4e5b22', '#4e5b22', '#4e5b22']
                    },
                    {
                        label: '18-29 years of age',
                        data: [475, 505, 624, 297],
                        backgroundColor: ['#9ed03c', '#9ed03c', '#9ed03c', '#9ed03c']
                    }
                ]
            },
            options: {
                legend: { display: false },
                scales: {
                    yAxes: [{
                        gridLines: { drawBorder: false, display: false },
                        ticks: { min: 0, max: 800, display: false }
                    }],
                    xAxes: [{
                        gridLines: { display: false },
                        ticks: {
                            fontFamily: "'Montserrat', sans-serif",
                            fontColor: '#000',
                            fontSize: fontSize
                        }
                    }]
                }
            }
        });
    }
});