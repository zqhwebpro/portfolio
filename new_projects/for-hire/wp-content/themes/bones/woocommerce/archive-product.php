<?php
/**
 * The Template for displaying product archives / service catalog in Bones Theme
 *
 * @package WooCommerce\Templates
 * @version 8.6.0
 */

defined( 'ABSPATH' ) || exit;

woocommerce_breadcrumb();
?>

<div class="bones-hero-banner" style="padding: 1.8rem 2rem; margin-bottom: 2rem;">
	<h1 style="font-size: 1.8rem; margin-bottom: 0.5rem;">For Hire // WooCommerce Service Packages</h1>
	<p style="font-size: 0.95rem; margin-bottom: 0;">Select a contract package or retainer below to add to your order, or customize terms via checkout.</p>
</div>

<header class="woocommerce-products-header" style="margin-bottom: 1.5rem;">
	<div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
		<span style="font-weight: 700; color: #2c3338; font-size: 0.95rem;">Showing all 4 engineering packages</span>
		<span style="font-size: 0.85rem; color: #646970;">Powered by Bones + WooCommerce</span>
	</div>
</header>

<div class="products-grid">
	<?php
	$products = wc_get_products();
	foreach ( $products as $product ) :
	?>
		<article class="product-card">
			<div class="product-card-header">
				<span class="product-category-badge"><?php echo esc_html( $product->get_category() ); ?></span>
				<span class="product-sku"><?php echo esc_html( $product->get_sku() ); ?></span>
			</div>

			<div class="product-card-body">
				<h2 class="product-title">
					<a href="<?php echo esc_url( $product->get_permalink() ); ?>">
						<?php echo esc_html( $product->get_name() ); ?>
					</a>
				</h2>

				<p class="product-desc">
					<?php echo esc_html( $product->short_description ); ?>
				</p>
			</div>

			<div class="product-card-footer">
				<div class="product-price">
					<?php echo $product->get_price_html(); ?>
				</div>

				<button type="button" class="btn-add-cart" onclick="window.wcAddToCart(<?php echo $product->get_id(); ?>)">
					Add to Cart
				</button>
			</div>
		</article>
	<?php endforeach; ?>
</div>
