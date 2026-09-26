<?php
/**
 * Checkout Form Template Override in Bones Theme
 *
 * @package WooCommerce\Templates
 * @version 3.5.0
 */

defined( 'ABSPATH' ) || exit;

woocommerce_breadcrumb();
?>

<div class="woocommerce-checkout-wrapper" style="background: #ffffff; border: 1px solid #dcdcde; border-radius: 10px; padding: 2rem;">
	<h1 style="font-size: 1.8rem; font-weight: 800; margin-top: 0; margin-bottom: 1.5rem;">Checkout &amp; Service Agreement</h1>

	<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
		<!-- Billing & Client Details -->
		<div>
			<h3 style="margin-top: 0; margin-bottom: 1rem; border-bottom: 2px solid #2271b1; padding-bottom: 0.5rem;">Client &amp; Company Details</h3>
			<form id="checkout-form" onsubmit="event.preventDefault(); window.submitOrder();">
				<div style="margin-bottom: 1rem;">
					<label style="display: block; font-weight: 600; font-size: 0.9rem; margin-bottom: 0.3rem;">Full Name *</label>
					<input type="text" id="billing-name" required value="Enterprise Client" style="width: 100%; padding: 0.6rem; border: 1px solid #dcdcde; border-radius: 4px;" />
				</div>
				<div style="margin-bottom: 1rem;">
					<label style="display: block; font-weight: 600; font-size: 0.9rem; margin-bottom: 0.3rem;">Work Email *</label>
					<input type="email" id="billing-email" required value="client@enterprise.com" style="width: 100%; padding: 0.6rem; border: 1px solid #dcdcde; border-radius: 4px;" />
				</div>
				<div style="margin-bottom: 1rem;">
					<label style="display: block; font-weight: 600; font-size: 0.9rem; margin-bottom: 0.3rem;">Project Scope &amp; Repository Notes</label>
					<textarea id="billing-notes" rows="4" style="width: 100%; padding: 0.6rem; border: 1px solid #dcdcde; border-radius: 4px;" placeholder="Describe timeline requirements, existing WordPress setup, and custom integrations..."></textarea>
				</div>
			</form>
		</div>

		<!-- Order Review & Contract Terms -->
		<div style="background: #f8f9fa; border: 1px solid #dcdcde; border-radius: 8px; padding: 1.5rem;">
			<h3 style="margin-top: 0; margin-bottom: 1rem; border-bottom: 1px solid #dcdcde; padding-bottom: 0.5rem;">Order Review</h3>
			<div id="checkout-order-items" style="margin-bottom: 1rem;">
				<!-- Live Items Injected Here -->
			</div>
			<div style="border-top: 2px solid #2271b1; padding-top: 1rem; margin-top: 1rem;">
				<div style="display: flex; justify-content: space-between; font-size: 1.2rem; font-weight: 800; margin-bottom: 1.5rem;">
					<span>Total Investment:</span>
					<strong id="checkout-total-val" style="color: #2271b1;">$0.00</strong>
				</div>
				<button type="button" class="btn-add-cart" style="width: 100%; justify-content: center; padding: 0.85rem; font-size: 1.05rem;" onclick="window.submitOrder()">
					Place Order &amp; Initiate Contract
				</button>
			</div>
		</div>
	</div>
</div>
