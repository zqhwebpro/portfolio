<?php include ('lib/inc/session.php');
if($_POST['submit'] == 'Sign-Up'){
	$error = false;
	extract($_POST);
	$required = array($fname,$lname,$email,$password);
	if(in_array(NULL, $required)){
		$error = true;
		$msg="<p class=\"error\">All Fields are required.</p>";
	}
	if(!$error) {
		$time = time();
		$hashpwd = md5($password.$time);
		// start sql
		$sql="INSERT INTO `users` (`userid`,`usertypeid`,`fname`,`lname`,`email`,`password`,`createddate`,`active`)VALUES (NULL,'100','".mysqli_real_escape_string($con,$fname)."','".mysqli_real_escape_string($con,$lname)."','".mysqli_real_escape_string($con,$email)."','".mysqli_real_escape_string($con,$hashpwd)."',$time,'1');";
$results=mysqli_query($con, $sql);
$userid = mysqli_insert_id();
$msg="<p class=\"alert\">Thank you for joining. You may now login into your <a href=\"login.php\">account.</a></p>";
echo $sql;
	}
}
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
		<title>compass.com - pointing you the right way home</title>
		<link href='https://fonts.googleapis.com/css?family=Montserrat:400,700|Hind'
		rel='stylesheet' type='text/css'>
		<link href="lib/css/styles.css" rel="stylesheet" type="text/css">
		</head>
		<body>
        <div class="fp_contain">
          <header> <a href="#"><img alt="compass, pointing you the right way home" id=
				"imgfloat" src="lib/imgs/compasslogo.png"></a>
            <nav>
              <ul>
               <li>
							<a href="index.html">home</a>
						</li>
                        <li>
							<a href="getpreapproved.html">get pre-approved</a>
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
          <div class="susicont2">
            <div class="susitypecont">
              <div class="susisu">
                <p id="centertext"> Sign up for your free account today. </p>
                <?php if(isset($msg)){echo $msg;}?>
                <form action="<?php echo $_SERVER['PHP_SELF'].'?'.$_SERVER['QUERY_STRING'];?>"
						class="" id="" method="post" name="">
                  <div>
                    <label for="fname">*Your First Name</label>
                    <input name="fname" type=
								"text">
                  </div>
                  <div>
                    <label for="lname">*Your Last Name</label>
                    <input name="lname" type="text">
                  </div>
                  <div>
                    <label for="email">*Your Email</label>
                    <input name="email" type="text">
                  </div>
                  <div>
                    <label for="password">*Desired Password</label>
                    <input name="password" type="password">
                  </div>
                  <p id="formdisc"> By signing up you are agreeing to the <a href="#">terms and
                    conditions</a> of compass.com </p>
                  <div class="btnposallelse">
                    <input id="checkherebtnallelse" name="submit" type="submit" value="Sign-Up">
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="footer_contain">
            <div class="termscontain">
              <h3 id="fontcolordkblue"> Terms & conditions and privacy policy </h3>
              <p id="copyp"> ©zqhdesign.com. 2015. Made at York, AI. </p>
            </div>
          </div>
          <div class="smcont"> <a href="#"><i class="fa fa-twitter fa-3x"></i></a> <a href="#"><i class=
				"fa fa-linkedin-square fa-3x"></i></a> <a href="#"><i class=
				"fa fa-facebook-official fa-3x"></i></a> </div>
          <div class="footer_bot"></div>
        </div>
</body>
</html>