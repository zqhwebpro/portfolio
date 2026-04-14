<?php
	if(!isset($_GET['weekID'])) {
		$_GET['weekID'] = str_replace('.php','', basename($_SERVER['PHP_SELF']) );
	}
	$weekID = $_GET['weekID'];

	function contains($substring, $string) {
		$pos = strpos(strtolower($string), strtolower($substring));
		return $pos !== false;
	}
	function button($text, $link, $recipe = false) {
        echo '
        <div><!--[if mso]>
  <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="' . $link . '" style="height:'. ($recipe ? '30' : '55' ).'px;v-text-anchor:middle;width:200px;" arcsize="10%" strokecolor="#83521e" fillcolor="#83521e">
    <w:anchorlock/>
    <center style="color:#ffffff;font-family:sans-serif;font-size:13px; line-height:16px; font-weight:bold;">' . $text . '</center>
  </v:roundrect>
<![endif]--><a href="' . $link . '"
style="background-color:#83521e;border:1px solid #83521e;border-radius:4px;color:#ffffff;display:inline-block;font-family:sans-serif;font-size:13px;font-weight:bold;line-height:16px;text-align:center;text-decoration:none;width:200px;-webkit-text-size-adjust:none;mso-hide:all;"target="_blank">' . $text . '</a></div>
        ';
    }

	// voted most handy function of the year, 4 years in a row... true story bro
	function pre($arr, $exit) {
		echo '<pre>' . print_r($arr, true) . '</pre>';
		if ($exit) { exit; }
	}
	function formatprice($price) {
		$price = str_replace('$', '<sup>$</sup>', $price);
		$price = str_replace(' for ', '/', $price);
		$price = str_replace(' lb', '<small>lb</small>', $price);
		$price = str_replace(' ea', '<small>ea</small>', $price);
		return $price;
	}

	// initialize items array
    $items = array();
    // the items file to read
    $items_file = 'CSV/' . substr(basename(__FILE__), 0, -4) . '.csv';

    // work around for mac line endings
//    $fc_old = file_get_contents($items_file);
    $fc_replace = str_replace("\r", "\n", $fc_old);
    if(file_put_contents($items_file, $fc_replace) === False){
        die('Could not write to file: ' . $items_file);
    }

    // get a handle of the file we are reading
    $file = fopen($items_file , "r");
    // loop through each line
    while(!feof($file)){
        // get the current line
        $tmp = fgetcsv($file);
        // add the line to the items array
        $items[] = array(
            'product' => $tmp[0],
            'price' => $tmp[1],
            'extra' => $tmp[2],
            'recipe' => $tmp[3],
            'image' => $tmp[4]
        );
    }
    // close the file
    fclose($file);

 //pre($items);

?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>Martin's Country Market Email - <?php echo date('F j, Y', strtotime($weekID)); ?></title>
<style type="text/css">
body {
	width: 100%;
	background: #ffffff;
	margin: 0px;
	padding: 0px;
	text-align: center;
	font-family: Arial, sans-serif;
}

img, a img {
	border: 0px;
}

td img {
	vertical-align: top;
}

img {
	vertical-align: top;
}

table {
	border-collapse: collapse;
	border-spacing: 0;
}

td {
	vertical-align: top;
	padding: 0px;
}

.bogo {
    background-color: #95338e;
    display: inline-block;
    margin-top: 20px;
    margin-left: 10px;
    margin-right: 10px;
    padding: 10px;
    text-align: center;
}
.bogo1 {
    padding: 2px 5px;
    font-size: 22px;
    background-color: #95338e;
    color: #ffe737;
}

.bogo2 {
    padding: 2px 5px;
    font-size: 48px;
    background-color: #95338e;
    color: #ffe737;
}

.container {
	font-family: Arial, sans-serif;
}

.container td {
	text-align: center;
}

.content {
	width: 640px;
	margin: 0px auto;
}

img {
	vertical-align: top;
}

.wrap {
	width: 640px;
	margin: 0px auto;
}

.wrap td {
	text-align: left;
}

p {
	margin: 1em 0px;
	font-family: Arial, sans-serif;
}

.item {
	font-weight:bold;
	color:black;
	font-size:20px;
	line-height:20px;
	padding-top:10px;
	text-align: left;
}

.item-medium .item {
	font-weight:bold;
	color:black;
	font-size:20px;
	line-height:20px;
	padding-top:10px;
	text-align: left;
	padding-right: 20px;
}

.price {
	font-weight:bolder;
	color: rgb(131, 82, 30);
	font-size:50px;
	padding-bottom:10px;
}

.item-box {
	background: white;
	padding: 15px;

}

.top-recipes {
    text-align: center;
}

.top-recipes h2 {
    color: #0d1130;
    padding-top: 5px;
    margin: 0px;
}

.top-recipes td {
    padding: 5px;
}

.top-recipes a {
    font: Gotham, "Helvetica Neue", Helvetica, Arial, sans-serif;
    padding-top: 10px;
    padding-bottom: 10px;
    letter-spacing: 1px;
    font-weight: lighter !important;
}

.item-large .price {
	font-size:80px;
}

.item-medium .price {
	text-align: left;
}


.item-large .item {
	font-size:35px;
	line-height:30px;
}


