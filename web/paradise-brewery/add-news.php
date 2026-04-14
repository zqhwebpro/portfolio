<?php
include 'lib/inc/session.php';
if($_POST['submit'] == 'Add News'){
	//required fields
	if(!empty($_POST['title']) && !empty($_POST['text'])){
		//start sql
		$sql="INSERT INTO `news`(`newsid`,`title`,`text`,`createddate`,`active`)";
		$sql .="VALUES (NULL, '".mysqli_real_escape_string($con,$_POST['title'])."','".mysqli_real_escape_string($con,$_POST['text'])."',UNIX_TIMESTAMP(),1);";
		$result = mysqli_query($con, $sql);
		$count = mysqli_affected_rows($con);
		echo $sql;
		if($count){
			$msg = "<p class=\"alert\">Your news item was successfully stored.</p>";
		}else{
			$msg = "<p class=\"error\">Try Again.</p>";
		}//end try again
		}else{
			$msg = "<p class=\"error\">All fields are required.</p>";
		}//end empty check
}//end news
?>
<!doctype html>
<html>
<head>
<meta charset="UTF-8">
<title>Add News</title>
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
<form action="<?php echo $_SERVER['PHP_SELF'];?>" method="post">
<!-- start title field -->
	<div>
    	<label for="title">Title</label></br>
        <input class="" type="text" name="title"/>
    </div>
<!-- start text field -->
	<div>
    	<label for="text">Text</label></br>
        <textarea class="" type="text" name="text" id="mess"></textarea>
    </div>
<!-- start submit button -->    
	<div>
    	<input class="" type="submit" name="submit" value="Add News"/>
    </div>
</form>
</body>
</html>