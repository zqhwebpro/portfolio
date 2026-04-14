<?php /* Template Name: Truck Menu Template */ ?>

<?php get_header(); ?>

	
    
    
    
<div class="section group sect_1_wrap_r">
	<div class="wrap">
		<div class="col span_6_of_6">
        
        	<?php the_title('<h3>','</h3>'); ?>
 
            </div>
        </div>
    </div>


<div class="section  sect_2_wrap_w">
	<div class="wrap">
    
    <div class="group">
    
    <div class="col span_6_of_6">
    
    <?php 
				if ( have_posts() ) : while ( have_posts() ) : the_post();
  	
					get_template_part( 'content', get_post_format() );
  
				endwhile; endif; 
	?>
    
    
</div> 

</div>   
    
<?php if( have_rows('menu_sections') ): ?>

<div class="menu">

	<?php while( have_rows('menu_sections') ): the_row();?>
    
    	<h2><?php the_sub_field('section_heading'); ?></h2>
        
        	<?php if( have_rows('menu_items') ): ?>
            	<ul>
				<?php while( have_rows('menu_items') ): the_row();?>
                
                    	<li><span class="item-name"><?php the_sub_field('item_name'); ?></span><br>
                        	<span class="item-desc"><?php the_sub_field('item_desc'); ?></span><span class="price"><?php the_sub_field('item_price'); ?></span>
                        </li>
                    
        		<?php endwhile; ?>
                </ul>
   		   <?php endif; ?>

	<?php endwhile; ?>
</div>

<?php endif; ?>

						
		</div>
</div>
        
        


        

      
<?php get_footer(); ?>