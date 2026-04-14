<?php session_start();?>
<?php
if($_GET['msg']=='loggedout'){
	$msg="You are logged out.";
}
// check to see if the form was submitted
if(isset($_POST['submit']) && $_POST['submit'] == 'Log In') {
	$error = false; // no errors so far
	// confirm data exists
	if(empty($_POST['email']) || empty($_POST['password'])) {
		$msg = "<p class=\"error\">All fields are required.</p>";	
		$error = true; // ERROR
	}
	// confirm email format
	if(!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
		$msg = "<p class=\"error\">Problem with email format.</p>";	
		$error = true; // ERROR
	}
	// continue if no errors
	if(!$error) {
		// make db connection
$con = mysqli_connect("localhost","zqhdesig","psycheJ22","zqhdesig_compass");
// Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }				
		$sql = "SELECT `userid`,`password`,`createddate`,`usertypeid` ";
		$sql .= "FROM `users` ";
		$sql .= "WHERE `email` = '".mysqli_real_escape_string($con,$_POST['email']);
		$sql .= "' LIMIT 1;";
		$result = mysqli_query($con, $sql);
		// continue if we found a record
		if(mysqli_num_rows($result)) {
			// get array of data
			$row = mysqli_fetch_array($result);
			// figure out if the password is correct
			$hashedpwd = md5($_POST['password'] . $row['createddate']);
			if($hashedpwd == $row['password']) {
				// set up our session vars
				$_SESSION['fname'] = $row['fname'];
				$_SESSION['lname'] = $row['lname'];
				$_SESSION['userid'] = $row['userid'];
				$_SESSION['usertypeid'] = $row['usertypeid'];
				
				switch($_SESSION['usertypeid']) {
					case 100: header('Location: client.php'); exit();
								break;
					case 200: header('Location: admin.php'); exit();
								break;
					default: header('Location: login.php?msg=error'); exit();
				}
			} else {
				$msg = "<p class=\"error\">HEY! Incorrect login. Please try again.</p>";	
			$error = true;
			} // end password check
		} else {
			$msg = "<p class=\"error\">Incorrect login. Please try again.</p>";	
			$error = true;
		} // end user check
	} // end error check
} // end login check
?>         
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
							<a href="contact.html">contact</a>
						</li>
						<li>
							<a href="signup.php">sign up</a>
						</li>
						<li>
							<a href="login.php">login</a>
						</li>
					</ul>
				</nav>
			</header>
			<div class="susicont">
				<div class="susitypecont">
					<div class="susisi">
						<p id="centertext">
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