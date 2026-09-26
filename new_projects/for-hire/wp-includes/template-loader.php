<?php
/**
 * Loads the correct template based on the visitor's HTTP request.
 *
 * @package WordPress
 */

do_action( 'template_redirect' );

$template = false;

// Check if WooCommerce request
if ( function_exists( 'is_woocommerce' ) && is_woocommerce() ) {
	if ( file_exists( WP_THEME_DIR . '/bones/woocommerce.php' ) ) {
		$template = WP_THEME_DIR . '/bones/woocommerce.php';
	}
}

// Fallback to standard theme hierarchy
if ( ! $template ) {
	if ( file_exists( WP_THEME_DIR . '/bones/index.php' ) ) {
		$template = WP_THEME_DIR . '/bones/index.php';
	}
}

if ( $template ) {
	include $template;
}
