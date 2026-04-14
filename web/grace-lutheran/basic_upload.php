<?php	
// include resize class plugin script
include('resize-class.php');
	
// if conditional check if upload form has been submitted
if($_POST['imgsubmit']=='Upload') {

	// set directory name based on property id
	$dirname = $_GET['p'];
	
	// set image type id to standard image type id
	$imageType = '0';
	
	// set added by based on session user ID
	$addedBy = $_SESSION['usertypeid'];
	
	// define the path to the folder which will hold your home images
	//make a products folder in the imgs directory
	$productsFolder = $_SERVER['DOCUMENT_ROOT'].'lib/imgs/products/';

	// define full path to property ID folder
	$fullpath = $productsFolder.$dirname.'/';
	//echo ($fullpath);
	// if products folder does not exist, make it then set its permissions to read/write all 777
	//checks to see if a directory file exists
	if(!is_dir($productsFolder)){
		//mkdir making a directory
		mkdir($productsFolder); 
		//chmod change permissions to the folder
		chmod($productsFolder, 0777);
	} 

	// if no sub directory exists for this property
	if (!file_exists($fullpath)) {
//echo $fullpath;
	mkdir($fullpath);
	}
		// recheck for property directory
		if(file_exists($fullpath)){

			// create array of acceptable file types (pjpeg is for progressive jpeg, jpg/jpeg are the same save for extension length)
			$fileType=array('gif','jpeg','pjpeg','jpg','png');
			
			// set max file size in MB
			$maxSize=2;
			
				// if uploaded file's type is in the file type array (after removeing 'image/') && the file size is less then max size multiplied by the number of bytes in a single MB
				if (in_array(str_replace("image/","",$_FILES['photo']['type']),$fileType) && $_FILES['photo']['size'] < ($maxSize*1000000)){
					
					// check if a file with the same name of the uploaded file exists in the property ID directory
					if (file_exists($fullpath . $_FILES["photo"]["name"])) {
					$upload_msg .= "<p class=\"alert\">". $_FILES["photo"]["name"] . " already exists.</p>";
					} else {
					// move uploaded file from temporary storage to specified directory
					move_uploaded_file($_FILES["photo"]["tmp_name"], ($fullpath . $_FILES["photo"]["name"]));
					
					//=================================================================================== Create Thumbnail
					// *** 1) Initialise / load image
					$resizeObj = new resize($fullpath . $_FILES["photo"]["name"]);
					if(!resizeObj) { $upload_msg .= "<p class=\"alert\">Didn't create Thumbnail object</p>"; }
					// *** 2) Resize image (options: exact, portrait, landscape, auto, crop)
					$resizeObj -> resizeImage(180, 180, 'crop',0);
					if(!resizeObj) { $upload_msg .= "<p class=\"alert\">Didn't resize Thumbnail</p>"; }
					// *** 3) Save image
					$resizeObj -> saveImage($fullpath . '180_'.$_FILES["photo"]["name"], 100);
					//=================================================================================== Create full size
					// *** 1) Initialise / load image
					$resizeObj = new resize($fullpath . $_FILES["photo"]["name"]);
					if(!resizeObj) { $upload_msg .= "<p class=\"alert\">Didn't create Full Size object</p>"; }
					// *** 2) Resize image (options: exact, portrait, landscape, auto, crop)
					$resizeObj -> resizeImage(700, 700, 'crop',0);
					if(!resizeObj) { $upload_msg .= "<p class=\"alert\">Didn't resize Full Size</p>"; }
					// *** 3) Save image
					$resizeObj -> saveImage($fullpath . '700_'.$_FILES["photo"]["name"], 100);
					//=================================================================================== Create Primary size
					// *** 1) Initialise / load image
					$resizeObj = new resize($fullpath . $_FILES["photo"]["name"]);
					if(!resizeObj) { $upload_msg .= "<p class=\"alert\">Didn't create Primary Size object</p>"; }
					// *** 2) Resize image (options: exact, portrait, landscape, auto, crop)
					$resizeObj -> resizeImage(450, 450, 'landscape',0);
					if(!resizeObj) { $upload_msg .= "<p class=\"alert\">Didn't resize Primary Size</p>"; }
					// *** 3) Save image
					$resizeObj -> saveImage($fullpath . '450_'.$_FILES["photo"]["name"], 100);				
					
					// insert image data into database
					$sql= "INSERT INTO `images`(`imagesid`, `caption`, `productsid`, `active`, `filename`, `adddate`, `addedby`) 
					VALUES (NULL,'".mysqli_real_escape_string($con,$_POST['caption'])."','".$dirname."', 1,'".$_FILES["photo"]["name"]."',CURRENT_TIMESTAMP,'".$addedby."')";
					//echo ($sql);
					$result = mysqli_query($con,$sql);
					
					}
			
				}

		}
}
?>
<h3 class="formHeader">Image Upload and Edit Section:</h3>  
    <form id="addphotos" class="stylized" action="" method="post" enctype="multipart/form-data">
    <div class="formsFieldL">
    <label class="required" for="photo">Photo </label>
    <input type="file" name="photo" id="photo"/>
    </div>
	
    <div class="forms">
    <label class="required" for="caption">Caption</label>
    <input type="text" class="text required" id="caption" name="caption" size="24" />
    </div>
   
    <div class="formsFieldL">
    <input type="submit" class="submit" name="imgsubmit" value="Upload" />
    </div>    
    </form> 
    
	<?php
		// SELECT imgs from DB
		$sql = "SELECT * FROM `images` WHERE `productsid` = ".$_GET['p'].";";
		$result = mysqli_query($con,$sql);
		//echo $sql
		// Display all images
		if($result){
				while($row = mysqli_fetch_array($result)){
				$tmp = $_SERVER['DOCUMENT_ROOT'].'lib/imgs/products/'.$row['productsid'].'/180_'.$row['filename'];
					// if thumbnail image exists echo link to full size of full size
					if (file_exists($tmp)) {
					echo '<a rel="expand" href="'.'lib/imgs/products/'.$row['productsid'].'/700_'.$row['filename'].'" target="_blank" class="thumb"><img src="'.'lib/imgs/products/'.$row['productsid'].'/180_'.$row['filename'].'" class="thumb" alt="'.$row['caption'].'"/></a>';	
					if($row['imagesid']!=1){
					echo'<a href="edit_images.php?p='.$row['productsid'].'&img='.$row['imagesid'].'&act=mkp">Make Primary</a>';
						}
					echo'<a href="edit_images.php?p='.$row['productsid'].'&img='.$row['imagesid'].'&act=del&filename='.$row['filename'].'">Delete</a>';
					}
				}
		}
	?>