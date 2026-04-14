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
        $rarr['errors'][] = 'You dont appear to be a human<br>Please refresh the page and try again.';
        die(json_encode($rarr));
    }

    $subject = '[Rodney Cole Insurance] Call Request';

	$send_to = array('info@rodneycoleinsuranceagency.com');
	$to = implode(',', $send_to);
    $from = '"Rodney Cole Insurance Agency Website Call Request Form" <no-reply@rodneycoleinsuranceagency.com>';

    // format message
    $message = "{$_POST['questionsName']} requested a call<br /><br /><strong>Phone</strong>: {$_POST['questionsPhone']}";

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'http://www.weberadvertising.com/form_processes/sendmail/sendmail.php');
    curl_setopt($ch, CURLOPT_HEADER, false);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt(
		$ch,
		CURLOPT_POSTFIELDS,
		array(
			'send_to' => $to,
			'from' => $from,
			'subject' => $subject,
			'message' => $message,
            'mimetype' => 'text/html'
		)
	);
    // execute the curl call
    $result = curl_exec($ch);
    // close the curl connection
    curl_close($ch);

    // turn result into array
    $result_arr = json_decode($result, true);
    // check success of send
	$rdata['success'] = $result_arr['success'];

    // check if email was sent
    if (!$rdata['success']) {
        header('Content-Type: application/json', true);
        header('HTTP/1.1 503 Service Unavailable', true, 503);
        $rarr['errors'][] = 'Could not send email';
        die(json_encode($rarr));
    }

	// reset are you human
    ruhuman::reset();

	die(json_encode($rdata));
    exit;
}
?>
<!doctype html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="description" content="At Rodney Cole Insurance you experience local service that makes a difference. As an independent agent we know a variety of insurance companies which means more options for you." />
	<meta name="keywords" content="Rodney Cole Insurance, Insurance, Local, Service, Independent, Agency, Donegal" />

	<title>Rodney Cole Insurance | Home</title>

	<?php
		include WEBROOT . 'inc/topscripts.php';
		include WEBROOT . 'inc/ga.php';
	?>
</head>

<body>
	<?php include WEBROOT . 'inc/header.php';?>
	<div class="bigbanner">
		<div class="container">
			<div class="col-sm-12">
				<div class="slider">
					<a href="<?php echo WEBURLROOT; ?>personal-insurance/auto-and-boat/"><img class="img-responsive" src="<?php echo WEBURLROOT; ?>images/banners/driving-banner.jpg" alt="Driving is Expensive Enough"></a>
				</div>
				<a href="<?php echo WEBURLROOT; ?>want-a-better-quote/"><button type="submit" class="btn btn-block btn-lg btn-request">Request A Quote</button></a>
			</div>
		</div>
	</div>
	<div class="container padding-vertical-lg">
		<div class="row banner-q">
			<div class="col-sm-7">
				<h2 class="home-marg-fix">Why work with an independent insurance agent?</h2>
				<p>At Rodney Cole Insurance Agency you experience local service that makes a difference because we provide insurance solutions designed to fit your needs.</p>
				<p>As an independent agency we work with a variety of companies which means more options for you.</p>
				<p>We help protect your assets and save you money. We also believe it’s important to work with great companies, like Donegal, which deliver great rates plus outstanding claims service and support if there is an accident.</p>
			</div>
			<div class="col-sm-5">
				<div class="panel panel-default panel-blue">
					<div class="panel-heading">
						<h4 class="panel-title text-slab">We Proudly Offer</h2>
					</div>
					<div class="panel-body">
						<a href="http://donegalgroup.com/" target="_blank"><img src="<?php echo WEBURLROOT; ?>images/providers/Southern-Insurance-Co-Logo-4C.png" alt="Donegal Insurance Group" class="img-full dig" /></a>
					</div>
					<div class="panel-footer">
						<a href="http://donegalgroup.com/" target="_blank" class="btn btn-block btn-textwrap btn-danger">Check Out Their Website</a>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="padding-vertical-lg dk-blue-bg">
		<div class="container">
			<div class="row">
				<div class="col-sm-6">
					<div class="com-pers-boxes" style="background-color:white; height: 450px; margin-top: 30px;">
						<img src="<?php echo WEBURLROOT; ?>images/Rodney-Cole-Dia.png" alt="Rodney Cole Diamond" class="rod-dia-l" /><h3 class="home-pol">Commercial Policies</h3><img src="<?php echo WEBURLROOT; ?>images/Rodney-Cole-Dia.png" alt="Rodney Cole Diamond" class="rod-dia-r" />
						<hr>
						<ul class="home-ul">
							<li><a href="<?php echo WEBURLROOT; ?>/commercial-insurance/business-owners-insurance">Business Owners</a></li>
							<li><a href="<?php echo WEBURLROOT; ?>/commercial-insurance/liability">Liability</a></li>
							<li><a href="<?php echo WEBURLROOT; ?>/commercial-insurance/workers-compensation">Workers’ Comp</a></li>
							<li><a href="<?php echo WEBURLROOT; ?>/commercial-insurance/commercial-auto">Auto</a></li>
							<li><a href="<?php echo WEBURLROOT; ?>/commercial-insurance/commercial-umbrella">Umbrella</a></li>
						</ul>
					</div>
				</div>
				<div class="col-sm-6">
					<div class="com-pers-boxes" style="background-color:white; height: 450px; margin-top: 30px;">
						<img src="<?php echo WEBURLROOT; ?>images/Rodney-Cole-Dia.png" alt="Rodney Cole Diamond" class="rod-dia-l" /><h3 class="home-pol">Personal Policies</h3><img src="<?php echo WEBURLROOT; ?>images/Rodney-Cole-Dia.png" alt="Rodney Cole Diamond" class="rod-dia-r" />
						<hr>
						<ul class="home-ul">
							<li><a href="<?php echo WEBURLROOT; ?>/personal-insurance/homeowners-and-renters">Homeowners &amp; Renters</a></li>
							<li><a href="<?php echo WEBURLROOT; ?>/personal-insurance/auto-and-boat">Auto &amp; Boat</a></li>
							<li><a href="<?php echo WEBURLROOT; ?>/personal-insurance/life-insurance">Life</a></li>
							<li><a href="<?php echo WEBURLROOT; ?>/personal-insurance/health-insurance">Health</a></li>
							<li><a href="<?php echo WEBURLROOT; ?>/personal-insurance/condo-insurance">Condominium</a></li>
							<li><a href="<?php echo WEBURLROOT; ?>/personal-insurance/umbrella-insurance">Umbrella</a></li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
	<?php include WEBROOT . 'inc/footer.php'; ?>
	<?php include WEBROOT . 'inc/bottomscripts.php'; ?>
</body>
</html>
