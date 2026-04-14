<?php include('lib/inc/session.php');
//if($_SESSION['usertypeid']!=200){
	//header('Location: logout.php');
	//exit;
//}
if($_POST['submit'] == 'Add Property'){
	if(!empty($_POST['retailPrice'])){
		$sql = "INSERT INTO `property`(`propertyid`,
		`retailPrice`,
		`retailDesc`,
		`investorPrice`,
		`investorTagLine`,
		`investorDesc`,
		`addr`,
		`city`,
		`state`,
		`beds`,
		`fullbath`,
		`halfbath`,
		`stories`,
		`exteriors`,
		`heating`,
		`cooling`,
		`water`,
		`sewer`,
		`basementtype`,
		`parking`,
		`condition1`,
		`design`,
		`construct`,
		`age`,
		`footage`,
		`lotsize`,
		`taxes`,
		`county`,
		`active`)";
		$sql .= "VALUES(NULL,
		'".mysqli_real_escape_string($con, $_POST['retailPrice'])."',
		'".mysqli_real_escape_string($con, $_POST['retailDesc'])."',
		'".mysqli_real_escape_string($con, $_POST['investorPrice'])."',
		'".mysqli_real_escape_string($con, $_POST['investorTagLine'])."',
		'".mysqli_real_escape_string($con, $_POST['investorDesc'])."',
		'".mysqli_real_escape_string($con, $_POST['addr'])."', 
		'".mysqli_real_escape_string($con, $_POST['city'])."',
		'".mysqli_real_escape_string($con, $_POST['state'])."',
		'".mysqli_real_escape_string($con, $_POST['beds'])."',
		'".mysqli_real_escape_string($con, $_POST['fullbath'])."',
		'".mysqli_real_escape_string($con, $_POST['halfbath'])."',
		'".mysqli_real_escape_string($con, $_POST['stories'])."',
		'".mysqli_real_escape_string($con, $_POST['exteriors'])."',
		'".mysqli_real_escape_string($con, $_POST['heating'])."',
		'".mysqli_real_escape_string($con, $_POST['cooling'])."',
		'".mysqli_real_escape_string($con, $_POST['water'])."',
		'".mysqli_real_escape_string($con, $_POST['sewer'])."',
		'".mysqli_real_escape_string($con, $_POST['basementtype'])."',
		'".mysqli_real_escape_string($con, $_POST['parking'])."',
		'".mysqli_real_escape_string($con, $_POST['condition1'])."',
		'".mysqli_real_escape_string($con, $_POST['design'])."',
		'".mysqli_real_escape_string($con, $_POST['construct'])."',
		'".mysqli_real_escape_string($con, $_POST['age'])."',
		'".mysqli_real_escape_string($con, $_POST['footage'])."',
		'".mysqli_real_escape_string($con, $_POST['lotsize'])."',
		'".mysqli_real_escape_string($con, $_POST['taxes'])."',
		'".mysqli_real_escape_string($con, $_POST['county'])."',1);";
		
		$result = mysqli_query($con,$sql);
		$count = mysqli_affected_rows($con);
		$newpropertyid= mysqli_insert_id($con);
		
		if($newpropertyid > 0){
		//property status insert
		$sql2 = "INSERT INTO `propertycat`(`propertycatid`,`categoryid`,`propertyid`)";
		$sql2 .="VALUES(NULL,'".mysqli_real_escape_string($con,$_POST['categoryid'])."','$newpropertyid');";
		$result2 = mysqli_query($con,$sql2);
		$count2 = mysqli_affected_rows($con);
	}
		
		if($count && $count2){
			$msg="<p class=\"alert\">This property has been successfully added.</p>";
		}else{
			$msg="<p class=\"alert\">Please try again.</p>";
		}
	}else{
		$msg="<p class=\"alert\">All fields are required.</p>";
	}
}
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Add New Listings</title>
	<link href="lib/css/styles.css" rel="stylesheet" type="text/css">
	<link href="lib/font-awesome-4.4.0/css/font-awesome.min.css" type="text/css">
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
				<?php if(isset($msg)){echo $msg;}?>
				<form action="%3C?php%20echo%20$_SERVER['PHP_SELF'];?%3E" class="buyform"
				method="post">
					<div>
						<label for="categoryid">Status/Category</label>
						<?php $catsql = "SELECT * FROM `categories`";?> <select name=
						"categoryid">
							<?php $catresult= mysqli_query($con,$catsql);
							while($catrow=mysqli_fetch_array($catresult)){?>
							<option value="<?php echo $catrow['categoryid']?>">
								<?php echo $catrow['categoryname'];?>
							</option><?php }?>
						</select>
					</div>
					<div>
						<label for="retailPrice">Retail Price</label> <input class="" name=
						"retailPrice" type="text">
					</div>
					<div>
						<label form="retailDesc">Retail Description</label> 
						<textarea name="retailDesc" rows="5">
