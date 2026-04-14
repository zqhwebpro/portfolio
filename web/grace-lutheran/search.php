<?php include ('inc/session.php');?>
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
<div id="gl_wrap">
		<div id="gl_header_wrap">
        	<div class="group">
				<div class="grid_2_of_6"><img alt="Grace Lutheran Church of Red Lion" class="gl_logo" src=
				"img/heindel_gl_logo.png">
				</div>


				<div class="grid_4_of_6">
					<nav id="gl_nav">
                        <ul>
                            <li>
                                <a href="contact.html">Contact</a>
                            </li>
                            <li>
                                <a href="gallery.html">Gallery</a>
                            </li>
                            <li>
                                <a href="programs.html">Programs</a>
                            </li>
                            <li>
                                <a href="newsevents.html">News/Events</a>
                            </li>
                            <li>
                                <a href="thefaith.html">The Faith</a>
                            </li>
                            <li>
                                <a href="index.html">Home</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </div>
    <div class="group">
        <div class="grid_6_of_6">
            <div class="gl_gry_bar_x">
                <nav id="gl_nav_2">
                    <ul>
                   		<li>
                            <a href="login.php"><i class="fa fa-sign-in" aria-hidden="true"></i>
Log in</a>
                        </li>
                        <li>
                            <a href="signup.php"><i class="fa fa-user-plus" aria-hidden="true"></i>
                            Sign Up</a>
                        </li>
                    </ul>
                </nav>
                        </div>
                    </div>
                </div>
                
		<div id="glh_welcome_wrap">
        <div class="group">
				<div class="grid_6_of_6">
					<h1>A Portal to the</h1><h1 class="twopush">Other Side.</h1>
        	            
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
					<h2 id="glh_service_bar">Search:</h2>
				</div>
			</div>


			<div class="group">
            <div class="grid_6_of_6">
            	<h3 class="twopush">Search through our online database for information.</h3>

<form action="search.php" method="post">
	<input type="text" placeholder="Search" name="search" />
    <input type="submit" name="submit" value="Search"/>


</form>


<?php
if($_POST['submit']=='Search'){
		if(empty($_POST['search'])){
				$msg= "<p>All fields are required.</p>";
		}else{
    		$query=mysqli_real_escape_string($con,$_POST['search']);
			$sql="SELECT `title`, `text` FROM `news` WHERE `title` LIKE '%$query%' OR `text` LIKE '%$query%'";
				$result=mysqli_query($con, $sql);
				$count=mysqli_num_rows($result);
				if($count > 0){
					while($row = mysqli_fetch_array($result)){
						echo '<div>'.
								'<h2>'.$row['title'].'</h2>'.
								'<h3>'.$row['createddate'].'</h3>'.
								'<p>'.$row['text'].'</p>'.
								'<a href="news.php?p='.$row['newsid'].'">'.' '.'View Details</a>';
								'</div>';
					}
				}else{
					echo "<p class=\"alert\"> Sorry, no results found, please try again.</p>";
				}
		}
}
?>


</div>
				
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