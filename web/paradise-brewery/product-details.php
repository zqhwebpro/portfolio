<?php include('lib/inc/session.php'); ?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Paradise Brewery :: Product Details</title>
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
						<h1>The Deats:</h1>
					</div>
					<div class="grid_2_of_6">
						<a href="#"><img alt="Shop Paradise" id="cta_shift" src="lib/imgs/cb_cta.png"></a> <img alt="Shop Paradise" id=
						"cta_shift_back" src="lib/imgs/cb_cta_back.png">
						<div id="ecom_cta">
							<ul>
								<li>
									<a href="join.php">Create An Account</a>
								</li>
								<li>
									<a href="login.php">Log In</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div id="adjusted_deats">
					<div class="group">
						<div class="grid_2_of_6"></div>
						<div class="grid_4_of_6">
							<?php $sql="SELECT  `products`.`productsid` ,  `products`.`name` ,  `products`.`description` ,  `products`.`price` , `images`.`filename` ,  `images`.`caption` 
							FROM  `products` 
							LEFT JOIN  `images` ON products.productsid = images.productsid
							WHERE products.productsid='".$_GET['p']."'";
							$result=mysqli_query($con,$sql);
							$row=mysqli_fetch_array($result);
							echo '<h4 class="">'.$row['name'].'</h4>'
							        .'<a href="products.php">Back to Products</a>'
							        .'<div>'
							        .'<img src="lib/imgs/products/'.$row['productid'].'/450_'.$row['filename'].'">'
							        .'</div>'
							        .'<h4>'.'Product Details: '.'</h4>'
							        .'<p>'.$row['description'].'</p>'
							        .'<h4>'.'Price: $'.$row['price'].'</h4>';
							?><?php mysqli_close($con);
							 ?>
						</div>
						<div class="grid_2_of_6"></div>
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
								<a href="search.php">Search</a>
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
								<a href="signup.html">Create an Account</a>
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
    </div>
</body>
</html>