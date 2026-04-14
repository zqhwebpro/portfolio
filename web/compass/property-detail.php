<?php include ('lib/inc/session.php');?>

<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
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
		<link href=
		"https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"
		rel="stylesheet">
		<title>
			compass.com - pointing you the right way home
		</title>
		<link href='https://fonts.googleapis.com/css?family=Montserrat:400,700|Hind'
		rel='stylesheet' type='text/css'>
		<link href="lib/css/styles.css" rel="stylesheet" type="text/css">
	</head>
	<body>
		<div class="fp_contain">
			<header>
				<a href="#"><img alt="compass, pointing you the right way home" id=
				"imgfloat" src="lib/imgs/compasslogo.png"></a>
				<nav>
					<ul>
						<li>
							<a href="index.html">home</a>
						</li>
						<li>
							<a href="sellyourhome.html">sell</a>
						</li>
						<li>
							<a href="investors.html">investors</a>
						</li>
						<li>
							<a href="faq.html">faq</a>
						</li>
						<li>
							<a href="testimonials.html">testimonials</a>
						</li>
						<li>
							<a href="contact.html">contact</a>
						</li>
						<li>
							<a href="signup.php">sign up</a>
						</li>
						<li>
							<a href="login.php">login</a>
						</li>
					</ul>
				</nav>
			</header>
            
            <div class="propdet_contain">
				<div class="propdet_box">
<h1>Property Details</h1>

<?php $sql="SELECT
`property`.`propertyid`,`property`.`addr`,`property`.`beds`,`property`.`fullbath`,`images`.`filename`,`images`.`caption` FROM `property` LEFT JOIN `images` ON `property`.`propertyid`=`images`.`propertyid` WHERE `property`.`propertyid` = '".$_GET['p']."'";
$result=mysqli_query($con,$sql);
$row=mysqli_fetch_array($result);
echo '<h1>'.$row['addr'].'</h1>'
	.'<a href="buy.php">Back to Properties</a>'
	.'<div class="propdet_img">'
	.'<img src="lib/imgs/properties/'.$row['propertyid'].'/450_'.$row['filename'].'">'
	.'</div>'
	.'<div class="propdet_margauto">'
	.'<ul class="propdet_ul">'
	.'<li id="propdet_li">Beds: '.$row['beds'].'</li>'
	.'<li id="propdet_li">Full Baths: '.$row['fullbath'].'</li>'
	.'<li id="propdet_li">Half Baths: '.$row['halfbath'].'</li>'
	.'<li id="propdet_li">Sewer: '.$row['sewer'].'</li>'
	.'<li id="propdet_li">Basement Type: '.$row['basementType'].'</li>'
	.'<li id="propdet_li">Parking: '.$row['parking'].'</li>'
	.'<li id="propdet_li">Condition: '.$row['condition1'].'</li>'
	.'<li id="propdet_li">Design: '.$row['design'].'</li>'
	.'<li id="propdet_li">Construct: '.$row['construct'].'</li>'
	.'<li id="propdet_li">Age: '.$row['age'].'</li>'
	.'<li id="propdet_li">Footage: '.$row['footage'].'</li>'
	.'<li id="propdet_li">Lots Sizes: '.$row['lotsize'].'</li>'
	.'<li id="propdet_li">Taxes: '.$row['taxes'].'</li>'
	.'<li id="propdet_li">County: '.$row['county'].'</li>'
	.'<li id="propdet_li">School: '.$row['school'].'</li>'
	.'<li id="propdet_li">Retail Price: '.$row['retailPrice'].'</li>'
	.'<li id="propdet_li">Investor Price: '.$row['investorPrice'].'</li>'
	.'<li id="propdet_li">Investor Tagline: '.$row['investorTagLine'].'</li>'
	.'<li id="propdet_li">Retail Description: '.$row['retailDesc'].'</li>'
	.'<li id="propdet_li">Investor Description: '.$row['investorDesc'].'</li>'
	.'<li id="propdet_li">Address: '.$row['addr'].'</li>'
	.'<li id="propdet_li">City: '.$row['city'].'</li>'
	.'<li id="propdet_li">State: '.$row['state'].'</li>'
	.'<li id="propdet_li">Zipcode: '.$row['zip'].'</li>'
	.'<li id="propdet_li">Stories: '.$row['stories'].'</li>'
	.'<li id="propdet_li">Property ID: '.$row['propertyid'].'</li>'
	.'</ul>'
	.'</div>';
?>

<?php mysqli_close($con);?>

		</div>
	</div>

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
	</body>
</html>