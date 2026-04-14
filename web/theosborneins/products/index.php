<?php
include '../inc/top.php';

// get ruhuman class
require_once WEBROOT . 'js/ruhuman/ruhuman.class.php';

// check if we are getting post data
if (!empty($_POST)) {
	$rarr = array();

	// make sure we have all the parts we need
	if (empty($_POST['questionsName']) || empty($_POST['questionsPhone'])) {
		header('Content-Type: application/json', true);
		header('HTTP/1.1 400 Bad Request', true, 400);
		$rarr['errors'][] = 'Not all fields were sent';
		die(json_encode($rarr));
	}

	if (!ruhuman::is_human()) {
        header('Content-Type: application/json', true);
        header('HTTP/1.1 400 Bad Request', true, 400);
        $rarr['errors'][] = 'You dont appear to be a human<br>Please try again later';
        die(json_encode($rarr));
    }

    require WEBROOT . 'inc/PHPMailer/PHPMailerAutoload.php';

    $mail = new PHPMailer;
    $mail->CharSet = 'UTF-8';
    $mail->Encoding = 'base64';
    $mail->isSMTP();
    $mail->Host = 'mail.weberadvertising.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'no-reply@weberadvertising.com';
    $mail->Password = 'flyers';
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;
    $mail->SMTPOptions = array(
        'ssl' => array(
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
        )
    );

    $mail->setFrom('no-reply@weberadvertising.com', 'Osborne Insurance');
    //$mail->addAddress('eosborne72@yahoo.com');
	//TESTING EMAIL BELOW
	$mail->addAddress('zheindel@weberadvertising.com');
    $mail->isHTML(true);

    $mail->Subject = '[Osborne Insurance] Call Request';

    // foramt message
    $mail->Body = "{$_POST['questionsName']} requested a call<br /><br />
    <strong>Phone</strong>: {$_POST['questionsPhone']}";

    $mail->AltBody = "{$_POST['questionsName']} requested a call.\n\nPhone: {$_POST['questionsPhone']}";

    // check if email was sent
    if (!$mail->send()) {
        header('Content-Type: application/json', true);
        header('HTTP/1.1 503 Service Unavailable', true, 503);
        $rarr['errors'][] = 'Could not send email';
        $rarr['errors'][] = $mail->ErrorInfo;
        die(json_encode($rarr));
    }

	// reset are you human
    ruhuman::reset();

    exit;
}
?>
<!doctype html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="description" content="" />
	<meta name="keywords" content="" />
	<style>
    .google-maps {
        position: relative;
        padding-bottom: 75%; // This is the aspect ratio
        height: 0;
        overflow: hidden;
    }
    .google-maps iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100% !important;
        height: 100% !important;
    }
</style>
	<title>Osborne Insurance | Contact Us</title>

	<?php
	include WEBROOT . 'inc/topscripts.php';
	include WEBROOT . 'inc/ga.php'; ?>
</head>

