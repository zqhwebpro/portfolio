<?php include ('inc/session.php');
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
	<link href='https://fonts.googleapis.com/css?family=Open+Sans:400,600italic|Lora:400,700italic' rel='stylesheet' type='text/css'>
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
					<h1>Join Our Mission</h1><h1 class="twopush">of Followers</h1>
        	            
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
					<h2 id="glh_service_bar">Offering Two Different Sunday Worship Services:</h2>
				</div>
			</div>


			<div class="group">
            <div class="grid_6_of_6">
            	<h3 class="twopush">Sign up for your free account today. </h3>
                <?php if(isset($msg)){echo $msg;}?>
                <form action="<?php echo $_SERVER['PHP_SELF'].'?'.$_SERVER['QUERY_STRING'];?>"
						class="" id="" method="post" name="">
                  <div>
                    <label for="fname">*Your First Name</label><br>
                    <input name="fname" type="text">
                  </div>
                  <div>
                    <label for="lname">*Your Last Name</label><br>
                    <input name="lname" type="text">
                  </div>
                  <div>
                    <label for="email">*Your Email</label><br>
                    <input name="email" type="text">
                  </div>
                  <div>
                    <label for="password">*Desired Password</label><br>
                    <input name="password" type="password">
                  </div>
                  <p class="form_item_pos"> By signing up you are agreeing to the <a href="tac.html">terms and
                    conditions</a> of Grace Lutheran Church of Red Lion.</p>
                  <div>
                    <button type="submit" name="submit" value="Sign-Up"> Sign Up </button>
                  </div>
                </form>
            </div>
				
			</div>
		</div>
        
<div class="gl_gry_bar"></div>

		<div id="glh_event_wrap">
			<div class="group">
				<div class="grid_6_of_6">
					<h3>Benefits to being a member:</h3>
				</div>
			</div>
            
        
			<div class="group">
	
				<div class="grid_6_of_6">
                	<p>• See what's new. Members get first access to important changes and dates of our church.</p>
                    <p>• Personalize your space. Members can customized how they want to view the website.</p>
                    <p>• Get in touch with our people. Members can chat with other members of our church.</p>
					<p class="twopush">• Be a part of the conversation. Members can leave comments on the Pastor's posts.</p>
                  
				</div>


		
			</div>
		</div>

<div class="gl_gry_bar"></div>

		<div id="glh_meet_wrap">
			<div class="group">
				<div class="grid_6_of_6">
                <div class="glh_meet3">
					<h3>A closer community only takes you:</h3>


					<p class="glh_meet_p1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed placerat condimentum volutpat. Nulla facilisis dapibus rutrum. Vivamus tristique massa ut est pharetra vehicula. Fusce convallis tincidunt lacinia. Fusce interdum sagittis dui at facilisis. Nulla fringilla enim ut lectus vehicula luctus. Ut lacinia gravida velit, ac tempus elit molestie ut. Sed eu ullamcorper augue. Aliquam sed porta erat. Proin tristique viverra enim, vitae pulvinar justo viverra ut. Duis malesuada sem sed tincidunt facilisis.</p>
                    </div>
				</div>
			</div>
            </div>

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