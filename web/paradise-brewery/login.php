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
    // conform email format
    if(!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
        $msg = "<p class=\"error\">Problem with email format.</p>";
        $error = true; // ERROR
    }
    // continue if no errors
    if(!$error) {
        // make a db connection
$con = mysqli_connect("localhost","zqhdesig_ecommin","Testing1234","zqhdesig_ecomm");
        // Check connection
        if (mysqli_connect_errno())
        {
            echo "Failed to connect to MySQL: " . mysqli_connect_error();
        }

            $sql = "SELECT `userid`,`password`,`createddate`,`usertypeid` ";
            $sql .= "FROM `users` ";
            $sql .= "WHERE `email` = '".mysqli_real_escape_string($con,$_POST[
            'email']);
            $sql .= "' LIMIT 1 ;";
            $result = mysqli_query($con, $sql);
            // continue if we found a record
            if(mysqli_num_rows($result)) {
                // get array of data
                $row = mysqli_fetch_array($result);
                // Figure out if the password is correct
                $hashedpwd = md5($_POST['password'] . $row['createddate']);
                if($hashedpwd == $row['password']) {
                    // set up out session vars
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
                    $msg = "<p class\"error\">Hold on. Incorrect Login, Please try again.</p>";
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
	<title>Paradise Brewery :: Login</title>
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
						<h1>Login</h1>
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
				<div id="adjusted_login">
					<div class="group">
						<div class="grid_6_of_6">
							<h4 class="h4_pos_log">Login For Some Serious Benifits</h4>
							<p class="p_pos_log">Bacon ipsum dolor amet pork belly ham hock pastrami cow bacon pig chuck short ribs biltong
							beef ribs chicken ham t-bone. Kevin shankle sirloin cow capicola frankfurter. Chuck ball tip corned beef turkey
							hamburger short loin rump. Kevin tri-tip t-bone kielbasa cupim, pork chop ham chuck.</p>
						</div>
					</div>
					<div class="group">
						<div class="grid_1_of_6"></div>
						<div class="grid_4_of_6" id="login_box">
							<h4>Log In Here</h4><?php if(isset($msg)){echo $msg;}?>
							<form action="" class="loginform" id="login" method="post" name="login">
								<div>
									<label for="email">Email:</label> <input id="" name="email" type="text">
								</div>
								<div>
									<label for="password">Password:</label> <input id="" name="password" type="password">
								</div>
								<p>Not a member? <a href="join.php">Sign-up here.</a></p>
								<div>
									<input class="submit_btn" name="submit" type="submit" value="Log In">
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
