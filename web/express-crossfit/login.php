<?php session_start();?><?php
if($_GET['msg']=='loggedout'){
    $msg="You are logged out.";
}
// check to see if the form was submitted
if(isset($_POST['submit']) || $_POST['submit'] == 'Log In') {
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
        $con = mysqli_connect("localhost","zqhdesig","psycheJ22","zqhdesig_expresscrossfit");
        // Check connection
        if (mysqli_connect_errno()){
          echo "Failed to connect to MySQL: " . mysqli_connect_error();
        }
                $sql = "SELECT *";
                $sql .= " FROM `users`";
                $sql .= " WHERE `email` = '".mysqli_real_escape_string($con, $_POST['email'])."'";
                $sql .= " AND `password` = '".mysqli_real_escape_string($con, $_POST['password'])."'";
                $sql .= " LIMIT 1;";
                $result = mysqli_query($con, $sql);
                // continue if we found a record
                if(mysqli_num_rows($result)) {
                    // get array of data
                    $row = mysqli_fetch_array($result);
                    // figure out if the password is correct
                        // set up our session vars
                        $_SESSION['email'] = $row['email'];
                        $_SESSION['password'] = $row['password'];
                        $_SESSION['userid'] = $row['userid'];
                        $_SESSION['roleid'] = $row['roleid'];

                        switch($_SESSION['roleid']) {
                            case 100: header('Location: client.php'); exit();
                                        break;
                            case 200: header('Location: admin.php'); exit();
                                        break;
                            default: header('Location: login.php?msg=error'); exit();
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
	<meta charset="UTF-8">
	<meta content="width=device-width, initial-scale=1" name="viewport">
	<title>Express CrossFit: About Us</title>
	<link href="css/styles.css" rel="stylesheet" type="text/css">
	<script src="http://code.jquery.com/jquery-1.9.1.min.js">
	</script>
	<link href='https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300,700' rel='stylesheet' type='text/css'>
	<link href='https://fonts.googleapis.com/css?family=Yantramanav:900' rel='stylesheet' type='text/css'>
	<link href='https://fonts.googleapis.com/css?family=Raleway:400,900' rel='stylesheet' type='text/css'>
	<style>
	       .mobile__button p {
	        display: block;
	        }
	        @media screen and (min-width: 1350px) {
	            .mobile__button p {
	                display: none; } }

	        @media screen and (max-width: 1350px) {
	           #main-nav{
	               display:none;
	           }
	        }

	       .mobile__nav {
	        display: none; }
	        .mobile__nav a {
	            -webkit-transition: 0.2s ease-in-out;
	            -moz-transition: 0.2s ease-in-out;
	            -o-transition: 0.2s ease-in-out;
	            transition: 0.2s ease-in-out; }
	            .mobile__nav a:hover,
	        .mobile__nav a:focus {
	                }
	        @media screen and (min-width: 1350px) {
	            .mobile__nav {
	                display: none; } }
	</style>
</head>
<body>
  <div class="wrap">
  <div class="group" id="header_group">
    <div class="grid_2_of_6"><img alt="Express Crossfit - Get Built" id="ec_headerlogo" src="img/expressfit.png"></div>
    <div class="grid_4_of_6" id="address_group">
      <p class="f_r_8">7018 E. Road. • York, PA</p><br>
      <div class="marg_bot_sm"></div>
      <p class="f_r_8"><a href="tel:717-854-4831">717-854-4831</a></p>
    </div>
  </div>
  <nav class="group" id="ec_nav">
    <div class="grid_6_of_6" id="main-nav">
      <ul>
        <li>
          <a href="index.html">HOME</a>
        </li>
        <li>
          <a href="about.html">ABOUT</a>
        </li>
        <li>
          <a href="trainers.html">TRAINERS</a>
        </li>
        <li>
          <a href="membership.html">MEMBERSHIP</a>
        </li>
        <li>
          <a href="schedule.html">SCHEDULE</a>
        </li>
        <li>
          <a href="contact.php">CONTACT</a>
        </li>
      </ul>
    </div>
    <div class="mobile-nav">
      <div class="mobile__button">
        <p>Menu <span>☰</span></p>
      </div>
      <nav class="mobile__nav">
        <ul>
          <li>
            <a href="index.html">HOME</a>
          </li>
          <li>
            <a href="about.html">ABOUT</a>
          </li>
          <li>
            <a href="trainers.html">TRAINERS</a>
          </li>
          <li>
            <a href="membership.html">MEMBERSHIP</a>
          </li>
          <li>
            <a href="schedule.html">SCHEDULE</a>
          </li>
          <li>
            <a href="contact.php">CONTACT</a>
          </li>
        </ul>
      </nav>
    </div>
  </nav>
		<div class="content_group">
			<div class="group">
				<div class="grid_6_of_6">
					<h1 id="multipage_hl">Admin Login</h1>
				</div>
			</div>
		</div>
		<div id="admintop_group">
			<div class="group">
				<div class="marg_bot_med"></div>
				<div class="grid_6_of_6">
					<h2>Login</h2>
				</div>
			</div>
			<div class="group">
				<div class="grid_6_of_6">
					<?php if(isset($msg)){echo $msg;}?>
					<form action="%3C?php%20echo%20$_SERVER['PHP_SELF'];?%3E" class="loginform" method="post">
						<div>
							<label for="email">Email:</label> <input id="" name="email" type="text">
						</div>
						<div>
							<label for="password">Password:</label> <input id="" name="password" type="password">
						</div>
						<div class="btnpos">
							<input class="gry_btn" id="gry_btn_log" name="submit" type="submit" value="Log In">
						</div>
					</form>
				</div>
			</div>
		</div>
    <div class="group" id="footer_group">
      <div class="grid_2_of_6" id="footer_addr">
        <h4 class="t_b_c_marg_y">7018 E. Road. • York, PA</h4><br>
        <h4 class="t_b_c_marg_y"><a href="tel:717-854-4831">717-854-4831</a></h4><br>
        <h4 class="t_b_c_marg_y"><a href="mailto:train@expresscrossfit.com">train@expresscrossfit.com</a></h4><br>
      </div>
      <div class="grid_2_of_6" id="footer_sm">
        <h5 class="t_b_c_marg_y">Get in touch.</h5><a href="#"><img alt="FB" src="img/sm_facebook.png"></a> <a href="#"><img alt="Tw" src="img/sm_twitter.png"></a> <a href="#"><img alt="Li" src="img/sm_linked.png"></a> <a href="#"><img alt="Yt" src="img/sm_youtube.png"></a>
      </div>
      <div class="grid_2_of_6" id="footer_map">
        <a href="https://www.google.com/maps/dir//Semper+Fitness+24%2F7,+178+Leader+Heights+Rd,+York,+PA+17402/@39.9099313,-76.7689479,12z/data=!3m1!4b1!4m8!4m7!1m0!1m5!1m1!1s0x406fe2e83d552ff5:0xdbbba6fc5b3ab9b2!2m2!1d-76.6989079!2d39.9099524" target="_blank"><img alt="Click For More Info!" class="t_b_c_marg_z rotate-center" id="footer_map_select" height="171" src="img/horizonmap_ec.jpg" width="171"></a>
      </div>
    </div><img alt="placeholder" class="fade" id="pos_bot_l" src="img/splash_front_l.png"> <img alt="placterhold" class="fade" id="pos_bot_r" src="img/splash_front_r.png"></div>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js">
    </script>
    <script src="script/mobile_nav.js">
    </script>
  </body>
  </html>
