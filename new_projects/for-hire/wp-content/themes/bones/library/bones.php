<?php
/**
 * Bones Core Cleaning and Optimization Functions
 *
 * @package WordPress
 * @subpackage Bones
 */

function bones_head_cleanup() {
	// Category feeds
	remove_action( 'wp_head', 'feed_links_extra', 3 );
	// Post and comment feeds
	remove_action( 'wp_head', 'feed_links', 2 );
	// EditURI link
	remove_action( 'wp_head', 'rsd_link' );
	// Windows Live Writer
	remove_action( 'wp_head', 'wlwmanifest_link' );
	// Previous / Next post links
	remove_action( 'wp_head', 'parent_post_rel_link', 10, 0 );
	remove_action( 'wp_head', 'start_post_rel_link', 10, 0 );
	remove_action( 'wp_head', 'adjacent_posts_rel_link_wp_head', 10, 0 );
	// WP version
	remove_action( 'wp_head', 'wp_generator' );
}

function bones_rss_version() {
	return '';
}
add_filter( 'the_generator', 'bones_rss_version' );

/**
 * Bones Numeric Page Navigation
 */
function bones_page_navi() {
	echo '<nav class="pagination"><span class="current">1</span> <a href="#" class="page">2</a> <a href="#" class="next">&raquo;</a></nav>';
}
