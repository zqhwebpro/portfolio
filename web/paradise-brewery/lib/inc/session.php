<?php session_start();
$con = mysqli_connect("localhost","zqhdesig_ecommin","Testing1234","zqhdesig_ecomm");
//Check Connection
if (mysqli_connect_errno())
{
	echo "Failed to connect to MySQL: " . mysqli_connect_error();
}
?>