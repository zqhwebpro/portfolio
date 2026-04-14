<?php 
include 'lib/inc/session.php';
	if($_POST['submit'] == 'Submit'){
		extract($_POST);
		$required = array($title, $text);
		if (in_array(NULL, $required)){
			$msg="<p class=\"error\">Please fill in all fields.</p>";
		}
		$sql="UPDATE `products` SET `name`='$name',`description`='$description', `shortdescription`='$shortdescription', `price`='$price' WHERE `productsid` = '".$_GET["p"]."'";
		$result = mysqli_query($con, $sql);
		if(mysqli_affected_rows($con)>0){
			$msg="<p class=\"alert\">Your entry has been successfully updated.</p>";
		}else{
			$msg="<p class=\"error\">You did not update any of the fields, please try again.</p>";
		}//end try again
	}//end empty check
	
	$sql = "SELECT * FROM `products` WHERE `productsid`='".$_GET["p"]."'";
	$result = mysqli_query($con, $sql);
	$row = mysqli_fetch_array($result);
	?>


<!doctype html>
<html>
<head>
<meta charset="UTF-8">
<title>Edit Products</title>
<style>
.error{
	background-color:#ff999b;
	border:1px solid #8e0608;
	padding:3px;	
}
.alert{
	background-color:#91f2a7;
	border:1px solid #267425;
	padding:3px;	
}
</style>
</head>

<body>
<?php
if(isset($msg)){echo $msg;}?>
<form action="<?php echo $_SERVER['PHP_SELF'].'?'.$_SERVER['QUERY_STRING'];?>" method="post">
<!-- start title field -->
	<div>
    	<label for="name">Name</label></br>
        <input class="" type="text" name="name" value="<?php echo $row['name'];?>"/>
    </div>
<!-- start text field -->
	<div>
    	<label for="description">Description</label></br>
        <textarea class="" type="text" name="description"><?php echo $row['description'];?></textarea>
    </div>
 <!-- start shortdesc -->   
    <div>
    	<label for="shortdescription">Short Description</label></br>
        <textarea class="" type="text" name="shortdescription"><?php echo $row['shortdescription'];?></textarea>
    </div>
     <!-- start shortdesc -->   
    <div>
    	<label for="price">Price</label></br>
        <textarea class="" type="text" name="price"><?php echo $row['price'];?></textarea>
    </div>
<!-- start active -->
	<div>
    	<label for="active">Status</label>
        <select>
        	<option value="" selected>Please Make a Selection</option>
            <option <?php if($row['active']=='1'){echo 'selected="selected"';}?> value="1">Activate</option>   
            <option <?php if($row['active']=='0'){echo 'selected="selected"';}?> value="0">Deactivate</option>
        </select> 
    </div>  
<!-- start submit button -->    
	<div>
    	<input class="" type="submit" name="submit" value="Submit"/>
    </div>
</form>

</body>
</html>