.price sm {
	font-size:15px;
	color:black;
}


.disclaimer {
	font-size:15px;
	font-style:italic;
	padding-top:8px;
	padding-bottom:8px;
	text-align: left

}

small {
	font-size:30px;
}


.pound {
	font-weight:bold;
	color:black;
	font-size:20px;
}




</style>
</head>
<body>
	<div style="background-color:#83521e;">
	<!--[if gte mso 9]>
	<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
	<v:fill type="tile" src="http://webberadvertising.com/martinseblast/images/wood-background.jpg" color="#83521e"/>
	</v:background>
	<![endif]-->
		<table height="100%" width="100%" cellpadding="0" cellspacing="0" border="0">
		    <tr>
				<td valign="top" align="left" background="http://webberadvertising.com/martinseblast/images/wood-background.jpg">
					<center>
						<table class="container">
							<tr>
								<td>
									<table class="content">
										<tr>
											<td>
												<div style="color: #FFF; font-size:10px;"><br /><strong>Martin’s Daily Specials</strong><br />Having trouble viewing this email? <webversion><span style="color: #FFF;">Click Here To View In Browser</span></webversion></div>
												<table width="640" cellpadding="10" style="margin-top: 15px;">
													<tr>
														<td>
															<img src="images/header.jpg" alt="" usemap="#headerlinks" />
														</td>
													</tr>
												</table>
												<table width="640" cellpadding="10" style="margin-top: 25px;">
													<tr>
														<td style="padding-bottom: 20px;">
															<img src="images/20170831/main-banner.jpg" alt="" width="640"/></a>
														</td>
													</tr>
													<!--<tr>
														<td>
															<a href="http://www.martinscountrymarkets.com/" target="_blank"><img src="images/20161214/holiday-meat-bundle.jpg" alt="" width="640"/></a>
														</td>
													</tr>
													<tr>
														<td style="padding-top: 20px;">
															<a href="http://www.martinscountrymarkets.com/" target="_blank"><img src="images/20161214/john-f-martin-basket.jpg" alt="" width="640"/></a>
														</td>
													</tr>-->
													<!--<tr>
														<td style="padding-top: 20px;">
															<a href="images/20161214/$5-off-coup.pdf" target="_blank"><img src="images/20161214/$5-off-banner.jpg" alt="" width="640"/></a>
														</td>-->
													</tr>
												</table>



											</td>
										</tr>

										<tr>
											<td style="padding-bottom: 20px;">
												<a href="http://www.martinscountrymarkets.com/weekly-ad/" target="_blank"><img src="images/weekly-circular.jpg"></a>
											</td>
										</tr>
										<tr>
											<td>
												<a href="http://www.martinscountrymarkets.com/recipes/recipe-details/8000/" target="_blank">
													<img src="images/recipe_week.png" alt="Visit MartinsCountryMarkets.com for the recipe of the week" width="640"/>
													<img src="images/<?php echo $weekID; ?>/recipe-copy.jpg" alt="Visit MartinsCountryMarkets.com for the recipe of the week" width="640"/>
												</a>
											</td>
										</tr>
										<tr>
											<td style="padding-bottom:15px;">
												<img src="images/recipe-ideas.jpg" alt="More Recipes!" width="640" usemap="#footerlinks"/>
											</td>
										</tr>
										<tr>
											<td>
												<a href="http://www.martinscountrymarkets.com/" target="_blank"/><img src="images/footer-info.jpg" alt="" width="640"/></a>

												<p style="color: #FFF;">If you wish to no longer receive these emails, <unsubscribe><span style="color: #FFF;">click here to unsubscribe</span></unsubscribe>.</p>
											</td>
										</tr>
									</table>
								</td>
							</tr>
						</table>
					</center>
				</td>
			</tr>
		</table>
	</div>
	<map name="headerlinks">
		<area shape="rect" coords="10,144,162,220" href="http://www.martinscountrymarkets.com/weekly-ad/" target="_blank" alt="Weekly Specials">
		<area shape="rect" coords="167,144,316,220" href="http://www.martinscountrymarkets.com/coupons/manufacturer/" target="_blank" alt="Coupons">
		<area shape="rect" coords="232,144,473,220" href="http://www.martinscountrymarkets.com/events/" target="_blank" alt="Savings Events">
		<area shape="rect" coords="480,144,630,220" href="http://www.martinscountrymarkets.com/my-shopping-list/" target="_blank" alt="Build A Shopping List">
		<area shape="rect" coords="571,49,613,90" href="https://www.facebook.com/MartinsCountryMarket" target="_blank" alt="Facebook">
		<area shape="rect" coords="10,18,177,112" href="http://www.martinscountrymarkets.com" target="_blank" alt="Martin's Country Markets">
	</map>
	<map name="footerlinks">
		<area shape="rect" coords="354,26,523,42" href="http://www.martinscountrymarkets.com/recipes/" target="_blank" alt="Cooking Directions">
		<area shape="rect" coords="356,47,593,64" href="http://www.martinscountrymarkets.com/my-shopping-list/" target="_blank" alt="Shopping List">
		<area shape="rect" coords="356,67,528,82" href="http://www.martinscountrymarkets.com/recipes/" target="_blank" alt="More Recipes">
	</map>
</body>
</html>
