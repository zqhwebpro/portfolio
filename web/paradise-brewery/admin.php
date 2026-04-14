<?php
include ('lib/inc/session.php');
if($_SESSION['usertypeid']!=200){
    header('Location: logout.php');
    exit;
}
    ?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Paradise Brewery :: Admin</title>
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
						<h1>Admin Panel</h1>
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
				<div class="group">
					<div class="grid_1_of_6"></div>
					<div class="grid_4_of_6" id="adjusted_admin">
						<h3>Users</h3>
						<table class="tablesorter" id="usertable">
							<thead>
								<tr>
									<th>First Name</th>
									<th>Last Name</th>
									<th>Email</th>
									<th>Edit</th>
								</tr>
							</thead>
							<tbody>
								<?php
								                                $sql=("SELECT * FROM `users` WHERE `active`=1");
								                                $result=mysqli_query($con, $sql);
								                                while($row=mysqli_fetch_array($result)){
								                                    echo '<tr>'
								                                    .'<td>'.$row['fname'].'</td>'
								                                    .'<td>'.$row['lname'].'</td>'
								                                    .'<td>'.$row['email'].'</td>'
																	.'<td>'.$row['active'].'</td>'
								                                    .'<td><a href="edit-users.php?p='.$row['usersid'].'">EDIT</a></td>'
								                                    .'</tr>';
								                                }
								                                ?>
							</tbody>
						</table>
                        <h3>Products</h3>
						<table class="tablesorter" id="producttable">
							<thead>
								<tr>
									<th>Name</th>
									<th>Price</th>
									<th>Description</th>
									<th>Active</th>
								</tr>
							</thead>
						<tbody>
                        <?php
								                                $sql=("SELECT * FROM `products` WHERE `active`=1");
								                                $result=mysqli_query($con, $sql);
								                                while($row=mysqli_fetch_array($result)){
								                                    echo '<tr>'
								                                    .'<td>'.$row['name'].'</td>'
								                                    .'<td>'.$row['price'].'</td>'
								                                    .'<td>'.$row['description'].'</td>'
																	.'<td>'.$row['active'].'</td>'
								                                    .'<td><a href="edit-users.php?p='.$row['usersid'].'">EDIT</a></td>'
								                                    .'</tr>';
								                                }
								                                ?>
                                                                </tbody>
                                                                </table>
					</div>
                    
                     <h3>News</h3>
						<table class="tablesorter" id="producttable">
							<thead>
								<tr>
									<th>Title</th>
									<th>Text</th>
									<th>Active</th>
								</tr>
							</thead>
						<tbody>
                        <?php
								                                $sql=("SELECT * FROM `products` WHERE `active`=1");
								                                $result=mysqli_query($con, $sql);
								                                while($row=mysqli_fetch_array($result)){
								                                    echo '<tr>'
     																 .'<td>'.$row['title'].'</td>'
								                                    .'<td>'.$row['text'].'</td>'
																	.'<td>'.$row['active'].'</td>'
								                                    .'<td><a href="edit-users.php?p='.$row['usersid'].'">EDIT</a></td>'
								                                    .'</tr>';
								                                }
								                                ?>
                                                                </tbody>
                                                                </table>
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
	<?php mysqli_close($con);?>
</body>
</html>