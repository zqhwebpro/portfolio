<?php include ('lib/inc/session.php'); ?>

<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Product Landing Page</title>
</head>

<body>
<?php
$sql="SELECT  `products`.`name` ,  `products`.`price` ,  `categories`.`categoryname` ,  `products`.`productsid` , `images`.`filename` 
FROM  `products` 
LEFT JOIN  `productcategories` ON  `products`.`productsid` =  `productcategories`.`productsid` 
JOIN  `categories` ON  `productcategories`.`categoryid` =  `categories`.`categoryid` 
LEFT JOIN  `images` ON  `products`.`productsid` =  `images`.`productsid` 
WHERE  `productcategories`.`categoryid` =1;";

$result=mysqli_query($con, $sql);
while($row=mysqli_fetch_array($result)){
	echo '<div>'
	.'<img src="lib/imgs/products/'.$row['productsid'] .'/180_' .$row['filename'].'">'
		.'<h3>'.$row['name'].'</h3>'
		.'<p>'.$row['description'].'</p>'
		.'<p>'.$row['price'].'</p>'
		.'<a href="product-details.php?p='.$row['productsid'].'">'.' '.'View Details</a>'
		.'</div>';
}
?>

<?php
$sql="SELECT  `products`.`name` ,  `products`.`price` ,  `categories`.`categoryname` ,  `products`.`productsid` , `images`.`filename` 
FROM  `products` 
LEFT JOIN  `productcategories` ON  `products`.`productsid` =  `productcategories`.`productsid` 
JOIN  `categories` ON  `productcategories`.`categoryid` =  `categories`.`categoryid` 
LEFT JOIN  `images` ON  `products`.`productsid` =  `images`.`productsid` 
WHERE  `productcategories`.`categoryid` =2;";

$result=mysqli_query($con, $sql);
while($row=mysqli_fetch_array($result)){
	echo '<div>'
	.'<img src="lib/imgs/products/'.$row['productsid'] .'/180_' .$row['filename'].'">'
		.'<h3>'.$row['name'].'</h3>'
		.'<p>'.$row['description'].'</p>'
		.'<p>'.$row['price'].'</p>'
		.'<a href="product-details.php?p='.$row['productsid'].'">'.' '.'View Details</a>'
		.'</div>';
}
?>

<?php
$sql="SELECT  `products`.`name` ,  `products`.`price` ,  `categories`.`categoryname` ,  `products`.`productsid` , `images`.`filename` 
FROM  `products` 
LEFT JOIN  `productcategories` ON  `products`.`productsid` =  `productcategories`.`productsid` 
JOIN  `categories` ON  `productcategories`.`categoryid` =  `categories`.`categoryid` 
LEFT JOIN  `images` ON  `products`.`productsid` =  `images`.`productsid` 
WHERE  `productcategories`.`categoryid` =3;";

$result=mysqli_query($con, $sql);
while($row=mysqli_fetch_array($result)){
	echo '<div>'
	.'<img src="lib/imgs/products/'.$row['productsid'] .'/180_' .$row['filename'].'">'
		.'<h3>'.$row['name'].'</h3>'
		.'<p>'.$row['description'].'</p>'
		.'<p>'.$row['price'].'</p>'
		.'<a href="product-details.php?p='.$row['productsid'].'">'.' '.'View Details</a>'
		.'</div>';
}
?>

<?php
$sql="SELECT  `products`.`name` ,  `products`.`price` ,  `categories`.`categoryname` ,  `products`.`productsid` , `images`.`filename` 
FROM  `products` 
LEFT JOIN  `productcategories` ON  `products`.`productsid` =  `productcategories`.`productsid` 
JOIN  `categories` ON  `productcategories`.`categoryid` =  `categories`.`categoryid` 
LEFT JOIN  `images` ON  `products`.`productsid` =  `images`.`productsid` 
WHERE  `productcategories`.`categoryid` =4;";

$result=mysqli_query($con, $sql);
while($row=mysqli_fetch_array($result)){
	echo '<div>'
	.'<img src="lib/imgs/products/'.$row['productsid'] .'/180_' .$row['filename'].'">'
		.'<h3>'.$row['name'].'</h3>'
		.'<p>'.$row['description'].'</p>'
		.'<p>'.$row['price'].'</p>'
		.'<a href="product-details.php?p='.$row['productsid'].'">'.' '.'View Details</a>'
		.'</div>';
}
?>

<?php
$sql="SELECT  `products`.`name` ,  `products`.`price` ,  `categories`.`categoryname` ,  `products`.`productsid` , `images`.`filename` 
FROM  `products` 
LEFT JOIN  `productcategories` ON  `products`.`productsid` =  `productcategories`.`productsid` 
JOIN  `categories` ON  `productcategories`.`categoryid` =  `categories`.`categoryid` 
LEFT JOIN  `images` ON  `products`.`productsid` =  `images`.`productsid` 
WHERE  `productcategories`.`categoryid` =5;";

$result=mysqli_query($con, $sql);
while($row=mysqli_fetch_array($result)){
	echo '<div>'
	.'<img src="lib/imgs/products/'.$row['productsid'] .'/180_' .$row['filename'].'">'
		.'<h3>'.$row['name'].'</h3>'
		.'<p>'.$row['description'].'</p>'
		.'<p>'.$row['price'].'</p>'
		.'<a href="product-details.php?p='.$row['productsid'].'">'.' '.'View Details</a>'
		.'</div>';
}
?>

</body>
</html>