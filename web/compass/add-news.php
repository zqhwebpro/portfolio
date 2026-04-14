<?php
	include('lib/inc/session.php');
	if($_POST['submit'] == 'Add News'){
		if(!empty($_POST['title']) && !empty($_POST['text'])){
			$sql="INSERT INTO `news` (`newsid`,`title`,`text`,`createddate`,`active`)";
			$sql .="VALUES(NULL, '".mysqli_real_escape_string($con,$_POST['title'])."','"
			.mysqli_real_escape_string($con,$_POST['text'])."',UNIX_TIMESTAMP(),1);";
			$result = mysqli_query($con, $sql);
			$count = mysqli_affected_rows($con);
			echo $sql;
			if($count){
				$msg = "<p class=\"alert\">Your news item was successfully store.</p>";
			}else{
					$msg = "<p class=\"error\">Try Again.</p>";
			}
		}else{
			$msg = "<p class=\"error\">All fields are required.</p>";
		}
	}
	?>

<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Add News Post</title>
<style>
.error{
	background-color:white;
	boder:1px solid #black;
	padding 5px 10px;
	}
	
.alert{
	background-color:white;
	boder:1px solid #black;
	padding 5px 10px;
}
    </style>
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
<form action="<?php echo $_SERVER['PHP_SELF'];?>" method="post">
<div>
	<label for="title">Title</label></br>
    <input class="" type="text" name="title"/>
</div>

<div>
	<label for="text">Text</label></br>
    <textarea class="" type="text" name="text"></textarea>
</div>

<div>
	<input class="" type="submit" name="submit" value="Add News"/>
</div>
<br>
<a href="admin.php">Back to Admin</a>
</body>
</html>