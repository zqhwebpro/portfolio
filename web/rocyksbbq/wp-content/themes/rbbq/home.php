<?php /* Template Name: Home Template */ ?>

<?php get_header(); ?>

<div class="section group sect_1_wrap_r">
	<div class="wrap">
		<div class="col span_3_of_6">
			<div>
				<img alt="BBQ on the Go!" id="hl-1" src="http://www.zqhdesign.com/rockysbbq/wp-content/uploads/2016/09/hl-1.png" />
			</div>
		</div>

		<div class="col span_3_of_6">
        	<img alt="Food Truck BBQ" id="hl-img1" src="http://www.zqhdesign.com/rockysbbq/wp-content/uploads/2016/09/food_truck_image.png">
		</div>
        
        
        
        
	</div>
</div>


<div class="section group sect_2_wrap_w">
	<div class="col span_6_of_6 ">
		<p>Truck Food Service, Catering, & Restaurant</p>

		<hr>


		<h2><span class="nexa_red">NEXT STOP</span>: <?php the_field('nsd_text'); ?> </h2>

		<hr>


		<p>BBQ Has Been Our Passion And Hobby For The Past 15 Years.</p>
	</div>
</div>


<div class="section group sect_3_wrap_b">
	<div id="img_roll">
		<div class="col span_2_of_6">
        	<img alt="Beef Brisket" class="i_r" src="http://www.zqhdesign.com/rockysbbq/wp-content/uploads/2016/08/bris.jpg">
		</div>

		<div class="col span_2_of_6">
        	<img alt="Pulled Pork Sandwich" class="i_r" src="http://www.zqhdesign.com/rockysbbq/wp-content/uploads/2016/08/pp.jpg">
		</div>

		<div class="col span_2_of_6">
        	<img alt="Smothered Ribs" class="i_r" src="http://www.zqhdesign.com/rockysbbq/wp-content/uploads/2016/08/ribs.jpg">
		</div>
	</div>
</div>


<div class="section group sect_2_wrap_w">
	<div class="col span_6_of_6">
    
		<h2 id="p_align_1"><span class="nexa_red">FEEDING</span> LANCASTER'S</h2>


		<h2 id="p_align_2">BBQ <span class="nexa_red">LOVERS</span></h2>
		<hr class="hr_marg">

		<p class="widow_85">Through the years we have perfected our unique rubs and sauces, as well as our smoking
		technique. Rocky's BBQ offers authentic wood smoked BBQ. We have created our own signature
		flavor - a combination of traditional Southern BBQ with a hint of Lancaster County.</p>

	</div>
</div>


<div class="section group sect_1_wrap_r">
	<div class="wrap">
        <div class="col span_3_of_6">
          
            <img id="hl-img2" src="<?php the_field('image_right'); ?>" />
            
            </div>
      

        <div class="col span_3_of_6">
      
                <img id="hl-2" src="<?php the_field('image_left'); ?>" />
                
                </div>
        
            
        
	</div>

</div>

<?php get_footer(); ?>