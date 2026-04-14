<?php /* Template Name: Contact Template */ ?>

<?php get_header(); ?>

	
<div class="section group sect_1_wrap_r">
	

<div class="section group">
	<div class="wrap">
        <div class="col span_3_of_6">
          <img src="<?php the_field('image_left'); ?>" />
            
            
            </div>
      

        <div class="col span_3_of_6">
      
                
               	 <p class="about_us_blurb"><?php the_field('contact_form'); ?></p>
                </div>
      
        
       </div>
	</div>
	</div>
</div>





<?php get_footer(); ?>