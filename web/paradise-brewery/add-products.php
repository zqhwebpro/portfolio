<?php include 'lib/inc/session.php';
if($_POST['submit'] == 'Add Product'){
if(!empty($_POST['name']) && !empty($_POST['description']) && !empty($_POST['shortdescription']) && !empty($_POST['price'])){
	
//Products Insert
$sql = "INSERT INTO `products`(`productsid`,`name`,`description`,`shortdescription`,`price`,`active`) ";
$sql .= "VALUES(NULL, '".mysqli_real_escape_string($con,$_POST['name'])."','".mysqli_real_escape_string($con,$_POST['description'])."', '".mysqli_real_escape_string($con,$_POST['shortdescription'])."','".mysqli_real_escape_string($con,$_POST['price'])."', 1);";
$result = mysqli_query($con, $sql);
//Count to see an entry has been made, if it is okay move on
$count = mysqli_affected_rows($con); 
$newproductid = mysqli_insert_id($con);
if($newproductid > 0) {
	//Product Categories Insert
	$sql3 = "INSERT INTO `productcategories`(`productcategoryid`,`categoryid`,`productsid`) ";
	//Need to Make Productcategoryid Auto
	$sql3 .= "VALUES(NULL, '".mysqli_real_escape_string($con,$_POST['categoryid'])."','$newproductid');";
	$result3 = mysqli_query($con, $sql3);
	$count3 = mysqli_affected_rows($con);
}
if($count && $count3){//worked
$msg = "<p class=\"error\">This product has been successfully added.</p>";	
}else{
$msg = "<p class=\"alert\">Please try again.</p>";
}
}else{
$msg = "<p class=\"alert\">All fields are required.</p>";
}//end empty check
}//end news
?>
<!doctype html>
<html>
<head>
<meta charset="UTF-8"> 
 
</head>

<body>
<?php if(isset($msg)){echo $msg;}?>
<form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post">
  <div>
    <label for="categoryid">Category</label>
    <?php  $catsql = "SELECT * FROM `categories`";?>
    <select name="categoryid">
      <?php $catresult = mysqli_query($con, $catsql);
		  while ($catrow = mysqli_fetch_array($catresult)){ ?>
      <option value="<?php echo $catrow['categoryid'] ?>"> <?php echo $catrow['categoryname']; ?></option>
      <?php }?>
    </select>
  </div>
  <div>
    <label for="name">Product Name</label>
    <input class="" type="text" name="name" id="name" />
  </div>
  <div>
    <label for="description">Product Description</label>
    <input class="" type="text" name="description" id="description" />
  </div>
  <div>
    <label for="shortdescription">Product Short Description</label>
    <input class="" type="text" name="shortdescription" id="shortdescription" />
  </div>
  <div>
    <label for="price">Product Price</label>
    <input class="" type="text" name="price" id="price" />
  </div>
  <div>
    <input class="" type="submit" name="submit" value="Add Product"/>
  </div>
</form>

<?php include('lib/inc/basic_upload.php');?> 

</body>
</html>