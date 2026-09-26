<?php
/**
 * Bones Functions & Definitions with WooCommerce Support
 *
 * @package WordPress
 * @subpackage Bones
 */

// Load Bones core library files
require_once( 'library/bones.php' );
require_once( 'library/custom-post-type.php' );
require_once( 'library/admin.php' );

/**
 * Bones Theme Setup
 */
function bones_theme_setup() {

	// Launching operation cleanup
	add_action( 'init', 'bones_head_cleanup' );

	// Enqueue base scripts and styles
	add_action( 'wp_enqueue_scripts', 'bones_scripts_and_styles', 999 );

	// Theme supports
	add_theme_support( 'menus' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'automatic-feed-links' );
	add_theme_support( 'html5', array(
		'comment-list',
		'search-form',
		'comment-form',
		'gallery',
		'caption',
	) );

	// Register nav menus
	register_nav_menus( array(
		'main-nav'   => __( 'The Main Menu', 'bonestheme' ),
		'footer-links' => __( 'Footer Links', 'bonestheme' ),
	) );

	// Register sidebar widget area
	register_sidebar( array(
		'id'            => 'sidebar1',
		'name'          => __( 'Sidebar 1', 'bonestheme' ),
		'description'   => __( 'The first (primary) sidebar.', 'bonestheme' ),
		'before_widget' => '<div id="%1$s" class="widget %2$s">',
		'after_widget'  => '</div>',
		'before_title'  => '<h4 class="widgettitle">',
		'after_title'   => '</h4>',
	) );

	/**
	 * =========================================================================
	 * WOOCOMMERCE INTEGRATION & HOOKS
	 * =========================================================================
	 */

	// Declare explicit WooCommerce support
	add_theme_support( 'woocommerce' );
	add_theme_support( 'wc-product-gallery-zoom' );
	add_theme_support( 'wc-product-gallery-lightbox' );
	add_theme_support( 'wc-product-gallery-slider' );

	// Unhook standard WooCommerce wrappers
	remove_action( 'woocommerce_before_main_content', 'woocommerce_output_content_wrapper', 10 );
	remove_action( 'woocommerce_after_main_content', 'woocommerce_output_content_wrapper_end', 10 );

	// Hook in Bones responsive grid wrappers
	add_action( 'woocommerce_before_main_content', 'bones_woocommerce_wrapper_start', 10 );
	add_action( 'woocommerce_after_main_content', 'bones_woocommerce_wrapper_end', 10 );
}
add_action( 'after_setup_theme', 'bones_theme_setup' );

/**
 * Bones WooCommerce wrapper open
 */
function bones_woocommerce_wrapper_start() {
	echo '<div id="content">';
	echo '  <div id="inner-content" class="wrap cf">';
	echo '    <main id="main" class="m-all t-2of3 d-5of7 cf" role="main">';
}

/**
 * Bones WooCommerce wrapper close
 */
function bones_woocommerce_wrapper_end() {
	echo '    </main>';
	echo '    <aside id="sidebar1" class="sidebar m-all t-1of3 d-2of7 last-col cf" role="complementary">';
	dynamic_sidebar( 'sidebar1' );
	echo '    </aside>';
	echo '  </div>';
	echo '</div>';
}

/**
 * Enqueue scripts and styles in Bones
 */
function bones_scripts_and_styles() {
	// Bones Main Stylesheet
	wp_enqueue_style( 'bones-stylesheet', get_stylesheet_directory_uri() . '/library/css/style.css', array(), '1.8.0', 'all' );

	// Bones Main JS
	wp_enqueue_script( 'bones-js', get_stylesheet_directory_uri() . '/library/js/scripts.js', array(), '1.8.0', true );
}
