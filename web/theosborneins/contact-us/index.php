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
			<div class="col-sm-12 text-center">
				<h1>Contact Osborne Insurance Agency</h1>
				<hr>
			</div>
			<div class="col-sm-4">
				<div class="well">
					<p><strong><span class="glyphicon glyphicon-envelope"></span> Email:</strong> <br/><a href="mailto:eosborne72@yahoo.com">eosborne72@yahoo.com</a></p>
					<p><strong><span class="glyphicon glyphicon-earphone"></span> Phone:</strong> <br/> <a href="tel:12764665492">276-466-5492</a></p>
					<p><strong><span class="glyphicon glyphicon-map-marker"></span> Address:</strong> <br/><a href="https://www.google.com/maps/dir//2016+Euclid+Ave,+Bristol,+VA+24201/@36.5972439,-82.2082655,17z/data=!4m16!1m7!3m6!1s0x8850761a2862e295:0x5aaf5855a3806787!2s2016+Euclid+Ave,+Bristol,+VA+24201!3b1!8m2!3d36.5972396!4d-82.2060768!4m7!1m0!1m5!1m1!1s0x8850761a2862e295:0x5aaf5855a3806787!2m2!1d-82.2060768!2d36.5972396" target="_blank">2016 Euclid Ave.<br/>Bristol, VA 24201</a></p>
				</div>
			</div>
			<div class="col-sm-8">
				<div class="google-maps">
					<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3203.210296105798!2d-82.20826548451714!3d36.597243886797216!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8850761a2862e295%3A0x5aaf5855a3806787!2s2016+Euclid+Ave%2C+Bristol%2C+VA+24201!5e0!3m2!1sen!2sus!4v1511191726694" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>
				</div>
			</div>
		</div>
	</div>
	<div class="grey-bkg border-top-grey"></div>
	<?php
	include WEBROOT . 'inc/footer.php';
	include WEBROOT . 'inc/bottomscripts.php'; ?>
</body>
</html>
