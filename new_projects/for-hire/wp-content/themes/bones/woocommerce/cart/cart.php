<?php
/**
 * Cart Page Template Override in Bones Theme
 *
 * @package WooCommerce\Templates
 * @version 7.9.0
 */

defined( 'ABSPATH' ) || exit;

woocommerce_breadcrumb();
?>

<div class="woocommerce-cart-wrapper" style="background: #ffffff; border: 1px solid #dcdcde; border-radius: 10px; padding: 2rem;">
	<h1 style="font-size: 1.8rem; font-weight: 800; margin-top: 0; margin-bottom: 1.5rem;">Shopping Cart</h1>

	<div id="cart-content-container">
		<table class="shop_table shop_table_responsive cart woocommerce-cart-form__contents" style="width: 100%; border-collapse: collapse; margin-bottom: 2rem;">
			<thead>
				<tr style="border-bottom: 2px solid #dcdcde; text-align: left;">
					<th style="padding: 0.75rem 0.5rem;">Service Package</th>
					<th style="padding: 0.75rem 0.5rem;">Price</th>
					<th style="padding: 0.75rem 0.5rem;">Qty</th>
					<th style="padding: 0.75rem 0.5rem; text-align: right;">Subtotal</th>
					<th style="padding: 0.75rem 0.5rem; text-align: center;">Remove</th>
				</tr>
			</thead>
			<tbody id="cart-table-body">
				<!-- Live Cart Rows injected by Bones JS -->
			</tbody>
		</table>

		<div class="cart-collaterals" style="display: flex; justify-content: flex-end;">
			<div class="cart_totals" style="width: 100%; max-width: 360px; background: #f8f9fa; border: 1px solid #dcdcde; border-radius: 8px; padding: 1.5rem;">
				<h3 style="margin-top: 0; margin-bottom: 1rem; border-bottom: 1px solid #dcdcde; padding-bottom: 0.5rem;">Cart Totals</h3>
				<div style="display: flex; justify-content: space-between; margin-bottom: 0.75rem; font-size: 0.95rem;">
					<span>Subtotal</span>
					<strong id="cart-subtotal-val">$0.00</strong>
				</div>
				<div style="display: flex; justify-content: space-between; margin-bottom: 1.25rem; font-size: 1.2rem; font-weight: 800; border-top: 2px solid #2271b1; padding-top: 0.75rem;">
					<span>Total</span>
					<strong id="cart-total-val" style="color: #2271b1;">$0.00</strong>
				</div>
				<a href="?view=checkout" class="btn-add-cart" style="width: 100%; justify-content: center; padding: 0.75rem; font-size: 1rem; text-decoration: none;">
					Proceed to Checkout &rarr;
				</a>
			</div>
		</div>
	</div>
</div>
