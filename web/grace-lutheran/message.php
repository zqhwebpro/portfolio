<?php include 'inc/session.php';
if($_SESSION['usertypeid']!=100){
	header('Location: logout.php');
	exit;
}
if($_POST['submit'] == 'Reply'){
	$error = false;
	extract($_POST);
	$required = array ($to, $messagetxt);
	if(in_array(NULL, $required)){
		$error = true;
		$msg = "<p class=\"error\">All fields are required.</p>";
	}
	if(!$error){
		$sql = "INSERT INTO `messages` (`messageid`,`to`,`from`,`messagetxt`,`timestamp`,`active`) VALUES(NULL,'".mysqli_real_escape_string($con,$to)."','".$_SESSION['userid']."','".mysqli_real_escape_string($con,$messagetxt)."',CURRENT_TIMESTAMP,'1');";
		
		$results = mysqli_query($con, $sql);
		$userid = mysqli_insert_id();
		$msg = "<p class=\"alert\">Your message has been sent! You may go back to your <a href=\"client.php\">control panel</a>.</p>";
	}
}
?>
<!doctype html>
<html>
<head>
<meta charset="UTF-8">
<title>Message Test</title>
</head>

<body>

<h2>Send message</h2>
<?php $sql = "SELECT `messageid`,`to`,`messagetxt`,`timestamp` FROM `messages` WHERE `to`={$_SESSION['userid']} AND `from`={$_GET['userid']}
UNION
SELECT `messageid`,`to`,`messagetxt`,`timestamp` FROM `messages` WHERE `to`={$_GET['userid']} AND `from`={$_SESSION['userid']} ORDER BY 1 ASC;";
echo $sql;
$result = mysqli_query($con,$sql);
while ($row=mysqli_fetch_array($result)){
	echo '<ul>'
			.'<li><a href="#">'. date('D M jS Y h:i A',strtotime($row['timestamp'])). '</a>'
				.'<ul>'
					.'<li>' .$row['messagetxt'] . '</li>'
				.'</ul>'
			.'</li>'
		.'</ul>';
}?>

<h2>Reply</h2>
<?php if(isset($msg)){echo $msg;}?>
	<form action="<?php echo $_SERVER['PHP_SELF'].'?'.$_SERVER['QUERY_STRING'];?>" method="post">
    <div class="">
        <input type="hidden" name="to" value="<?php echo $_GET['userid'];?>" />
    </div>
    <div>
        <textarea name="messagetxt" placeholder="Write your reply here..."></textarea>
    </div>
    <div>
        <input type="submit" name="submit" value="Reply"/>
    </div>
	</form>
</body>
</html>