<?php
session_start();
session_unset();
session_destroy();
header('Location: login.php?msg=loggedout');
?>    
<!DOCTYPE html>
<html>
<head>
	<link href='https://fonts.googleapis.com/css?family=Open+Sans:400,600italic|Lora:400,700italic' rel='stylesheet' type='text/css'>
	<meta charset="utf-8">

	<title>Grace Lutheran Church of Red Lion</title>
	<link href="css/styles.css" rel="stylesheet" type="text/css">
</head>

<body>
	
       <?php include'header.php'; ?>

		<div id="glh_welcome_wrap">
        	
			<div class="group">
				<div class="grid_6_of_6">
					<h1>Welcome to Grace Lutheran</h1><h1 class="twopush">Church of Red Lion</h1>
        	            
<div class="hrish"></div>
	<div class="glh_top">
			
						
					
						</div>
                	</div>
             


				
			</div>
		</div>

		<div class="gl_gry_bar"></div>

		<div id="glh_service_wrap">
			<div class="group">
				<div class="grid_6_of_6">
					<h2 id="glh_service_bar">Offering Two Different Sunday Worship Services:</h2>
				</div>
			</div>


			<div class="group">
            <div class="grid_6_of_6">
            	<p>
							Log in to browse for a future home today.
						</p><?php if(isset($msg)){echo $msg;}?>
						<form action="<?php echo $_SERVER['PHP_SELF'];?>" method="post">
							<div>
								<label for="email">Email:</label> <input id="" name="email" type=
								"text">
							</div>
							<div>
								<label for="password">Password:</label> <input id="" name="password"
								type="password">
							</div>
                            <p id="formdisc">
							By signing up you are agreeing to the <a href="#">terms and
							conditions</a> of compass.com
						</p>
							<div>
								<input id="btnpos" class="checkherebtn" name="submit" type="submit" value="Log In">
							</div>
						</form>
            </div>
				
			</div>
		</div>
        
<div class="gl_gry_bar"></div>

		<div id="glh_event_wrap">
			<div class="group">
				<div class="grid_6_of_6">
					<h3>Join us for one of our upcoming events:</h3>
				</div>
			</div>
            
        
			<div class="group">
				<div class="grid_1_of_6"></div>
                <div class="grid_1_of_6">
					<div class="char u2400">◀</div>
				</div>


				<div class="grid_2_of_6">
                	<div id="event_slider">
					<p>February 10, 2016:</p><p>Ash Wednesday Social @ St. John's</p><p>UCC 6:00 pm, St. John's UCC</p>
                    </div>
				</div>


				<div class="grid_1_of_6">
					<div class="char u2400">▶</div>
				</div>
                <div class="grid_1_of_6"></div>
			</div>
		</div>

<div class="gl_gry_bar"></div>

		<div id="glh_meet_wrap">
			<div class="group">
				<div class="grid_6_of_6">
                <div class="glh_meet1">
					<h3>A close community with one thing in common:</h3>


					<p class="glh_meet_p1">Vestibulum placerat est in orci malesuada, vitae fringilla quam finibus. Cras velit nulla,
					gravida vitae nibh sodales, eleifend vulputate purus. Aliquam scelerisque ipsum orci, vel
					commodo neque gravida sed. Nullam faucibus quis turpis non aliquam. Morbi facilisis, felis in
					maximus laoreet, nulla est suscipit justo.</p>
                    </div>
				</div>
			</div>
            
            
                <div class="group">
				<div class="grid_6_of_6">
					<img src="img/cross.jpg" alt="Believe in higher power!" class="cross" />
				</div>
			</div>


			<div class="group">
				<div class="grid_4_of_6">
                <div class="glh_meet2">
					<h3 class="glh_meet_h3">Anything else? Ask away.</h3>


					<p class="glh_meet_p2">Vestibulum placerat est in orci malesuada. Cras velit nulla, gravida vitae nibh sodales,
					eleifend.</p>


					<a href="#"><div class="gl_button_x">
						Contact Us
					</div></a>
                    
                    </div>
				</div>


				<div class="grid_2_of_6">
				</div>
			</div>
		</div>
<img alt="Pastor Dan" src="img/pastordan.png" class="glh_pastor" />
<div class="gl_gry_bar"></div>

		<div id="gl_footer_wrap">
			<div class="group">
				<div class="grid_3_of_6">
                <div class="glh_footer_box1">
					<h4 class="footer_shift">Grace Lutheran Church of Red Lion</h4>


					<p>220 North Charles Street Red Lion, PA 17356</p><p>Phone: 1-717-244-5987</p>
                   </div>
				</div>


				<div class="grid_3_of_6">
                	<div class="glh_footer_box2">
						<h4>Support the faith.</h4>


						<a href="#"><div class="gl_button_y">
						Donate Today
					</div></a>
                    
                 	</div>
				</div>
			</div>
		</div>
	
    
</body>
</html>