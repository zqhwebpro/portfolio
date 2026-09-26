<?php
/**
 * Plugin Name: WooCommerce
 * Plugin URI: https://woocommerce.com/
 * Description: An eCommerce toolkit that helps you sell anything. Configured for developer service contracts & engineering retainers.
 * Version: 8.8.0
 * Author: Automattic
 * Author URI: https://woocommerce.com
 * Text Domain: woocommerce
 * Domain Path: /i18n/languages/
 * Requires at least: 6.3
 * Requires PHP: 7.4
 *
 * @package WooCommerce
 */

defined( 'ABSPATH' ) || exit;

if ( ! defined( 'WC_PLUGIN_FILE' ) ) {
	define( 'WC_PLUGIN_FILE', __FILE__ );
}

// Include core classes & functions
require_once __DIR__ . '/includes/wc-core-functions.php';
require_once __DIR__ . '/includes/class-wc-product.php';
require_once __DIR__ . '/includes/class-wc-cart.php';
require_once __DIR__ . '/includes/class-wc-checkout.php';
require_once __DIR__ . '/includes/class-woocommerce.php';

/**
 * Main instance of WooCommerce.
 *
 * @return WooCommerce
 */
function WC() {
	return WooCommerce::instance();
}

// Initialize WooCommerce singleton
$GLOBALS['woocommerce'] = WC();
