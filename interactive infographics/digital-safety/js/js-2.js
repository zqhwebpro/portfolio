/**
 * Digital Safety - Online Gaming Statistics & SVG Responsive Scaling
 * -------------------------------------------------------------
 * Powers the online gaming safety metrics module:
 * - Dynamic SVG graphic dimensions scaling across viewport breakpoints
 * - Chart.js doughnut charts visualizing online gaming risks (Watching streamers, age ratings compliance, player reputation)
 * - Scroll-to-top button
 */

$(document).ready(function () {
    'use strict';

    /**
     * SVG Graphic Responsive Dimension Scaling Helper
     * Dynamically adjusts heights and widths of SVG vectors based on screen width.
     */
    function updateSvgDimensions() {
        const svgWatch = document.getElementById('svg-watch');
        const svgRecommended = document.getElementById('svg-recommended');
        const svgGroup = document.getElementById('NewGroupe0_1_');

        const windowWidth = $(window).width();

        if (windowWidth > 1260) {
            if (svgWatch) svgWatch.setAttribute('height', '50');
            if (svgRecommended) svgRecommended.setAttribute('height', '120');
            if (svgGroup) svgGroup.setAttribute('height', '100');
        } else if (windowWidth > 1075) {
            if (svgWatch) svgWatch.setAttribute('height', '45');
            if (svgRecommended) svgRecommended.setAttribute('height', '70');
            if (svgGroup) svgGroup.setAttribute('height', '90');
        } else if (windowWidth > 1000) {
            if (svgGroup) svgGroup.setAttribute('height', '80');
        } else if (windowWidth > 950) {
            if (svgWatch) svgWatch.setAttribute('height', '40');
            if (svgGroup) svgGroup.setAttribute('height', '70');
        } else if (windowWidth > 940) {
            if (svgWatch) svgWatch.setAttribute('height', '30');
            if (svgRecommended) svgRecommended.setAttribute('height', '50');
        } else if (windowWidth > 900) {
            if (svgGroup) svgGroup.setAttribute('height', '50');
        } else if (windowWidth > 767) {
            if (svgGroup) svgGroup.setAttribute('height', '50');
        } else if (windowWidth > 620) {
            if (svgWatch) { svgWatch.setAttribute('height', '100'); svgWatch.setAttribute('width', '150'); }
            if (svgRecommended) svgRecommended.setAttribute('height', '120');
            if (svgGroup) svgGroup.setAttribute('height', '100');
        } else if (windowWidth > 500) {
            if (svgWatch) { svgWatch.setAttribute('height', '90'); svgWatch.setAttribute('width', '100'); }
            if (svgGroup) svgGroup.setAttribute('height', '90');
        } else if (windowWidth > 445) {
            if (svgWatch) { svgWatch.setAttribute('height', '70'); svgWatch.setAttribute('width', '90'); }
            if (svgRecommended) svgRecommended.setAttribute('height', '70');
            if (svgGroup) svgGroup.setAttribute('height', '70');
        } else {
            if (svgWatch) { svgWatch.setAttribute('height', '50'); svgWatch.setAttribute('width', '80'); }
            if (svgRecommended) svgRecommended.setAttribute('height', '60');
        }
    }

    // Apply SVG dimensions on ready and resize
    updateSvgDimensions();
    $(window).on('resize', updateSvgDimensions);

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

    /**
     * Gaming Doughnut Chart Helper
     * @param {string} canvasId - Element ID
     * @param {number} activeVal - Active percentage
     */
    function renderGamingDoughnut(canvasId, activeVal) {
        if (typeof Chart === 'undefined') return;
        const ctx = document.getElementById(canvasId);
        if (!ctx) return;

        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Users', 'Non-users'],
                datasets: [{
                    backgroundColor: ['#0A495F', '#F3F1F2'],
                    data: [activeVal, Math.max(0, 100 - activeVal)]
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

    // Initialize Gaming Doughnut Charts
    if (typeof Chart !== 'undefined') {
        Chart.defaults.global.legend.display = false;
        renderGamingDoughnut('gaming-watch-graph', 57);
        renderGamingDoughnut('gaming-recommended-graph', 34);
        renderGamingDoughnut('gaming-reputation-graph', 31);
    }
});