<?php
/**
 * Custom Post Type Registration for "For Hire" portfolio case studies & quotes
 *
 * @package WordPress
 * @subpackage Bones
 */

function bones_register_custom_post_types() {
	// Register "Client Project" Custom Post Type
	$labels = array(
		'name'               => __( 'Client Projects', 'bonestheme' ),
		'singular_name'      => __( 'Client Project', 'bonestheme' ),
		'menu_name'          => __( 'Client Projects', 'bonestheme' ),
		'add_new'            => __( 'Add New Project', 'bonestheme' ),
		'add_new_item'       => __( 'Add New Client Project', 'bonestheme' ),
		'edit_item'          => __( 'Edit Client Project', 'bonestheme' ),
		'all_items'          => __( 'All Client Projects', 'bonestheme' ),
	);

	$args = array(
		'labels'             => $labels,
		'public'             => true,
		'has_archive'        => true,
		'menu_icon'          => 'dashicons-portfolio',
		'supports'           => array( 'title', 'editor', 'thumbnail', 'excerpt', 'custom-fields' ),
		'rewrite'            => array( 'slug' => 'client-projects' ),
		'show_in_rest'       => true,
	);

	if ( function_exists( 'register_post_type' ) ) {
		register_post_type( 'client_project', $args );
	}
}
add_action( 'init', 'bones_register_custom_post_types' );
