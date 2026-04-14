<?php /* Template Name: Electric Tempalte */ ?>
<?php get_header();?>

<div id="bodycontain">
<div id="bodyinfo">
<h1></h1>
<div id="shopcont">

<?php if (have_posts()) : while (have_posts()) : the_post();?>
<?php the_content(); ?>
<?php endwhile; endif; ?>


<?php 

// start query
$the_query = new WP_Query('category_name=electric&posts_per_page=5');

// start the loops
if ($the_query->have_posts()){
	while ($the_query->have_posts()){
		$the_query->the_post();
				 echo '<div class="shoppost">'.the_post_thumbnail().
                  	'<div class="shoptextcont">'.the_content().'</div></div>';
}
}

/* Restore original post data */

wp_reset_postdata();
?>
</div>
</div>
</div>

<?php get_footer();?>