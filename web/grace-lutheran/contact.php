<?php include ('inc/session.php');?>

<!DOCTYPE html>
<html>
<head>
	<link href='https://fonts.googleapis.com/css?family=Open+Sans:400,600italic|Lora:400,700italic'
	rel='stylesheet' type='text/css'>
       <link rel="stylesheet" href="css/font-awesome.min.css">
	<meta charset="utf-8">

	<title>Grace Lutheran Church of Red Lion</title>
	<link href="css/styles.css" rel="stylesheet" type="text/css">
</head>

<body>
		 <?php include'header.php'; ?>


		<div id="glh_welcome_wrap">
			<div class="group">
				<div class="grid_6_of_6">
					<h1>A Call, Email, or Visit Away</h1><h1 class="twopush">from a Answer</h1>
        	            
<div class="hrish"></div>
	<div class="glh_top">
					<img src="img/holytrinity.png" alt="The Holy Trinity" class="glh_ht" />
                    
                    <p>Reach out to us for anything you need.</p>
				</div>
                </div>


				
			</div>
		</div>

		<div class="gl_gry_bar"></div>

		<div id="glh_service_wrap">
			<div class="group">
				<div class="grid_6_of_6">
					<h2 id="glh_service_bar">Contact our Church for Any Reason.</h2>
				</div>
			</div>


			<div class="group">
            <div class="grid_1_of_6"></div>
				<div class="grid_4_of_6">
					<form name="contactform" method="post" action="send_form_email.php">
			<div>
			<label for="fname">First Name:</label><br>
			<input name="fname" id="fname" type="text"/>
			</div>
            <div>
			<label for="lname">Last Name:</label><br>
			<input name="lname" id="lname" type="text"/>
			</div>
			<div>
			<label for="email">Your Email:</label><br>
			<input name="email" id="email" type="text"/>
			</div>
			<div>
			<label for="subject">Subject:</label><br>
			<input name="subject" id="subject" type="text"/>
			</div>
			<div>
			<label for="comment-text">Comment:</label><br>
			<textarea rows="10" cols="50" name="comment-text" id="comment-text"></textarea>
			</div>
			<div>
			<button type="submit"> Submit </button>
			</div>
			</form>
			</div>
            <div class="grid_1_of_6"></div>
		</div>
                    
	</div>
                    
                    
                    
                    
                    
                    
                    
                    
                    

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