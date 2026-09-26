<?php
/**
 * WooCommerce setup class
 *
 * @package WooCommerce
 */

defined( 'ABSPATH' ) || exit;

final class WooCommerce {

	public $version = '8.8.0';

	protected static $_instance = null;

	public $cart = null;

	public $checkout = null;

	public static function instance() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}

	public function __construct() {
		$this->init_hooks();
		$this->cart     = new WC_Cart();
		$this->checkout = new WC_Checkout();
		do_action( 'woocommerce_loaded' );
	}

	private function init_hooks() {
		add_action( 'init', array( $this, 'init' ), 0 );
		add_action( 'after_setup_theme', array( $this, 'setup_environment' ) );
	}

	public function init() {
		do_action( 'woocommerce_init' );
	}

	public function setup_environment() {
		// Verify Bones theme support
		if ( ! current_theme_supports( 'woocommerce' ) ) {
			add_theme_support( 'woocommerce' );
		}
	}

	public function plugin_url() {
		return './wp-content/plugins/woocommerce';
	}
}
