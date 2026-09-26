<?php
/**
 * Bones Dedicated WooCommerce Template
 *
 * This template replaces WooCommerce's default loop with Bones's custom responsive grid layout.
 *
 * @package WordPress
 * @subpackage Bones
 */

get_header(); ?>

<div id="content">
	<div id="inner-content" class="wrap cf">

		<main id="main" class="m-all t-2of3 d-5of7 cf" role="main">
			<?php woocommerce_content(); ?>
		</main>

		<?php get_sidebar(); ?>

	</div>
</div>

<?php get_footer(); ?>
