<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Untitled Document</title>
</head>

<body>
<ul id="accountsettings">
<?php if($_SESSION['usertypeid']==200){
	echo '<li><a href="add-property.php">Add New Property</a></li>';
	echo '<li><a href="add-news.php">Add New Post</a></li>';
}else{
	if ($_SESSION['usertypeid']==100){
	echo '<li><a href="logout.php">Logout</a></li>';
	echo '<li><a href="client.php">My Acciont</a></li>';

	}else{
		echo '<li><a href="login.php">Login</a></li>';
	}
}?>
</body>
</html>