</textarea>
					</div>
					<div>
						<label form="investorPrice">Investor Price</label> <input name=
						"investorPrice" type="text">
					</div>
					<div>
						<label form="investorTagLine">Investor Tagline</label> <input name=
						"investorTagLine" type="text">
					</div>
					<div>
						<label form="investorDesc">Investor Description</label> 
						<textarea name="investorDesc" rows="5">
</textarea>
					</div>
					<div>
						<label for="addr">Address</label> <input class="" name="addr" type=
						"text">
					</div>
					<div>
						<label for="city">City</label> <input class="" name="city" type="text">
					</div>
					<div>
						<label for="state">State</label> <input class="" name="state" type=
						"text">
					</div>
					<div>
						<label for="beds">Beds</label> <select class="" name="beds">
							<option selected value="1">
								1
							</option>
							<option value="2">
								2
							</option>
							<option value="3">
								3
							</option>
						</select>
					</div>
					<div>
						<label for="fullbath">Full Baths</label> <select class="" name=
						"fullbath">
							<option selected value="1">
								1
							</option>
							<option value="2">
								2
							</option>
							<option value="3">
								3
							</option>
						</select>
					</div>
					<div>
						<label for="halfbath">Half Baths</label> <select class="" name=
						"halfbath">
							<option selected value="1">
								1
							</option>
							<option value="2">
								2
							</option>
							<option value="3">
								3
							</option>
						</select>
					</div>
					<div>
						<label for="stories">Stories</label> <select class="" name="stories">
							<option selected value="1">
								1
							</option>
							<option value="2">
								2
							</option>
							<option value="3">
								3
							</option>
						</select>
					</div>
					<div>
						<label for="exteriors">Exteriors</label> <input name="exteriors" type=
						"text">
					</div>
					<div>
						<label for="heating">Heating</label> <select class="" name="heating">
							<option selected value="gas">
								Gas
							</option>
							<option value="oil">
								Oil
							</option>
							<option value="nuclearfission">
								Nuclear Fission
							</option>
						</select>
					</div>
					<div>
						<label for="cooling">Cooling</label> <select class="" name="cooling">
							<option selected value="centralair">
								Central Air
							</option>
							<option value="windowunits">
								Window Units
							</option>
						</select>
					</div>
					<div>
						<label for="water">Water</label> <select class="" name="water">
							<option selected value="public">
								Public
							</option>
							<option value="well">
								Well
							</option>
						</select>
					</div>
					<div>
						<label for="sewer">Sewer</label> <select class="" name="sewer">
							<option selected value="public">
								Public
							</option>
							<option value="septic">
								Septic
							</option>
						</select>
					</div>
					<div>
						<label for="basementtype">Basement Type</label> 
						<textarea name="basementtype" rows="5">
</textarea>
					</div>
					<div>
						<label for="parking">Parking</label> 
						<textarea name="parking" rows="5">
</textarea>
					</div>
					<div>
						<label for="condition1">Condition</label> <select class="" name=
						"condition1">
							<option selected value="excellent">
								Excellent
							</option>
							<option value="good">
								Good
							</option>
							<option value="fair">
								Fair
							</option>
						</select>
					</div>
					<div>
						<label for="design">Design</label> 
						<textarea name="design" rows="5">
</textarea>
					</div>
					<div>
						<label for="construct">Construction Type</label> <select class="" name=
						"construct">
							<option selected value="brick">
								Brick
							</option>
							<option value="wood">
								Wood
							</option>
							<option value="Siding">
								Siding
							</option>
						</select>
					</div>
					<div>
						<label for="age">Age</label> 
						<textarea name="age" rows="5">
</textarea>
					</div>
					<div>
						<label for="footage">Square Footage</label> 
						<textarea name="footage" rows="5">
</textarea>
					</div>
					<div>
						<label for="lotsize">Lotsize</label> 
						<textarea name="lotsize" rows="5">
</textarea>
					</div>
					<div>
						<label for="taxes">Taxes</label> 
						<textarea name="taxes" rows="5">
</textarea>
					</div>
					<div>
						<label for="county">County/Township</label> <select class="" name=
						"county">
							<option selected value="westyork">
								West York
							</option>
							<option value="westmanchestertship">
								West Manchester Township
							</option>
						</select>
					</div>
					<div>
						<input class="checkherebtn" name="submit" type="submit" value="Add Property">
					</div>
				</form>
			</div>
		</div>
	</div>
    <br>
<a href="admin.php">Back to Admin</a>
</body>
</html>