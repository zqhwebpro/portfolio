	<div id="gl_wrap">
		<div id="gl_header_wrap">
			<div class="group">
				<div class="grid_2_of_6"><a href="index.php"><img alt="Grace Lutheran Church of Red Lion" class="gl_logo" src="img/heindel_gl_logo.png"></a></div>
				<div class="grid_4_of_6">
					<nav id="gl_nav">
						<ul>
							<li>
								<a href="thefaith.php">The Faith</a>
							</li>
							<li>
								<a href="news.php">News/Events</a>
							</li>
							<li>
								<a href="programs.php">Programs</a>
							</li>
							<li>
								<a href="gallery.php">Gallery</a>
							</li>
							<li>
								<a href="contact.php">Contact</a>
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
						<?php if($_SESSION['usertypeid']==300){
						                        echo '<li><i class="fa fa-sign-in" aria-hidden="true"></i><a href="admin.php">Control Panel</a></li>';
						                        echo '<li><i class="fa fa-user-plus" aria-hidden="true"></i><a href="logout.php">Log Out</a></li>';
						                    }else{
						                        if($_SESSION['usertypeid']==200){
						                        echo '<li><i class="fa fa-sign-in" aria-hidden="true"></i><a href="client.php">Client Control Panel</a></li>';
						                        echo '<li><i class="fa fa-user-plus" aria-hidden="true"></i><a href="logout.php">Log Out</a></li>';
						                    }else{
						                        if($_SESSION['usertypeid']==100){
						                        echo'<li><i class="fa fa-sign-in" aria-hidden="true"></i><a href="users.php">Random Control Panel</a></li>';
						                        echo '<li><i class="fa fa-user-plus" aria-hidden="true"></i><a href="logout.php">Log Out</a></li>';
						                    }else{
						                        echo '<li><a href="signup.php"><i class="fa fa-user-plus" aria-hidden="true"></i>Sign Up</a></li>';
						                        echo '<li><a href="login.php"><i class="fa fa-sign-in" aria-hidden="true"></i>Log In</a></li>';
						                    }
						                }

						            }
						        ?>
					</ul>
				</nav>
			</div>
		</div>
	</div>
