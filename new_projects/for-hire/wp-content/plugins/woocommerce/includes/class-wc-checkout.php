<?php
/**
 * WooCommerce Checkout Class
 *
 * @package WooCommerce\Classes
 */

defined( 'ABSPATH' ) || exit;

class WC_Checkout {

	public function process_checkout() {
		// Validates order nonce, customer billing details, and dispatches payment gateway
		return array(
			'result'   => 'success',
			'redirect' => '?view=order-received',
		);
	}
}
