/**
 * Trek Bible - Master Theme & Component Controller
 * -------------------------------------------------------------
 * Central orchestrator managing:
 * - Full-page preloader
 * - Responsive mobile navigation drawer & sub-menus
 * - Sticky header menu
 * - Smooth anchor scroll navigation
 * - Numerical counters via Countimator
 * - Tabbed image content switcher
 * - Portfolio Isotope grid filtering & Venobox lightboxes
 * - Asynchronous AJAX contact form submission
 */

jQuery(document).ready(function ($) {
    'use strict';

    /**
     * Master Theme Options & Modules
     */
    const ThemeEngine = {
        class_active: 'active',
        toggle_btn: $('.site-nav-toggle'),
        navigation: $('.site-nav'),
        sub_menu: '.sub-menu',
        indicator_mobile: '.indicator-mobile',
        sticky_header: '#sticky-header',
        pre_loader: $('.site-preloader'),
        selector_counter: $('.counter'),
        selector_tab: $('#site-tabs-1'),
        tabs_button: $('.site-tabs-buttons'),
        site_tabs: $('.site-tabs'),
        tabs_bg: $('.site-tab-bg'),
        portfolio: $('.site-portfolio-tabs-content'),
        portfolio_tabs: $('.site-portfolio-tabs'),
        light_box: $('.venobox'),
        contact_form: $('#contactForm'),

        /**
         * 1. Pre-loader: Smoothly hides overlay once all assets are loaded
         */
        initPreloader: function () {
            if (this.pre_loader.length) {
                $(window).on('load', () => {
                    this.pre_loader.fadeOut(400);
                });
            }
        },

        /**
         * 2. Header Navigation: Manages mobile toggle button and dropdown accordions
         */
        initNavigation: function () {
            const self = this;
            const animateSpeed = 400;

            // Mobile menu open/close toggle
            self.toggle_btn.on('click', function (e) {
                e.preventDefault();
                const $btn = $(this);

                if (!$btn.hasClass(self.class_active)) {
                    $btn.addClass(self.class_active);
                    self.navigation.stop(true, true).slideDown(animateSpeed);
                } else {
                    $btn.removeClass(self.class_active);
                    self.navigation.stop(true, true).slideUp(animateSpeed);
                }
            });

            // Mobile submenu accordion expand/collapse
            self.navigation.find(self.indicator_mobile).on('click', function () {
                const $subMenu = $(this).parent('li').children(self.sub_menu);
                if ($subMenu.is(':hidden')) {
                    $subMenu.stop(true, true).slideDown(animateSpeed);
                } else {
                    $subMenu.stop(true, true).slideUp(animateSpeed);
                }
            });
        },

        /**
         * 3. Sticky Header
         */
        initStickyHeader: function () {
            if ($.fn.sticky && $(this.sticky_header).length) {
                $(this.sticky_header).sticky({
                    topSpacing: 0,
                    zIndex: 10000
                });
            }
        },

        /**
         * 4. Smooth Anchor Link Scrolling
         */
        initSmoothScroll: function () {
            const self = this;
            const scrollSpeed = 1000;

            self.navigation.find("a[href^='#']").on('click', function (e) {
                const targetHash = this.hash;
                const $target = $(targetHash);

                if ($target.length) {
                    e.preventDefault();
                    $('html, body').stop().animate({
                        scrollTop: $target.offset().top
                    }, scrollSpeed);
                }
            });
        },

        /**
         * 5. Statistics Counter (Countimator)
         */
        initStatistics: function () {
            if ($.fn.countimator && this.selector_counter.length) {
                this.selector_counter.countimator();
            }
        },

        /**
         * 6. Interactive Tabbed Content & Background Switcher
         */
        initTabs: function () {
            const self = this;

            if ($.fn.tabslet && self.selector_tab.length) {
                self.selector_tab.tabslet({
                    active: 1,
                    animation: true
                });
            }

            // Sync background image on tab change
            self.tabs_button.on('mouseup', 'a', function () {
                const tabBgAttr = $(this).attr('data-tab-bg');
                const $targetBg = self.site_tabs.find('.' + tabBgAttr);

                if (!$targetBg.hasClass(self.class_active)) {
                    self.tabs_bg.removeClass(self.class_active);
                    $targetBg.addClass(self.class_active);
                }
            });
        },

        /**
         * 7. Portfolio Isotope Filter & Venobox Lightbox
         */
        initPortfolio: function () {
            const self = this;

            if ($.fn.isotope && self.portfolio.length) {
                const $grid = self.portfolio.isotope({
                    itemSelector: '.portfolio-items',
                    layoutMode: 'masonry'
                });

                self.portfolio_tabs.on('click', 'li', function () {
                    const filterClass = $(this).attr('data-filter');
                    $grid.isotope({ filter: '.' + filterClass });

                    $(this).siblings('li').removeClass(self.class_active);
                    $(this).addClass(self.class_active);
                });
            }

            if ($.fn.venobox && self.light_box.length) {
                self.light_box.venobox();
            }
        },

        /**
         * 8. AJAX Contact Form Submission
         */
        initContactForm: function () {
            const self = this;
            const $form = self.contact_form;
            if (!$form.length) return;

            const $submitBtn = $form.find('button[type=submit]');
            const $icon = $submitBtn.find('i');

            $form.on('submit', function (e) {
                e.preventDefault();
                $icon.css('display', 'inline-block');

                $.ajax({
                    type: 'POST',
                    url: $form.attr('action') || '#',
                    data: $form.serialize()
                })
                    .done(function (response) {
                        $submitBtn.text(response || 'Message Sent!');
                        $form.find('input, textarea').val('');
                        $icon.css('display', 'none');
                    })
                    .fail(function (err) {
                        $submitBtn.html('Error');
                        $icon.css('display', 'none');
                    });
            });
        }
    };

    // Initialize all theme modules
    ThemeEngine.initPreloader();
    ThemeEngine.initNavigation();
    ThemeEngine.initStickyHeader();
    ThemeEngine.initSmoothScroll();
    ThemeEngine.initStatistics();
    ThemeEngine.initTabs();
    ThemeEngine.initPortfolio();
    ThemeEngine.initContactForm();
});