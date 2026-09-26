<?php get_header(); ?>

<div id="content">
	<div id="inner-content" class="wrap cf">

		<main id="main" class="m-all t-2of3 d-5of7 cf" role="main">

			<div class="bones-hero-banner">
				<h1>Custom WordPress &amp; WooCommerce Engineering</h1>
				<p>Production-grade Bones theme architecture, custom post types, and WooCommerce template customization tailored for high-performance client delivery.</p>
				<div class="hero-tags">
					<span class="hero-tag">WordPress 6.5+</span>
					<span class="hero-tag">Bones Theme</span>
					<span class="hero-tag">WooCommerce 8.8+</span>
					<span class="hero-tag">PHP 8+ OOP</span>
					<span class="hero-tag">REST API</span>
				</div>
			</div>

			<h2 style="font-size: 1.4rem; font-weight: 800; margin-bottom: 1.25rem;">Technical Capabilities &amp; Services</h2>

			<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>

				<article <?php post_class( 'cf' ); ?> role="article" style="background: #ffffff; border: 1px solid #dcdcde; border-radius: 8px; padding: 1.5rem; margin-bottom: 1.5rem;">
					<header class="article-header">
						<h3 class="h2 entry-title" style="margin: 0 0 0.5rem;"><a href="<?php the_permalink(); ?>" rel="bookmark" title="<?php the_title_attribute(); ?>"><?php the_title(); ?></a></h3>
						<p class="byline entry-meta vcard" style="font-size: 0.82rem; color: #646970; margin-bottom: 1rem;">
							Engineering Spec &bull; <time datetime="<?php the_time('Y-m-d'); ?>"><?php the_time('F j, Y'); ?></time>
						</p>
					</header>

					<section class="entry-content cf">
						<?php the_excerpt(); ?>
					</section>

					<footer class="article-footer cf" style="margin-top: 1rem; padding-top: 0.75rem; border-top: 1px solid #f0f0f1;">
						<a href="?view=shop" class="btn-add-cart" style="font-size: 0.85rem; padding: 0.4rem 0.8rem;">View Service in WooCommerce &rarr;</a>
					</footer>
				</article>

			<?php endwhile; endif; ?>

		</main>

		<?php get_sidebar(); ?>

	</div>
</div>

<?php get_footer(); ?>
