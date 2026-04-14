<?php
include ('lib/inc/session.php');
if($_SESSION['usertypeid']!=200) {
	header('Location: logout.php');
	exit;
}
?>

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Add New Listing</title>
	<link href="lib/css/styles.css" rel="stylesheet" type="text/css">
	<link href="lib/font-awesome-4.4.0/css/font-awesome.min.css" type="text/css">
    <link href=
		"https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"
		rel="stylesheet">
<script type="text/javascript" src="lib/scripts/jquery-latest.js"></script>
<script type="text/javascript" src="lib/scripts/jquery.tablesorter.min.js"></script>
    <script type"text/javascript" src="lib/scripts/usertableload.js"></script>
    <script type="text/javascript" src="lib/scripts/proptableload.js"></script>
    <script src="lib/scripts/classie.js" type="text/javascript">
		</script>
		<script>
		function init() {
		  window.addEventListener('scroll', function(e){
			  var distanceY = window.pageYOffset || document.documentElement.scrollTop,
				  shrinkOn = 300,
				  header = document.querySelector("header");
			  if (distanceY > shrinkOn) {
				  classie.add(header,"smaller");
			  } else {
				  if (classie.has(header,"smaller")) {
					  classie.remove(header,"smaller");
				  }
			  }
		  });
		}
		window.onload = init();
		</script>
</head>
<body id="bodybg">
		<div class="fp_contain">
			<header>
				<a href="#"><img alt="compass, pointing you the right way home" id=
				"imgfloat" src="lib/imgs/compasslogo.png"></a>
				<nav>
					<ul>
						<li>
							<a href="admin.php">admin central</a>
						</li>
						<li>
							<a href="add-listing.php">add listing</a>
						</li>
						<li>
							<a href="add-news.php">add news</a>
						</li>

						<li>
							<a href="edit-listing.php">edit listing</a>
						</li>
                        <li>
							<a href="edit-users.php">edit users</a>
						</li>
						<li>
							<a href="logout.php">logout</a>
						</li>
					</ul>
				</nav>
			</header>
	<div id="listingwrapper">
		<div id="listingbodywrapper">
			<div id="listingbody">



<br>
<!-- users -->
<h3>Recent Users</h3><br>
<table id="usertable" class="tablesorter"> 
<thead> 
<tr> 
    <th>Last Name</th> 
    <th>First Name</th> 
    <th>Email</th> 
    <th>Due</th> 
    <th>Web Site</th> 
</tr> 
</thead>
<?php
$sql=("SELECT * FROM `users` WHERE `active`=1");
$result=mysqli_query($con,$sql);
while($row=mysqli_fetch_array($result)){
	echo '<tr>'
		.'<td>'.$row['fname'].'</td>'
		.'<td>'.$row['lname'].'</td>'
		.'<td>'.$row['email'].'</td>'
		.'<td>'.$row['due'].'</td>'
		.'<td>'.$row['website'].'</td>'
		.'<td><a href="edit-users.php?p='.$row['userid'].'">EDIT</a></td>'
		.'</tr>';}
?>

</tbody>
</table>

<br><br><br>
<!-- properties -->
<h3>Properties</h3>
<br>
<table id="proptable" class="tablesorter"> 
<thead> 
<tr> 
    <th>Property ID</th> 
    <th>Retail Price</th> 
    <th>Investor Price</th> 
    <th>Retail Tagline</th> 
    <th>Investor Tagline</th> 
    <th>Retail Description</th> 
    <th>Investor Description</th> 
    <th>Address</th> 
    <th>City</th> 
    <th>State</th> 
    <th>Zipcode</th> 
    <th>Stories</th> 
    <th>Beds</th> 
    <th>Full Bath</th> 
    <th>Half Bath</th> 
    <th>Exteriors</th> 
    <th>Heating</th> 
    <th>Cooling</th> 
    <th>Water</th> 
    <th>Sewer</th> 
    <th>Basement Type</th> 
    <th>Parking</th> 
    <th>Condition</th> 
    <th>Design</th> 
    <th>Construct</th> 
    <th>Age</th> 
    <th>Footage</th> 
    <th>Lot Size</th> 
    <th>Taxes</th> 
    <th>County</th> 
    <th>School</th> 
    <th>Added Date</th> 
    <th>Added By</th> 
</tr> 
</thead> 
<tbody> 
<?php
$sql=("SELECT * FROM `property` WHERE `active`=1");
$result=mysqli_query($con,$sql);
while($row=mysqli_fetch_array($result)){
	echo '<tr>'
		.'<td>'.$row['propertyid'].'</td>'
		.'<td>'.$row['retailPrice'].'</td>'
		.'<td>'.$row['investorPrice'].'</td>'
		.'<td>'.$row['retailTagLine'].'</td>'
		.'<td>'.$row['investorTagLine'].'</td>'
		.'<td>'.$row['retailDesc'].'</td>'
		.'<td>'.$row['investorDesc'].'</td>'
		.'<td>'.$row['addr'].'</td>'
		.'<td>'.$row['city'].'</td>'
		.'<td>'.$row['state'].'</td>'
		.'<td>'.$row['zip'].'</td>'
		.'<td>'.$row['stories'].'</td>'
		.'<td>'.$row['beds'].'</td>'
		.'<td>'.$row['fullbath'].'</td>'
		.'<td>'.$row['halfbath'].'</td>'
		.'<td>'.$row['exteriors'].'</td>'
		.'<td>'.$row['heating'].'</td>'
		.'<td>'.$row['cooling'].'</td>'
		.'<td>'.$row['water'].'</td>'
		.'<td>'.$row['sewer'].'</td>'
		.'<td>'.$row['basementtype'].'</td>'
		.'<td>'.$row['parking'].'</td>'
		.'<td>'.$row['condition1'].'</td>'
		.'<td>'.$row['design'].'</td>'
		.'<td>'.$row['construct'].'</td>'
		.'<td>'.$row['age'].'</td>'
		.'<td>'.$row['footage'].'</td>'
		.'<td>'.$row['lotsize'].'</td>'
		.'<td>'.$row['taxes'].'</td>'
		.'<td>'.$row['county'].'</td>'
		.'<td>'.$row['school'].'</td>'
		.'<td>'.$row['addedDate'].'</td>'
		.'<td>'.$row['addedBy'].'</td>'
		.'<td><a href="edit-listing.php?p='.$row['userid'].'">EDIT</a></td>'
		.'</tr>';}
?>

</tbody>
</table>


<?php mysqli_close($con);?>
</div>
</div>
<div id="be_breaker"></div>
<div class="footer_contain">
				<div class="termscontain">
					<h3 id="fontcolordkblue">
						Terms & conditions and privacy policy
					</h3>
					<p id="copyp">
						©zqhdesign.com. 2015. Made at York, AI.
					</p>
				</div>
			</div>
			<div class="smcont">
				<a href="#"><i class="fa fa-twitter fa-3x"></i></a> <a href="#"><i class=
				"fa fa-linkedin-square fa-3x"></i></a> <a href="#"><i class=
				"fa fa-facebook-official fa-3x"></i></a>
			</div>
			<div class="footer_bot"></div>
		</div>
        <br>
<a href="admin.php">Back to Admin</a>
	</body>
</html>