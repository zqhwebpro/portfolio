<?php
/**
 * WooCommerce Core Functions
 *
 * @package WooCommerce\Functions
 */

defined( 'ABSPATH' ) || exit;

function is_woocommerce() {
	return true;
}

function is_shop() {
	return ! isset( $_GET['view'] ) || 'shop' === $_GET['view'];
}

function is_product() {
	return isset( $_GET['view'] ) && 'product' === $_GET['view'];
}

function is_cart() {
	return isset( $_GET['view'] ) && 'cart' === $_GET['view'];
}

function is_checkout() {
	return isset( $_GET['view'] ) && 'checkout' === $_GET['view'];
}

function wc_price( $price, $args = array() ) {
	return '<span class="woocommerce-Price-amount amount"><span class="woocommerce-Price-currencySymbol">$</span>' . number_format( (float) $price, 2 ) . '</span>';
}

function wc_get_cart_url() {
	return '?view=cart';
}

function wc_get_checkout_url() {
	return '?view=checkout';
}

function wc_get_products( $args = array() ) {
	return array(
		new WC_Product( array(
			'id'                => 201,
			'name'              => 'Bespoke WordPress & Bones Theme Architecture',
			'slug'              => 'custom-bones-theme',
			'price'             => 2450.00,
			'regular_price'     => 2950.00,
			'short_description' => 'Clean, mobile-first WordPress development built on Bones with custom post types, modular CSS/Sass, and PageSpeed 95+ score optimization.',
			'category'          => 'Theme Engineering',
			'sku'               => 'DEV-BONES-01',
			'rating'            => 5.0,
			'reviews'           => 14,
			'in_stock'          => true,
		) ),
		new WC_Product( array(
			'id'                => 202,
			'name'              => 'High-Scale WooCommerce Store & Cart Optimization',
			'slug'              => 'woocommerce-store-optimization',
			'price'             => 1850.00,
			'regular_price'     => 2200.00,
			'short_description' => 'Complete performance audit, custom checkout flow hardening, Redis object caching, and database query index optimization for high-traffic stores.',
			'category'          => 'Performance & CRO',
			'sku'               => 'DEV-WC-OPT',
			'rating'            => 4.9,
			'reviews'           => 22,
			'in_stock'          => true,
		) ),
		new WC_Product( array(
			'id'                => 203,
			'name'              => 'Custom WooCommerce Payment & Gateway Plugin Build',
			'slug'              => 'custom-payment-plugin',
			'price'             => 1400.00,
			'regular_price'     => 1650.00,
			'short_description' => 'Custom object-oriented WooCommerce payment gateway development adhering strictly to WooCommerce Gateway API standards and PCI-DSS compliance.',
			'category'          => 'Plugin Development',
			'sku'               => 'DEV-WC-PAY',
			'rating'            => 5.0,
			'reviews'           => 9,
			'in_stock'          => true,
		) ),
		new WC_Product( array(
			'id'                => 204,
			'name'              => 'Monthly Dedicated Engineering Retainer (40 Hours)',
			'slug'              => 'engineering-retainer',
			'price'             => 4200.00,
			'regular_price'     => 4800.00,
			'short_description' => 'Dedicated senior engineering support for enterprise WooCommerce maintenance, zero-downtime updates, custom REST endpoints, and security audits.',
			'category'          => 'Retainers',
			'sku'               => 'DEV-RET-40',
			'rating'            => 5.0,
			'reviews'           => 31,
			'in_stock'          => true,
		) ),
	);
}

function woocommerce_content() {
	if ( is_product() ) {
		$template = WP_THEME_DIR . '/bones/woocommerce/single-product.php';
	} elseif ( is_cart() ) {
		$template = WP_THEME_DIR . '/bones/woocommerce/cart/cart.php';
	} elseif ( is_checkout() ) {
		$template = WP_THEME_DIR . '/bones/woocommerce/checkout/form-checkout.php';
	} else {
		$template = WP_THEME_DIR . '/bones/woocommerce/archive-product.php';
	}

	if ( file_exists( $template ) ) {
		include $template;
	}
}

function woocommerce_breadcrumb() {
	echo '<nav class="woocommerce-breadcrumb"><a href="?">Home</a> &nbsp;/&nbsp; <a href="?view=shop">Developer Services</a> &nbsp;/&nbsp; Current View</nav>';
}

function woocommerce_output_content_wrapper() {
	echo '<div id="content"><div id="inner-content" class="wrap cf"><main id="main" class="m-all t-2of3 d-5of7 cf" role="main">';
}

function woocommerce_output_content_wrapper_end() {
	echo '</main></div></div>';
}
