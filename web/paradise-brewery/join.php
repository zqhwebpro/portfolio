<?php
if($_POST['submit'] == 'Sign-Up'){
    $error = false;
    extract($_POST);
    $required = array($fname,$lname,$email,$password);
    if(in_array(NULL, $required)){
        $error = true;
        $msg = "<p class=\"error\">All fields are required.</p>";
    }
    if(!$error){
        $time = time();
        $hashpwd = md5($password.$time);
        //Start SQL
        $sql="INSERT INTO `users` (`userid`,`usertypeid`,`fname`,`lname`,`email`,`password`,`createddate`,`active`) VALUES (NULL, '100','".mysqli_real_escape_string($con,$fname)."','".mysqli_real_escape_string($con,$lname)."','".mysqli_real_escape_string($con,$email)."','".mysqli_real_escape_string($con,$hashpwd)."',$time,'1')";
            $results=mysqli_query($con, $sql);
            $userid = mysqli_insert_id();
            $msg = "<p class=\"alert\"> Thank you for joining. You may now login into your <a href=\"login.php\">account.</a></p>";
    }
}
?>
<!-- Readd when database fixed  include 'lib/inc/session.php'; -->
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Paradise Brewery :: Signup</title>
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
						<h1>Sign-up today!</h1>
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
				<div id="adjusted_join">
					<div class="group">
						<div class="grid_6_of_6">
							<h4 class="h4_pos_log">Sign-up For Some Serious Benifits</h4>
							<p class="p_pos_log">Bacon ipsum dolor amet pork belly ham hock pastrami cow bacon pig chuck short ribs biltong
							beef ribs chicken ham t-bone. Kevin shankle sirloin cow capicola frankfurter. Chuck ball tip corned beef turkey
							hamburger short loin rump. Kevin tri-tip t-bone kielbasa cupim, pork chop ham chuck.</p>
						</div>
					</div>
					<div class="group">
						<div class="grid_1_of_6"></div>
						<div class="grid_4_of_6" id="login_box">
							<h4>Sign-up Here</h4><?php if(isset($msg)){echo $msg;}?>
							<form action="%3C?php%20echo%20$_SERVER['PHP_SELF'].'?'.$_SERVER['QUERY_STRING'];?%3E" class="loginform" id=
							"login" method="post" name="login">
								<div class="">
									<label class="" for="fname">*First Name</label> <input class="" id="fname" name="fname" type="text">
								</div>
								<div class="">
									<label class="" for="lname">*Last Name</label> <input class="" id="lname" name="lname" type="text">
								</div>
								<div class="">
									<label class="" for="email">*Email</label> <input class="" id="email" name="email" type="email">
								</div>
								<div class="">
									<label class="" for="password">*Password</label> <input class="" id="password" name="password" type=
									"password">
								</div>
								<div class="">
									<input class="submit_btn" name="submit" type="submit" value="Sign-Up"> <!--Sign-Up collected from top-->
								</div>
							</form>
						</div>
						<div class="grid_1_of_6" id="login_fix"></div>
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
