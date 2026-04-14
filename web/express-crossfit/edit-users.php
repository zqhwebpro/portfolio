<?php include ('session.php');
if($_SESSION['roleid']!=200){
    header('Location: login.php?msg=loggedout');
    exit;
} ?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<meta content="width=device-width, initial-scale=1" name="viewport">
	<title>Express CrossFit: Admin Page</title>
	<link href="css/styles.css" rel="stylesheet" type="text/css">
	<script src="http://code.jquery.com/jquery-1.9.1.min.js">
	</script>
	<script src="script/jquery-latest.js" type="text/javascript">
	</script>
	<script src="script/jquery.tablesorter.min.js" type="text/javascript">
	</script>
	<script src="script/usertableload.js">
	</script>
	<script src="script/proptableload.js" type="text/javascript">
	</script>
	<script src="script/classie.js" type="text/javascript">
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
					<h1 id="multipage_hl">Admin Page</h1>
				</div>
			</div>
		</div>
		<div id="admintop_group">
			<div class="group">
				<div class="marg_bot_med"></div>
				<div class="grid_6_of_6">
					<h2>Edit Users</h2>
				</div>
			</div>
			<div class="group">
				<div class="grid_6_of_6">
					<?php $sql=("SELECT * FROM `users` WHERE `userid`= '".$_GET['userid']."'");
					        echo $sql;
					        $result=mysqli_query($con, $sql); ?><?php while($row=mysqli_fetch_array($result)){ ?>
					<form action="%3C?php%20echo%20$_SERVER['PHP_SELF'].'?'.$_SERVER['QUERY_STRING'];?%3E" class="ec_form" method="post">
						<div>
							<label for="active">Active:</label> <input class="" name="active" type="text" value="<?php echo $row['active'];?>">
						</div>
						<div>
							<label for="email">Email:</label> <input class="" name="email" type="text" value="<?php echo $row['email'];?>">
						</div>
						<div>
							<label for="name">Name:</label> <input class="" name="name" type="text" value="<?php echo $row['name'];?>">
						</div>
						<div>
							<label for="password">Password:</label> <input class="" name="password" type="text" value="<?php echo $row['password'];?>">
						</div>
						<div>
							<label for="roleid">Role ID:</label> <input class="" name="roleid" type="text" value="<?php echo $row['roleid'];?>">
						</div>
						<div>
							<label for="userid">User ID:</label> <input class="" name="userid" type="text" value="<?php echo $row['userid'];?>">
						</div>
						<div>
							<input class="" name="submit" type="submit" value="Update">
						</div>
					</form><?php } ?><br>
					<a href="admin.php">Back to Admin</a>
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
