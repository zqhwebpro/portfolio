<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Paradise Brewery :: Search</title>
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
						<h1>Search!</h1>
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

                <div class="group" id="adjusted_search">
                <div class="grid_1_of_6"></div>
					<div class="grid_4_of_6">
<h4 class="center">Looking for something in particular?</h4>
<div class="search_bar"></div>
<?php
	if($_POST['submit']=='Search'){
		if(empty($_POST['search'])){
			$msg="<p>All fields are required.</p>";
		}else{
			$query = mysqli_real_escape_string($con, $_POST['search']);
			$sql ="SELECT `name`, `description`,`shortdescription`,`price` FROM `products` WHERE `name` LIKE '%$query%' OR `shortdescription` LIKE '%$query%' OR `price` LIKE '%$query%'";
	$result = mysqli_query($con, $sql);
	$count = mysqli_num_rows($result);
	if($count > 0){
		while($row = mysqli_fetch_array($result)){
			/*echo '<div>'
			.'<h2 class="1">'.$row['nothing'].'</h2>'
			.'<h3 class="2">'.$row['test'].'</h3>'
			.'<p class="3">'.$row['threen'].'</p>'
			/*?>.'<a class="4" href="product-details.php?='.$row['psdff'].'">'.' '.'View Details</a>'<?php
			;
			'</div>';*/
		}
		}else{
			echo "<p class=\"alert\">Sorry Sparky there are no results. Try again.</p>";
		}
	}
}
?>


<form action="search.php" method="post">
	<div class="center2"><input type="text" placeholder="Search" name="search" size="21" maxlength="120">
    <input type="submit" name="submit" value="Search" class="submit_btn"></div>
</form>

</div>

<div class="grid_1_of_6"></div>
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
