<?php
/**
 * Main WordPress Procedural API and Core Functions
 *
 * @package WordPress
 */

global $wp_theme_features, $wp_styles, $wp_scripts, $wp_registered_sidebars;

$wp_theme_features = array();
$wp_styles = array();
$wp_scripts = array();
$wp_registered_sidebars = array();

function add_theme_support( $feature, ...$args ) {
	global $wp_theme_features;
	$wp_theme_features[ $feature ] = empty( $args ) ? true : $args[0];
}

function current_theme_supports( $feature ) {
	global $wp_theme_features;
	return isset( $wp_theme_features[ $feature ] );
}

function wp_head() {
	do_action( 'wp_head' );
}

function wp_footer() {
	do_action( 'wp_footer' );
}

function get_header( $name = null ) {
	do_action( 'get_header', $name );
	$file = WP_THEME_DIR . '/bones/header.php';
	if ( file_exists( $file ) ) {
		require $file;
	}
}

function get_footer( $name = null ) {
	do_action( 'get_footer', $name );
	$file = WP_THEME_DIR . '/bones/footer.php';
	if ( file_exists( $file ) ) {
		require $file;
	}
}

function get_sidebar( $name = null ) {
	do_action( 'get_sidebar', $name );
	$file = WP_THEME_DIR . '/bones/sidebar.php';
	if ( file_exists( $file ) ) {
		require $file;
	}
}

function get_template_directory_uri() {
	return './wp-content/themes/bones';
}

function get_stylesheet_directory_uri() {
	return get_template_directory_uri();
}

function register_nav_menus( $locations = array() ) {
	global $wp_registered_nav_menus;
	$wp_registered_nav_menus = array_merge( (array) $wp_registered_nav_menus, $locations );
}

function register_sidebar( $args = array() ) {
	global $wp_registered_sidebars;
	$defaults = array(
		'name'          => 'Sidebar',
		'id'            => 'sidebar-1',
		'description'   => '',
		'before_widget' => '<div class="widget">',
		'after_widget'  => '</div>',
		'before_title'  => '<h4 class="widgettitle">',
		'after_title'   => '</h4>',
	);
	$sidebar = array_merge( $defaults, $args );
	$wp_registered_sidebars[ $sidebar['id'] ] = $sidebar;
}

function is_active_sidebar( $index ) {
	global $wp_registered_sidebars;
	return isset( $wp_registered_sidebars[ $index ] );
}

function dynamic_sidebar( $index = 1 ) {
	global $wp_registered_sidebars;
	if ( isset( $wp_registered_sidebars[ $index ] ) ) {
		$sidebar = $wp_registered_sidebars[ $index ];
		echo $sidebar['before_widget'];
		echo $sidebar['before_title'] . 'For Hire — Developer Info' . $sidebar['after_title'];
		echo '<p>Senior Full-Stack &amp; WooCommerce engineer specializing in custom Bones themes, performance optimization, and REST API development.</p>';
		echo $sidebar['after_widget'];
		return true;
	}
	return false;
}

function wp_enqueue_style( $handle, $src = '', $deps = array(), $ver = false, $media = 'all' ) {
	global $wp_styles;
	$wp_styles[ $handle ] = array(
		'src'   => $src,
		'deps'  => $deps,
		'ver'   => $ver,
		'media' => $media,
	);
}

function wp_enqueue_script( $handle, $src = '', $deps = array(), $ver = false, $in_footer = false ) {
	global $wp_scripts;
	$wp_scripts[ $handle ] = array(
		'src'       => $src,
		'deps'      => $deps,
		'ver'       => $ver,
		'in_footer' => $in_footer,
	);
}

// Simulated query loop data for "For Hire" packages
global $wp_query_posts, $wp_current_post_index;
$wp_query_posts = array(
	array(
		'ID'        => 101,
		'title'     => 'Custom WooCommerce & WordPress Theme Engineering',
		'content'   => 'Full architecture of responsive, lightweight custom WordPress themes built on Bones with custom post types, WooCommerce template overrides, and PageSpeed optimization.',
		'excerpt'   => 'Bespoke WordPress theme architecture utilizing the Bones developer boilerplate and full WooCommerce integration.',
		'permalink' => '?service=custom-theme',
		'date'      => '2026-09-26',
	),
	array(
		'ID'        => 102,
		'title'     => 'WooCommerce High-Volume Store Optimization & Checkout Hardening',
		'content'   => 'Complete audit, database query optimization, Redis object caching, and custom checkout flows tailored for conversion rate optimization.',
		'excerpt'   => 'Optimizing high-traffic WooCommerce stores for sub-second page loads and seamless multi-step checkout.',
		'permalink' => '?service=store-optimization',
		'date'      => '2026-09-26',
	),
	array(
		'ID'        => 103,
		'title'     => 'REST API & Custom Plugin Microservice Architecture',
		'content'   => 'Designing secure custom WordPress plugins and REST endpoints with OAuth2 authentication, webhook listeners, and third-party ERP integrations.',
		'excerpt'   => 'Extending WordPress core with secure, object-oriented plugin architecture.',
		'permalink' => '?service=rest-api',
		'date'      => '2026-09-26',
	),
);
$wp_current_post_index = 0;

function wp() {
	global $wp_current_post_index;
	$wp_current_post_index = 0;
}

function have_posts() {
	global $wp_query_posts, $wp_current_post_index;
	return $wp_current_post_index < count( $wp_query_posts );
}

function the_post() {
	global $wp_query_posts, $wp_current_post_index, $post;
	$post = (object) $wp_query_posts[ $wp_current_post_index ];
	$wp_current_post_index++;
}

function the_title() {
	global $post;
	echo esc_html( $post->title );
}

function the_content() {
	global $post;
	echo '<p>' . nl2br( esc_html( $post->content ) ) . '</p>';
}

function the_excerpt() {
	global $post;
	echo esc_html( $post->excerpt );
}

function the_permalink() {
	global $post;
	echo esc_url( $post->permalink );
}

function the_time( $format = 'Y-m-d' ) {
	global $post;
	echo esc_html( $post->date );
}

function esc_html( $text ) {
	return htmlspecialchars( (string) $text, ENT_QUOTES, 'UTF-8' );
}

function esc_url( $url ) {
	return filter_var( $url, FILTER_SANITIZE_URL );
}

function esc_attr( $text ) {
	return htmlspecialchars( (string) $text, ENT_QUOTES, 'UTF-8' );
}

function body_class( $class = '' ) {
	$classes = array( 'bones-theme', 'woocommerce-active' );
	if ( function_exists( 'is_woocommerce' ) && is_woocommerce() ) {
		$classes[] = 'woocommerce';
		$classes[] = 'woocommerce-page';
	}
	if ( ! empty( $class ) ) {
		$classes[] = $class;
	}
	echo 'class="' . esc_attr( implode( ' ', $classes ) ) . '"';
}

function post_class( $class = '' ) {
	echo 'class="post entry-post ' . esc_attr( $class ) . '"';
}

function language_attributes() {
	echo 'lang="en-US"';
}

function bloginfo( $show = 'name' ) {
	if ( 'name' === $show ) {
		echo 'For Hire — WordPress &amp; WooCommerce Developer';
	} elseif ( 'description' === $show ) {
		echo 'Bones Theme &amp; WooCommerce Production Architecture';
	} elseif ( 'charset' === $show ) {
		echo 'UTF-8';
	}
}

function wp_title( $sep = '&raquo;', $display = true, $seplocation = '' ) {
	$title = 'For Hire | WordPress + Bones + WooCommerce Architecture';
	if ( $display ) {
		echo $title;
	}
	return $title;
}
