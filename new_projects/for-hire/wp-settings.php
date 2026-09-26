<?php
/**
 * Used to set up and fix common variables and include
 * the WordPress procedural and class-library files for
 * the Bones theme and WooCommerce environment.
 *
 * @package WordPress
 */

define( 'WPINC', 'wp-includes' );
define( 'WP_CONTENT_DIR', ABSPATH . 'wp-content' );
define( 'WP_PLUGIN_DIR', WP_CONTENT_DIR . '/plugins' );
define( 'WP_THEME_DIR', WP_CONTENT_DIR . '/themes' );

// Include version info
require_once ABSPATH . WPINC . '/version.php';

// Include Hooks API (add_action, add_filter, do_action, apply_filters)
require_once ABSPATH . WPINC . '/plugin.php';

// Include Core WordPress Functions
require_once ABSPATH . WPINC . '/functions.php';

// Initialize and Load Active Plugins (WooCommerce)
$active_plugins = array(
	'woocommerce/woocommerce.php',
);

foreach ( $active_plugins as $plugin_file ) {
	$full_plugin_path = WP_PLUGIN_DIR . '/' . $plugin_file;
	if ( file_exists( $full_plugin_path ) ) {
		require_once $full_plugin_path;
	}
}

// Load Active Theme: Bones
$theme_functions = WP_THEME_DIR . '/bones/functions.php';
if ( file_exists( $theme_functions ) ) {
	require_once $theme_functions;
}

// Trigger standard initialization actions
do_action( 'after_setup_theme' );
do_action( 'init' );
do_action( 'wp_loaded' );
