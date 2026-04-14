<?php include ('lib/inc/session.php');
if($_SESSION['usertypeid']!=200){
	header('Location: logout.php');
	exit;
}

//if conditional to determine action of links clicked
if(isset($_GET['act'])){
	
	//switch case for action variable
	switch($_GET['act']){
		//if action specified by link is make primary
		case 'mkp':
		//update all images for this property to have image type 0 (standard, non-primary image)
		$sql="UPDATE `images` SET `iamgetypeid`=0 WHERE `propertyid`='".$_GET['p']."'";
		$result=mysqli_query($con,$sql);
		
		//update the specific image set by the lik to have image type of 1(primary image) 
		$sql = "UPDATE `images` SET `imageype`=1 WHERE `imageid`='".$_GET['img']."'";
			break;
			
			//if action specified by link is delete
			case 'del':
			
			//delete specified image from database
			$sql="DELETE FROM `images` WHERE `imageid`='".$_GET['img']."'";
			
			//make array of image file prefixes
			$pre = array('','180_','450_','700_');
			//set file var to the ilename passed by link
			$file = $_GET['filename'];
			
			//for each file prefix, loop to delete all versions of the this image from the server
			foreach($pre as $p){
				//unlink (delete) file from server, requires full path to the file
				unlink($_SERVER['DOCUMENT_ROOT'].'/compass/lib/imgs/properties/'.$_GET['p'].'/'.$p.$file);
				//removes each version of the image file from the server
			}
			break;
	}
	//run either the second update or the delete, this is one query setup to run either after the switch case set the statement
	$result=mysqli_query($con,$sql);
	//header redirect back to the refef==errubg oage (includes query string)
	header('Location: '.$_SERVER['HTTP_REFERER']);
}
	
?>