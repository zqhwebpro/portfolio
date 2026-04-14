<?php
	if(!isset($_GET['weekID'])) {
		$_GET['weekID'] = str_replace('.php','', basename($_SERVER['PHP_SELF']) );
	}
	$weekID = $_GET['weekID'];

	function contains($substring, $string) {
		$pos = strpos(strtolower($string), strtolower($substring));
		return $pos !== false;
	}

// pre($items);

?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>Kennie's Email - <?php echo date('F j, Y', strtotime($weekID)); ?></title>
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
	width: 100%;
	background: #ffffff;
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
	color:green;
	font-size:20px;
	line-height:20px;
	padding-top:10px;
}

.price {
	font-weight:bolder;
	color:black;
	font-size:50px;
	padding-bottom:10px;
}

.item_large .price {
	font-size:80px;
}

.item_large .item {
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
<center>
	<table class="container">
		<tr>
			<td>
				<table class="content">
					<tr bgcolor="fff8bf">
						<td>
							<img src="images/awning.png" alt="" />
							<table width="640" cellpadding="10" style="margin-top: 10px;">
								<tr>
									<td style="vertical-align: middle;">
										<a href="http://www.kenniesmarket.com/" target="_blank"><img src="images/kennies-logo.png" alt="Kennie's Marketplace" /></a>
									</td>
									<td style="vertical-align: middle;">
										<a href="http://www.kenniesmarket.com/" target="_blank"><img src="images/buttons-1.png" alt="Visit Our Website" /></a>
									 </td>
									 <td style="vertical-align: middle;">
										<a href="http://www.kenniesmarket.com/weekly-ad/" target="_blank"><img src="images/buttons-2.png" alt="View Our Weekly Circular" /></a>
									 </td>
									 <td style="vertical-align: middle;">
										<a href="http://www.kenniesmarket.com/coupons/manufacturers/" target="_blank"><img src="images/couponsbutton.png" alt="Coupons" /></a>
									 </td>
								</tr>
							</table>
							<p style="color: #0c112f; font-size:10px;"><strong>Take A Quick Survey For A Chance At A $1,000 Kennie’s Gift Card!<br />Having trouble viewing this email? <webversion><span style="color: #0c112f;">Click Here To View In Browser</span></webversion></p>
							<a href="https://www.surveymonkey.com/r/8FJD3DN" target="_blank">
								<img src="images/20171102-nov-survey/header.jpg" alt="Kennies Markets Customer Survey November 2017" /></a>
						</td>
					</tr>

					<tr bgcolor="fff8bf">
						<td>
							<a href="http://www.kenniesmarket.com/weekly-ad/" target="_blank"/><img src="images/<?php echo $weekID; ?>/weekly_specials.png" alt="Weekly Specials" width="640"/></a>
							<center>
								<a href="http://www.kenniesmarket.com/" target="_blank"><img src="images/kennies-logo.png" alt="Kennie's Marketplace" /></a><br /><br />
								<table width="500" cellpadding="10">
									<tr>
										<td style="vertical-align: middle;">
											<a href="http://www.kenniesmarket.com/" target="_blank"/><img src="images/buttons-1.png" alt="Visit Our Website" /></a>
										</td>
										<td style="vertical-align: middle;">
											<a href="http://www.kenniesmarket.com/weekly-ad/" target="_blank"/><img src="images/buttons-2.png" alt="View Our Weekly Circular" /></a>
										</td>
										<td style="vertical-align: middle;">
											<a href="http://www.kenniesmarket.com/coupons/manufacturers/" target="_blank"><img src="images/couponsbutton.png" alt="Coupons" /></a>
										</td>
										<td style="vertical-align: middle;">
											<a href="http://www.kenniesmarket.com/contact-us-and-store-info/contact-us/" target="_blank"/><img src="images/buttons-3.png" alt="Contact Us" /></a>
										</td>
									</tr>
								</table>
							</center>
							<p style="color: #666666;">If you wish to no longer receive these emails, <unsubscribe><span style="color: #999999;">click here to unsubscribe</span></unsubscribe>.</p>
						</td>
					</tr>
				</table>
			</td>
		</tr>
	</table>
</center>
</body>
</html>
