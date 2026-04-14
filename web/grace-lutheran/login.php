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
$con = mysqli_connect("localhost","zqhdesig_church","psychJ22","zqhdesig_churchfinal");
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
	<link href='https://fonts.googleapis.com/css?family=Open+Sans:400,600italic|Lora:400,700italic' rel='stylesheet' type='text/css'>
	<meta charset="utf-8">
	<link rel="stylesheet" href="css/font-awesome.min.css">
	<title>Grace Lutheran Church of Red Lion</title>
	<link href="css/styles.css" rel="stylesheet" type="text/css">
</head>

<body>

<?php include'header.php'; ?>
                
		<div id="glh_welcome_wrap">
        	
			<div class="group">
				<div class="grid_6_of_6">
					<h1>Your Guide to the</h1><h1 class="twopush">Christ Almighty</h1>
        	            
<div class="hrish"></div>
	<div class="glh_top">
					<img src="img/holytrinity.png" alt="The Holy Trinity" class="glh_ht" />
                    
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris cursus sed elit ac aliquet.</p>
				</div>
                	</div>
             


				
			</div>
		</div>

		<div class="gl_gry_bar"></div>

		<div id="glh_service_wrap">
			<div class="group">
				<div class="grid_6_of_6">
					<h2 id="glh_service_bar">Membership Login:</h2>
				</div>
			</div>


			<div class="group">
            <div class="grid_1_of_6"></div>
            <div class="grid_4_of_6">
            	<h3 class="twopush">
							Log-in to your customized church portal.
						</h3><?php if(isset($msg)){echo $msg;}?>
						<form action="<?php echo $_SERVER['PHP_SELF'];?>" method="post" id="contact-form">
							<div>
								<label for="email">Email:</label> <br>
                                <input id="" name="email" type="text">
							</div>
							<div>
								<label for="password">Password:</label><br>
                                <input id="" name="password" type="password">
							</div>
                            <p class="form_item_pos">
                            							By signing up you are agreeing to the <a href="tac.html">terms and
							conditions</a> of compass.com
						</p>
							<div>
								
                                <button type="submit" name="submit" value="Log In"> Log In </button>
                           
							</div>
						</form>
            </div>
				<div class="grid_1_of_6"></div>
			</div>
		</div>
        
<div class="gl_gry_bar"></div>

		<div id="glh_event_wrap">
			<div class="group">
				<div class="grid_6_of_6">
					<h3>What's new for our members page:</h3>
				</div>
			</div>
            
        
			<div class="group">
	
    			<div class="grid_1_of_6"></div>
				<div class="grid_4_of_6">
                	<p>Praesent ut tellus non tortor eleifend tempor. Vestibulum ut turpis purus. Morbi tincidunt dapibus orci tempor egestas. Suspendisse potenti. Aenean facilisis tempor felis vel tempus. Praesent tincidunt velit quis leo tincidunt tristique.</p><p class="twopush"> Proin non ipsum libero. Maecenas gravida venenatis ante sed efficitur.</p>
                  
				</div>
<div class="grid_1_of_6"></div>

		
			</div>
		</div>

<div class="gl_gry_bar"></div>

		<div id="glh_meet_wrap">
			<div class="group">
            <div class="grid_1_of_6"></div>
				<div class="grid_4_of_6">
                <div class="glh_meet3">
					<h3>Having trouble logging in?</h3>


					<p class="glh_meet_p2">Vestibulum placerat est in orci malesuada. Cras velit nulla, gravida vitae nibh sodales,
					eleifend.</p>


					<a href="contact.php"><div class="gl_button_xy">
						Contact Us
					</div></a>
                    
                    </div>
                    
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