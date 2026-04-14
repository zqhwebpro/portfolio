<?php include('lib/inc/session.php');

if($_SESSION['usertypeid']!=200){
	header('Location: logout.php');
	exit;
}

if($_POST['submit'] == 'Edit Property'){
	extract($_POST);
	$required = array($addr);
	if (in_array(NULL, $required)){
		$msg="<p><span class=\"error\"></span>Please fill in all required fields</p>";}
		$sql = "UPDATE `property` SET `addr` = 'addr' WHERE `property` = '".$_GET["p"]."'";
		$sql = "UPDATE `property` SET `retailPrice` = '$retailPrice' WHERE `property` = '".$_GET["p"]."'";
		$sql = "UPDATE `property` SET `investorPrice` = '$investorPrice' WHERE `property` = '".$_GET["p"]."'";
		$sql = "UPDATE `property` SET `investorTagLine` = '$investorTagLine' WHERE `property` = '".$_GET["p"]."'";
		$sql = "UPDATE `property` SET `city` = '$city' WHERE `property` = '".$_GET["p"]."'";
		$sql = "UPDATE `property` SET `state` = '$state' WHERE `property` = '".$_GET["p"]."'";
		$sql = "UPDATE `property` SET `exteriors` = '$exteriors' WHERE `property` = '".$_GET["p"]."'";
		$sql = "UPDATE `property` SET `county` = '$county' WHERE `property` = '".$_GET["p"]."'";
		$sql = "UPDATE `property` SET `construct` = '$construct' WHERE `property` = '".$_GET["p"]."'";
		$sql = "UPDATE `property` SET `condition1` = '$condition1' WHERE `property` = '".$_GET["p"]."'";
		$sql = "UPDATE `property` SET `bed` = '$bed' WHERE `property` = '".$_GET["p"]."'";
		$sql = "UPDATE `property` SET `fullbath` = '$fullbath' WHERE `property` = '".$_GET["p"]."'";
		$sql = "UPDATE `property` SET `halfbath` = '$halfbath' WHERE `property` = '".$_GET["p"]."'";
		$sql = "UPDATE `property` SET `stories` = '$stories' WHERE `property` = '".$_GET["p"]."'";
		$sql = "UPDATE `property` SET `heating` = '$heating' WHERE `property` = '".$_GET["p"]."'";
		$sql = "UPDATE `property` SET `cooling` = '$cooling' WHERE `property` = '".$_GET["p"]."'";
		$sql = "UPDATE `property` SET `water` = '$water' WHERE `property` = '".$_GET["p"]."'";
		$sql = "UPDATE `property` SET `sewer` = '$sewer' WHERE `property` = '".$_GET["p"]."'";
				
		
		$result=mysqli_query($con, $sql);
		if(mysqli_affected_rows($con)>0){
			$msg="<p>This entry has been updated! You may edit a product or go back to the <a href=\"admin.php\">admin page.</a></p></p>";
		}
}
$sql ="SELECT * FROM `property` WHERE `propertyid` ='".$_GET["p"]."'";
$result=mysqli_query($on, $sql);
$row=mysqli_fetch_array($result);
?>

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Edit A Property</title>
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
				<form action="<?php echo $_SERVER['PHP_SELF'].'?'.$_SERVER['QUERY_STRING'];?>" class="buyform"
				method="post">
                <div>
               	  	<label for="addr">Address</label>
               	  	<input type="text" name="addr" value="<?php echo $row['addr'];?>" />
                </div>
                
                <div>
					<label for="retailPrice">Retail Price</label>
					<input type="text" name="retailPrice" value="<?php echo $row['retailPrice'];?>" />
				</div>
                
  

		<div>
    		<label form="investorPrice">Investor Price</label>
        	<input type="text" name="investorPrice" value="<?php echo $row['investorPrice'];?>" />
		</div>

		<div>
    		<label form="investorTagLine">Investor Tagline</label>
        	<input type="text" name="retailTagLine" value="<?php echo $row['investorTagLine'];?>" />
		</div>


		<div>
			<label for="city">City</label>
			<input type="text" name="city" value="<?php echo $row['city'];?>" />
		</div>

		<div>
			<label for="state">State</label>
			<input type="text" name="state" value="<?php echo $row['state'];?>" />
		</div>

		<div>
    		<label for="exteriors">Exteriors</label>
        	<input type="text" name="exteriors" value="<?php echo $row['exteriors'];?>" />
		</div>

		<div>
						<label for="construct">Construction Type</label> <select class="" name=
						"construct" value="<?php echo $row['construct'];?>">
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
						<label for="condition1">Condition</label> <select class="" name=
						"condition1" value="<?php echo $row['condition1'];?>">
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
						<label for="beds">Beds</label> <select value="<?php echo $row['condition1'];?>" class="" name="beds">
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
        	<input id="" name="submit" type="submit" value="Edit Property" />
        </div>
        
<?php include('lib/inc/basic-upload.php'); ?>
				</form>
                
                <br>
<a href="admin.php">Back to Admin</a>
        

			</div>
		</div>
	</div>
</body>
</html>