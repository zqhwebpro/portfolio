<?php
include ('lib/inc/session.php');
if($_POST['submit'] == 'Submit'){
	extract($_POST);
    $required = array($fname,$lname);
    if(in_array(NULL, $required)){
    	$msg="<p class =\"error\">Please fill in all fields.</p>";
	}
	$sql="UPDATE `users` SET `fname`='$fname', `lname` WHERE `usersid` = '".$$_GET["p"]."'";
	$result = mysqli_query($con, $sql);
	if(mysqli_affected_rows($con)>0){
			$msg="<p class=\"alert\">Your entry has been successfully updated.</p>";
	}else{
			$msg="<p class=\"error\">Yu did not update any of the fields, please try again.</p>";
	}//end try again
}//end empty check

$sql="SELECT * FROM `users` WHERE `userid`='".$$_GET["p"]."'";
$result=mysqli_query($con, $sql);
$row=mysqli_fetch_array($result);
?>

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Edit A User</title>
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
<form action="<?php echo $_SERVER['PHP_SELF'].'?'.$_SERVER['QUERY_STRING'];?>" method="post" class="buyform">
<div>
	<label for="userid">User ID:</label>
    <input class="" type="text" name="userid" value="<?php echo $row['userid'];?>"/>
</div>

<div>
	<label for="usertypeid">User Type ID:</label>
    <input class="" type="text" name="usertypeid" value="<?php echo $row['usertypeid'];?>"/>
</div>


<div>
	<label for="fname">First Name:</label>
    <input class="" type="text" name="fname" value="<?php echo $row['fname'];?>"/>
</div>

<div>
	<label for="lname">Last Name:</label>
    <input class="" type="text" name="lname" value="<?php echo $row['lname'];?>"/>
</div>

<div>
	<label for="email">Email:</label>
    <input class="" type="text" name="email" value="<?php echo $row['email'];?>"/>
</div>

<div>
	<label for="password">Password:</label>
    <input class="" type="text" name="password" value="<?php echo $row['password'];?>"/>
</div>

<div>
	<label for="createddate">Created Date:</label>
    <input class="" type="text" name="createddate" value="<?php echo $row['createddate'];?>"/>
</div>

<div>
	<label for="active">Active:</label>
    <input class="" type="text" name="active" value="<?php echo $row['active'];?>"/>
</div>

<div>
    <input class="" type="submit" name="submit" value="Update"/>
</div>
</form>
<br>
<a href="admin.php">Back to Admin</a>

</body>
</html>