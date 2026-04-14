<?php
include 'inc/top.php';

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

    $mail->setFrom('no-reply@weberadvertising.com', 'Scott & Wilson Insurance');
    $mail->addAddress('info@scottandwilson.com');
    $mail->isHTML(true);

    $mail->Subject = '[Scott & Wilson Insurance] Call Request';

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
	<meta name="description" content="At Scott &amp; Wilson Insurance you experience local service that makes a difference. As an independent agent we know a variety of insurance companies which means more options for you." />
	<meta name="keywords" content="Scott &amp; Wilson, Insurance, Local, Service, Independent, Agency, Donegal" />

	<title>Scott &amp; Wilson Insurance | Home</title>

	<?php include 'inc/topscripts.php';?>
	<?php include 'inc/ga.php'; ?>
</head>

<body>
	<?php include 'inc/header.php';?>
	<div class="bigbanner">
		<div class="container">
			<div class="col-sm-12">
				<div class="slider">
					<img class="img-responsive" src="images/banners/driving-banner.jpg" alt="Driving is Expensive Enough">
 					<img class="img-responsive" src="images/banners/sw-local-banner.jpg" alt="Local Service That Makes A Difference">
				</div>
			</div>
		</div>
	</div>
	<div class="container padding-vertical-lg">
		<div class="row">
			<div class="col-sm-7">
				<h2>Why work with an independent insurance agent?</h2>
				<p>At Scott &amp; Wilson Insurance you experience local service that makes a difference. As an independent agent we know a variety of insurance companies which means more options for you.</p>
				<p>We help protect your assets and help save you money. We also believe it’s im-portant to work with companies like Donegal, which deliver great rates plus outstanding claims service and support if there is an accident.</p>
			</div>
			<div class="col-sm-5">
				<div class="panel panel-default panel-blue">
					<div class="panel-heading">
						<h4 class="panel-title text-slab">We Proudly Offer</h2>
					</div>
					<div class="panel-body">
						<a href="http://donegalgroup.com/" target="_blank"><img src="images/providers/Southern-Insurance-Co-Logo-4C.png" alt="Donegal Insurance Group" class="img-full dig" /></a>
					</div>
					<div class="panel-footer">
						<a href="http://donegalgroup.com/" target="_blank" class="btn btn-block btn-textwrap btn-danger">Check Out Their Website</a>
					</div>
				</div>
			</div>
		</div>
	</div>
	<?php include 'inc/footer.php'; ?>
	<?php include 'inc/bottomscripts.php'; ?>
</body>
</html>