<body>
	<?php include WEBROOT . 'inc/header.php';?>
	<div class="grey-bkg border-bot-grey"></div>
	<div class="container">
		<div class="row">
			<ul class="quick-links">
				<li><a href="#auto"><span class="hidden-xs">&nbsp;</span>Personal Auto&nbsp;</a></li>
				<li><a href="#homeowners">Homeowners&nbsp;</a></li>
				<li><a href="#boat">Boat&nbsp;</a></li>
				<li><a href="#motorcycle">Motorcycle&nbsp;</a></li>
				<li><a href="#commercial-auto">Commercial Auto&nbsp;</a></li>
				<li><a href="#workers-comp">Workers' Comp&nbsp;</a></li>
				<li><a href="#property">Property&nbsp;</a></li>
				<li><a href="#general-liability">General Liability</a></li>
			</ul>
			<hr>
		</div>
	</div>
	<div class="container">
		<div class="row">
			<div class="col-sm-12 text-center">
				<h1>Products</h1>
				<hr>
				<p>Osborne Insurance Agency offers insurance coverage for your auto, home, boat, motorcycle and more, as well as insurance for your business, too. <a href="">Contact us today</a> for insurance solutions tailored to your life or business.</p>
			</div>
		</div>
	</div>
	<div class="container padding-vertical">
		<div class="row">
			<div class="col-sm-12">
				<h2>Personal Insurance:</h2>
			</div>
		</div>
		<a name="auto"></a>
		<div class="row well">
			<div class="col-xs-12 col-sm-3">
				<img src="<?php echo WEBURLROOT; ?>images/ins-type/auto.png" alt="Personal Auto" class="img-responsive ins-type">
			</div>
			<div class="col-xs-12 col-sm-9">
				<h3>Auto</h3>
				<p>We’ll find the price and money-saving discounts to make insuring your car easier, while also delivering the coverage you need for collision, uninsured/underinsured motorists, bodily injury and more.</p>
			</div>
		</div>
		<a name="homeowners"></a>
		<div class="row well white-bg">
			<div class="col-xs-12 col-sm-3">
				<img src="<?php echo WEBURLROOT; ?>images/ins-type/homeowners.png" alt="Homeowners" class="img-responsive ins-type">
			</div>
			<div class="col-xs-12 col-sm-9">
				<h3>Homeowners</h3>
				<p>Your home is one of your most important and valuable assets. So it makes sense that you should protect it. Quality protection for your home and its contents at competitive rates.</p>
			</div>
		</div>
		<a name="boat"></a>
		<div class="row well">
			<div class="col-xs-12 col-sm-3">
				<img src="<?php echo WEBURLROOT; ?>images/ins-type/boat.png" alt="Boat" class="img-responsive ins-type">
			</div>
			<div class="col-xs-12 col-sm-9">
				<h3>Boat</h3>
				<p>We insure boat owners against damage and loss caused by risks such as sinking, fire, storms, theft, collision and injuries due to contact with your vessel or situations caused by your vessel.</p>
			</div>
		</div>
		<a name="motorcycle"></a>
		<div class="row well white-bg">
			<div class="col-xs-12 col-sm-3">
				<img src="<?php echo WEBURLROOT; ?>images/ins-type/motorcycle.png" alt="Motorcycle" class="img-responsive ins-type">
			</div>
			<div class="col-xs-12 col-sm-9">
				<h3>Motorcycle</h3>
				<p>We offer comprehensive motorcycle coverage including full replacement cost, total loss coverage for a brand new bike, coverage for gear and personal belongings plus money-saving discounts.</p>
			</div>
		</div>
	</div>
	<div class="container padding-vertical">
		<div class="row">
			<div class="col-sm-12">
				<h2>Commercial Insurance:</h2>
			</div>
		</div>
		<a name="commercial-auto"></a>
		<div class="row well">
			<div class="col-xs-12 col-sm-3">
				<img src="<?php echo WEBURLROOT; ?>images/ins-type/vans.png" alt="Commercial Auto" class="img-responsive ins-type">
			</div>
			<div class="col-xs-12 col-sm-9">
				<h3>Auto</h3>
				<p>Whether it’s a single vehicle or an entire fleet, we can provide liability coverage and protection from physical damages at a price that works for you.</p>
			</div>
		</div>
		<a name="workers-comp"></a>
		<div class="row well white-bg">
			<div class="col-xs-12 col-sm-3">
				<img src="<?php echo WEBURLROOT; ?>images/ins-type/workers.png" alt="Workers' Comp" class="img-responsive ins-type">
			</div>
			<div class="col-xs-12 col-sm-9">
				<h3>Workers’ Comp</h3>
				<p>Accidents and work-related injuries happen, but we can help provide the protection you need to compensate employees for medical expenses and lost wages.</p>
			</div>
		</div>
		<a name="property"></a>
		<div class="row well">
			<div class="col-xs-12 col-sm-3">
				<img src="<?php echo WEBURLROOT; ?>images/ins-type/property.png" alt="Property" class="img-responsive ins-type">
			</div>
			<div class="col-xs-12 col-sm-9">
				<h3>Property</h3>
				<p>Property coverage for your building and its contents.</p>
			</div>
		</div>
		<a name="general-liability"></a>
		<div class="row well white-bg">
			<div class="col-xs-12 col-sm-3">
				<img src="<?php echo WEBURLROOT; ?>images/ins-type/general.png" alt="" class="img-responsive ins-type">
			</div>
			<div class="col-xs-12 col-sm-9">
				<h3>General Liability</h3>
				<p>It’s important to make sure your business is properly protected from significant financial losses due to damages, injuries, medical expenses, attorney fees, etc.</p>
			</div>
		</div>
	</div>
	<div class="container padding-vertical-lg">
		<div class="row">
			<div class="col-sm-12 text-center">
				<a href="mailto:eosborne72@yahoo.com"><button class="btn btn-alert" style="width:100%;">Contact Us to Request a Quote</button></a>
			</div>
		</div>
	</div>
	<div class="grey-bkg border-top-grey"></div>
	<?php
	include WEBROOT . 'inc/footer.php';
	include WEBROOT . 'inc/bottomscripts.php'; ?>
</body>
</html>
