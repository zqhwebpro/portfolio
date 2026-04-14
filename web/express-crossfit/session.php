<?php session_start();
$con = mysqli_connect("localhost","zqhdesig","psycheJ22","zqhdesig_expresscrossfit");
//check connection
if (mysqli_connect_errno())
{
	echo "Failed to connect to MySQL: " . mysqli_connect_error();
}
?>