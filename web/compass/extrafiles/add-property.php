<?php
include ('lib/inc/session.php');
if($_SESSION['usertypeid']!=200){
	header('Location: logout.php');
	exit;
}

function justnums($strings){
$stripthese = array("$",",",".00");
$justnumbers = str_replace($stripthese, "", $string);
return $justnumbers;
}

extract($_POST);

$retailprice = justnum($retailprice);
$investorprice = justnum($investorprice);
$taxes = justnum($taxes);

$required = array($statusid, $propertyid, $retailPrice, $investorPrice, $retailTagLine, $investorTagLine, $retailDesc, $investorDesc, $addr, $city, $state, $zip, $stories, $beds, $fullbath, $halfbath, $exteriors, $heating, $cooling, $water, $sewer, $basementtype, $parking, $condition, $design, $construct, $age, $footage, $lotsize, $taxes, $county, $school, $addedDate, $addedBy);

if(in_array(NULL, $required)){
	$msg="<p><span class=\"asterisk\">*</span><strong>Please fill in all the required fields.</strong></p>";
}else{
		$msg="<p>Your property was submitted.</p>";
		
		//inserting data
		
		$sql = "INSERT INTO `property`(`statusid`,`propertyid`, `retailPrice`,`investorPrice`,`retailTagLine`,`investorTagLine`, `retailDesc`,`investorDesc`,`addr`,`city`,`state`,`zip`,`stories`,`beds`, `fullbath`,`halfbath`,`exteriors`,`heating`,`cooling`,`water`,`sewer`, `basementtype`,`parking`,`condition`,`design`,`construct`,`age`,`footage`, `lotsize`,`taxes`,`county`,`school`,`addedDate`,`addedBy`)
		
		VALUES(NULL,'".$statusid."', '".$propertyid."', '".$retailPrice."', '".$investorPrice."', '".$retailTagLine."', '".$investorTagLine."', '".$retailDesc."', '".$investorDesc."', '".$addr."', '".$city."', '".$state."', '".$zip."', '".$stories."', '".$beds."', '".$fullbath."', '".$halfbath."', '".$exteriors."', '".$heating."', '".$cooling."', '".$water."', '".$sewer."', '".$basementtype."', '".$parking."', '".$condition."', '".$design."', '".$construct."', '".$age."', '".$footage."', '".$lotsize."', '".$taxes."', '".$county."', '".$school."', '".$addedDate."', '".$addedBy."');";
		
		$result=mysqli_query($sql);
		$id=mysqli_insert_id();
}

?>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Add Property</title>
</head>

<body>
<h2>Add New Property Listing</h2>
<?php if(isset($msg)){echo $msg; }?>
<form id="" class="" action"<?php echo $_SERVER['PHP_SELF'];?>" method="post">
	<div>
    	<label form="statusid">Status</label>
        <select class="" name="statusid">
        	<option value="1" selected>Sold</option>
            <option value="2">Pending</option>
            <option value="3">Featured</option>
        </select>

</div>

<div>
    	<label form="retailPrice"></label>
        <input type="text" name="retailPrice"/>
</div>

<div>
    	<label form="retailDesc"></label>
  <textarea type="text" name="retailDesc" rows="5"></textarea>
</div>

<div>
    	<label form="investorPrice"></label>
        <input type="text" name="investorPrice"/>
</div>

<div>
    	<label form="investorTagLine"></label>
        <input type="text" name="investorTagLine"/>
</div>

<div>
    	<label form="investorDesc"></label>
        <textarea type="text" name="investorDesc" rows="5"></textarea>
</div>

<h3>Address Details</h3>
<div>
    	<label for="addr">Address:</label>
        <input type="text" name="addr"/>
</div>

<div>
    	<label for="city">City:</label>
        <input type="text" name="city"/>
</div>

<div>
    	<label for="state">State:</label>
        <select name="state">
        	<option value="PA" selected>PA</option>
            <option value="MD" selected>MD</option>
            </select>
        </div>

<h3>Properties Details</h3>

<div>
    	<label for="beds">Beds:</label>
        <select class="" name="beds">
        	<option value="1" selected>1</option>
            <option value="2">2</option>
            <option value="3">3</option>
        </select>
</div>

<div>
    	<label for="fullbaths">Full Bathes:</label>
        <select class="" name="fullbaths">
        	<option value="1" selected>1</option>
            <option value="2">2</option>
            <option value="3">3</option>
        </select>
</div>

<div>
    	<label for="halfbaths">Full Bathes:</label>
        <select class="" name="halfbaths">
        	<option value="1" selected>1</option>
            <option value="2">2</option>
            <option value="3">3</option>
        </select>
</div>

<div>
    	<label for="stories">Stories:</label>
        <select class="" name="stories">
        	<option value="1" selected>1</option>
            <option value="2">2</option>
            <option value="3">3</option>
        </select>
</div>

<div>
    	<label for="exteriors">Exteriors:</label>
        <input type="text" name="exteriors"/>
</div>

<div>
    	<label for="heating">Heating:</label>
             <select class="" name="heating">
        	<option value="gas" selected>Gass</option>
            <option value="oil">Oil</option>
            <option value="nuclearfission">Nuclear Fission</option>
            </select>
</div>

<div>
    	<label for="cooling">Cooling:</label>
              <select class="" name="stories">
        	<option value="centralair" selected>Central Air</option>
            <option value="windowunits">Window Units</option>
            </select>
</div>

<div>
    	<label for="water">Water:</label>
              <select class="" name="water">
        	<option value="public" selected>Public</option>
            <option value="well">Well</option>
            </select>
</div>

<div>
    	<label for="sewer">Sewer:</label>
              <select class="" name="sewer">
        	<option value="public" selected>Public</option>
            <option value="septic">Septic</option>
            </select>
</div>

<div>
    	<label for="basementtype"></label>
        <textarea type="text" name="basementtype" rows="5"></textarea>
</div>

<div>
    	<label for="parking"></label>
        <textarea type="text" name="parking" rows="5"></textarea>
</div>

<div>
    	<label for="condition">Condition:</label>
              <select class="" name="condition">
        	<option value="excellent" selected>Excellent</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
            </select>
</div>

<div>
    	<label for="design"></label>
        <textarea type="text" name="designer" rows="5"></textarea>
</div>

<div>
	<label for="construct"></label>
     <select class="" name="construct">
        	<option value="brick" selected>Brick</option>
            <option value="wood">Wood</option>
            <option value="Siding">Siding</option>
            </select>
    </div>
    
    <div>
	<label for="age"></label>
    <textarea type="text" name="age" rows="5"></textarea>
    </div>
    
       <div>
	<label for="footage"></label>
    <textarea type="text" name="footage" rows="5"></textarea>
    </div>
    
           <div>
	<label for="lotsize"></label>
    <textarea type="text" name="lotsize" rows="5"></textarea>
    </div>
    
               <div>
	<label for="taxes"></label>
    <textarea type="text" name="taxes" rows="5"></textarea>
    </div>
    
               <div>
	<label for="garage"></label>
       <select class="" name="condition">
        	<option value="attached" selected>Attached</option>
            <option value="detached">Detached</option>
            </select>
    </div>
    
    	<label for="countytownship"></label>
       <select class="" name="countytownship">
        	<option value="westyork" selected>West York</option>
            <option value="westmanchestertship">West Manchester Township</option>
            </select>
    </div>

<div>
    	<input type="submit" name="submit" value="Submit">
</div>



</body>
</html>