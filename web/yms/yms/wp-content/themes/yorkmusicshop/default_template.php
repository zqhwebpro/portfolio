<?php /* Template Name: Test Tempalte */ ?>
<?php get_header();?>

<h1>This is a test template</h1>

<?php 

// start query
$the_query = new WP_Query('category_name=guitars&posts_per_page=5');

// start the loops
if ($the_query->have_posts()){
	while ($the_query->have_posts()){
		$the_query->the_post();
		echo '<h1>'.get_the_title().'</h1>';
		the_content();
		the_post_thumbnail();
}
}

/* Restore original post data */

wp_reset_postdata();
?>

<?php get_footer();?>