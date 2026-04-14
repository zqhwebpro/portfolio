<?php session_start();
$con = mysqli_connect("localhost","zqhdesig_church","psychJ22","zqhdesig_churchfinal");
//Check Connection
if (mysqli_connect_errno())
{
	echo "Failed to connect to MySQL: " . mysqli_connect_error();
}
?>