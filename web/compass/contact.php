<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<script src="lib/scripts/classie.js" type="text/javascript">
		</script>
		<script>
		function init() {
		  window.addEventListener('scroll', function(e){
			  var distanceY = window.pageYOffset || document.documentElement.scrollTop,
				  shrinkOn = 300,
				  header = document.querySelector("header");
			  if (distanceY > shrinkOn) {
				  classie.add(header,"smaller");
			  } else {
				  if (classie.has(header,"smaller")) {
					  classie.remove(header,"smaller");
				  }
			  }
		  });
		}
		window.onload = init();
		</script>
		<link href=
		"https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"
		rel="stylesheet">
		<title>
			compass.com - pointing you the right way home
		</title>
		<link href='https://fonts.googleapis.com/css?family=Montserrat:400,700|Hind'
		rel='stylesheet' type='text/css'>
		<link href="lib/css/styles.css" rel="stylesheet" type="text/css">
	</head>
	<body>
		<div class="fp_contain">
			<header>
				<a href="#"><img alt="compass, pointing you the right way home" id=
				"imgfloat" src="lib/imgs/compasslogo.png"></a>
				<nav>
					<ul>
						<li>
							<a href="index.html">home</a>
						</li>
                        <li>
							<a href="getpreapporved.html">get pre-approved</a>
						</li>
						<li>
							<a href="sellyourhome.html">sell</a>
						</li>
						<li>
							<a href="investors.html">investors</a>
						</li>
						<li>
							<a href="faq.html">faq</a>
						</li>
						<li>
							<a href="testimonials.html">testimonials</a>
						</li>
						<li>
							<a href="signup.php">sign up</a>
						</li>
						<li>
							<a href="login.php">login</a>
						</li>
                        <li>
							<a href="contact.php">contact</a>
						</li>
					</ul>
				</nav>
			</header>
			<div class="contact_contain">
				<div class="contactpage">
					<h1 id="fontcenter">
					  <div id="whitebox">
					    <div id="whitebox2">Contact us today to set up an appointment</div>
					  </div>
					</h1>
                    <div class="contactform">
<form method="post" action="#" id="" class="buyform">
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
<div class="btnposallelse">
								<input id="checkherebtnallelse" name="submit" type="submit" value="Send">
							</div>
</form>
		</div>
	</div>
    <div class="ezcontact_contain">
				<div class="ezcontact_text">
                </div>
                </div>
</div>

<div class="footer_contain">
				<div class="termscontain">
					<h3 id="fontcolordkblue">
						Terms & conditions and privacy policy
					</h3>
					<p id="copyp">
						©zqhdesign.com. 2015. Made at York, AI.
					</p>
				</div>
			</div>
			<div class="smcont">
				<a href="#"><i class="fa fa-twitter fa-3x"></i></a> <a href="#"><i class=
				"fa fa-linkedin-square fa-3x"></i></a> <a href="#"><i class=
				"fa fa-facebook-official fa-3x"></i></a>
			</div>
			<div class="footer_bot"></div>
		</div>
	</body>
</html>