<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Paradise Brewery :: Contact</title>
	<link href="https://fonts.googleapis.com/css?family=Dosis" rel="stylesheet" type="text/css">
	<link href="https://fonts.googleapis.com/css?family=Permanent+Marker" rel="stylesheet" type="text/css">
	<link href="lib/css/styles.css" rel="stylesheet" type="text/css">
</head>
<body>
	<div id="pb_sitewrap">
		<div class="group" id="pb_navwrap">
			<div class="grid_2_of_6">
				<div class="pb_nav_l">
					<ul>
						<li>
							<a href="index.html">Home</a>
						</li>
						<li>
							<a href="about.html">About</a>
						</li>
					</ul>
				</div>
			</div>
			<div class="grid_2_of_6">
				<a href="index.html"><img alt="changeme" class="logo_pos" src="lib/imgs/placeholderlogo.png"></a>
			</div>
			<div class="grid_2_of_6">
				<div class="pb_nav_r">
					<ul>
						<li>
							<a href="contact.php">Contact</a>
						</li>
						<li>
							<a href="products.php">Products</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div id="pb_body">
			<img alt=" " class="torn_edges" src="lib/imgs/ripped_paper.png">
			<div class="body_1">
				<div class="group">
					<div class="grid_4_of_6" id="hl_top">
						<h1>Contact Us!</h1>
					</div>
					<div class="grid_2_of_6">
						<a href="#"><img alt="Shop Paradise" id="cta_shift" src="lib/imgs/cb_cta.png"></a> <img alt="Shop Paradise" id=
						"cta_shift_back" src="lib/imgs/cb_cta_back.png">
						<div id="ecom_cta">
							<ul>
								<li>
									<a href="join.php">• Create An Account</a>
								</li>
								<li>
									<a href="login.php">• Log In</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div class="group">
					<div class="grid_1_of_6"></div>
					<div class="grid_4_of_6">
						<p id="remove_top_contact">Bacon ipsum dolor amet pork belly ham hock pastrami cow bacon pig chuck short ribs
						biltong beef ribs chicken ham t-bone. Kevin shankle sirloin cow capicola frankfurter. Chuck ball tip corned beef
						turkey hamburger short loin rump. Kevin tri-tip t-bone kielbasa cupim, pork chop ham chuck.</p><br>
					</div>
					<div class="grid_1_of_6"></div>
				</div>
				<div id="adjusted_contact">
					<div class="group">
						<div class="grid_1_of_6"></div>
						<div class="grid_4_of_6">
							<h4>Contact with any questions, concerns, or for information.</h4>
							<form method="post" action="#" class="contactform">
	<?php
	$fname= $_POST['fname'];
	$lname= $_POST['lname'];
	$email= $_POST['email'];
	$message= $_POST['message'];
	$from= 'From: Contact Form';
	$to= 'zqhmagic@gmail.com';
	$subject = 'Contact Form Message';
	$human = $_POST['human'];
	
	$body = "Fire Name: $fname\n Last Name: $lname\n E-mail: $email\n Message:\n $message";
	
	if($_POST['submit'] && $human == '4'){
		if(mail ($to, $subject, $body, $form)){
			echo '<p class="alert"> Your message has been sent!</p>';
		}else{
			echo '<p class="alert"> Something went wrong, go back and try again.</p>';
		}
	}else if($_POST['submit'] && $human !='4'){
		echo '<p class="alert"> Your answered the anti-spam question incorrectly!</p>';
	}
?>

<div>
	<label for="fname"> First Name: </label>
    <input type="text" name="fname"/>
</div>
<div>
	<label for="lname"> Last Name: </label>
    <input type="text" name="lname" required/>
</div>
<div>
	<label for="email"> E-mail: </label>
    <input type="email" name="email" required/>
</div>
<div>
	<label for="message"> Message: </label>
    <textarea name="message" placeholder="Type Your Message Here." required></textarea>
</div>
<div>
	<label>What is 2+2?</label>
    <input type="text" name="human"/>
</div>
<div>
	<input type ="submit" class="cont_btn" name="submit" value="Send!"/>
</div>
</form>
							
						</div>
						<div class="grid_1_of_6"></div>
					</div>
					<div class="group">
						<div class="grid_4_of_6">
							<h4 class="cont_h4">Visit the Brewery.</h4>
							<p class="cont_p">Bacon ipsum dolor amet pork belly ham hock pastrami cow bacon pig chuck short ribs biltong
							beef ribs chicken ham t-bone. Kevin shankle sirloin cow capicola frankfurter. Chuck ball tip corned beef turkey
							hamburger short loin rump. Kevin tri-tip t-bone kielbasa cupim, pork chop ham chuck.</p>
						</div>
						<div class="grid_2_of_6">
							<a href="connect.html"><img alt="Find Paradise Brewery" id="g_map2" src="lib/imgs/map_g.png"></a>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div id="pb_footerwrap">
			<div class="group">
				<div class="grid_2_of_6">
					<div class="pb_nav_l">
						<ul>
							<li>
								<a href="faq.html">Frequently Asked</a>
							</li>
							<li>
								<a href="search.php"><img src="lib/imgs/searchicon.png" alt="Find Here" id="searchic" />Search</a>
							</li>
						</ul>
					</div>
				</div>
				<div class="grid_2_of_6">
					<a href="index.html"><img alt="changeme" class="logo_pos_2" src="lib/imgs/placeholderlogo.png"></a>
				</div>
				<div class="grid_2_of_6">
					<div class="pb_nav_r">
						<ul>
							<li>
								<a href="join.php">Create an Account</a>
							</li>
							<li>
								<a href="login.php">Login</a>
							</li>
							<li><img alt="Accepted Payment Forms" id="footer_cc" src="lib/imgs/Credit_Card_Icons.png"></li>
						</ul>
					</div>
				</div>
			</div>
			<div class="group">
				<div class="grid_6_of_6"></div>
			</div>
		</div>
	</div>
</body>
</html>