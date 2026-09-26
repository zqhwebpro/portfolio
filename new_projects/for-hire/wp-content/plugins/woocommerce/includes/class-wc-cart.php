<?php
/**
 * WooCommerce Cart Class
 *
 * @package WooCommerce\Classes
 */

defined( 'ABSPATH' ) || exit;

class WC_Cart {

	protected $cart_contents = array();
	protected $applied_coupons = array();

	public function __construct() {
		// Initialize session cart
	}

	public function get_cart_contents_count() {
		return count( $this->cart_contents );
	}

	public function get_subtotal() {
		$subtotal = 0;
		foreach ( $this->cart_contents as $item ) {
			$subtotal += $item['price'] * $item['quantity'];
		}
		return $subtotal;
	}

	public function get_total() {
		return $this->get_subtotal();
	}
}
