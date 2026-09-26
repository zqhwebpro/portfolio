<?php
/**
 * The Template for displaying all single products in Bones Theme
 *
 * @package WooCommerce\Templates
 * @version 1.6.4
 */

defined( 'ABSPATH' ) || exit;

woocommerce_breadcrumb();

$products = wc_get_products();
$product = $products[0];
?>

<div class="product-single-wrapper" style="background: #ffffff; border: 1px solid #dcdcde; border-radius: 10px; padding: 2rem; margin-bottom: 2rem;">
	<div class="product-header" style="margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 1px solid #f0f0f1;">
		<span class="product-category-badge"><?php echo esc_html( $product->get_category() ); ?></span>
		<h1 style="font-size: 1.8rem; font-weight: 800; margin: 0.8rem 0 0.4rem; color: #1e1e1e;">
			<?php echo esc_html( $product->get_name() ); ?>
		</h1>
		<div style="font-family: var(--font-mono); font-size: 0.8rem; color: #646970;">
			SKU: <?php echo esc_html( $product->get_sku() ); ?> &bull; Status: In Stock (Ready for Booking)
		</div>
	</div>

	<div style="font-size: 1.6rem; font-weight: 800; margin-bottom: 1.5rem; color: #2271b1;">
		<?php echo $product->get_price_html(); ?>
	</div>

	<div style="font-size: 1rem; color: #3c434a; line-height: 1.7; margin-bottom: 2rem;">
		<p><?php echo esc_html( $product->short_description ); ?></p>
		<p>Deliverables include full Git version control, custom post type scaffolding, mobile-first responsive stylesheets, REST API schema definitions, and 30 days of post-launch stabilization support.</p>
	</div>

	<div style="display: flex; gap: 1rem; align-items: center; margin-bottom: 2rem;">
		<button type="button" class="btn-add-cart" style="padding: 0.8rem 1.6rem; font-size: 1rem;" onclick="window.wcAddToCart(<?php echo $product->get_id(); ?>)">
			Book Package &amp; Add to Cart
		</button>
		<a href="?view=shop" style="font-weight: 600; font-size: 0.95rem; color: #646970; text-decoration: none;">
			&larr; Back to All Services
		</a>
	</div>
</div>
