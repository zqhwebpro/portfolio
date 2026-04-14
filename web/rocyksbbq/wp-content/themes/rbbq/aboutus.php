<?php /* Template Name: About Us Template */ ?>

<?php get_header(); ?>

	
    
    
    
<div class="section group sect_1_wrap_r">
	<div class="wrap">
		<div class="col span_6_of_6">
        
        	<?php the_title('<h3>','</h3>'); ?>
 
            </div>
        </div>
    </div>

<div class="sect_2_wrap_w_about">

	<div class="section group">
		<div class="wrap">
    
   	 <div class="col span_6_of_6">
    
    <?php 
				if ( have_posts() ) : while ( have_posts() ) : the_post();
  	
					get_template_part( 'content', get_post_format() );
  
				endwhile; endif; 
	?>



        
	

						
		</div>
       </div>
       </div>
       
       
        
        


        

      
<?php get_footer(); ?>