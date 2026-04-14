<?php
include 'inc/top.php';

// get ruhuman class
require_once WEBROOT . 'js/ruhuman/ruhuman.class.php';

// check if we are getting post data
if (!empty($_POST)) {
	$rarr = array();

	// make sure we have all the parts we need
	if (empty($_POST['firstname']) || empty($_POST['lastname']) || empty($_POST['location']) || empty($_POST['email']) || empty($_POST['phone']) || empty($_POST['calltime']) || empty($_POST['message'])) {
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

	require WEBROOT . 'inc/mail_godaddy.php';

	$mail = new PHPMailer;

    // $mail->SMTPDebug = 2;
    $mail->IsSMTP();
    $mail->Host = 'localhost';
    $mail->SMTPAuth = false;

    $mail->setFrom('no-reply@weberadvertising.com', 'Insurance Market Inc.');
    $mail->addAddress('sjhartstein@insurancechoices.com');

	$mail->isHTML(true);

    $mail->Subject = '[Insurance Market Inc.] Contact Request';

    // foramt message
	$message = "{$_POST['firstname']} {$_POST['lastname']} requested a call<br /><br />
    <strong>Location request:</strong> {$_POST['location']}<br />
	<strong>Contact requestee phone #:</strong> {$_POST['phone']}<br />
    <strong>Contact requestee email address </strong>: {$_POST['email']}<br />
	<strong>Contact requestee street address </strong>: {$_POST['address']} <br />
	<strong>Contact requestee city: </strong> {$_POST['city']} <br />
	<strong>Contact requestee zip code: </strong> {$_POST['zipcode']} <br />
	<strong>Contact requestee state: </strong> {$_POST['state']} <br />
    <strong>Prefered call time: </strong> {$_POST['calltime']}<br />
    <strong>Concering: </strong><br />" . nl2br($_POST['message']) . "<br />
	<strong>There is an included quote request for: </strong>" . implode(', ',$_POST['ins-quote']);
    $mail->Body = $message;

    $mail->AltBody = "{$_POST['firstname']} {$_POST['lastname']} requested a call.\n\nPhone: {$_POST['phone']}";

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

	die('Message Sent');
}
?>

<!doctype html>
<html lang="en-US">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Auto Insurance, Home Insurance, Business Insurance, Life & Health Insurance in Laurel, Seaford, Milford, Georgetown and Salisbury.">
    <meta name="keywords" content="Insurance, Auto Insurance, Home Insurance, Car Insurance, Homeowners Insurance, Business Insurance, Commercial Insurance, The Insurance Market">

	<title>Local Insurance Experts In DE &amp; MD | The Insurance Market </title>

	<?php
	include WEBROOT . 'inc/topscripts.php';
	include WEBROOT . 'inc/ga.php';
	?>
</head>

<body>
<div class="site-wrap"><!-- Main Container -->
<?php include WEBROOT . 'inc/nav.php';?>
<!-- Header -->
<?php include WEBROOT . 'inc/header.php';?>

<!-- Content -->
<div class="slider">
	<img src="<?php echo WEBURLROOT; ?>images/banners/people-ins-banner.jpg" alt="Selling Insurance" class="banners">
	<img src="<?php echo WEBURLROOT; ?>images/banners/home-ins-banner.jpg" alt="Home Insurance" class="banners">
    <img src="<?php echo WEBURLROOT; ?>images/banners/auto-ins-banner.jpg" alt="Auto Insurance" class="banners"/>
</div>
<div class="headline-grey-content">
    <div class="marg-wrap">
        <div class="row">
            <div class="col-lg-12">
                <div class="headline-container">
                    <h2>We are a true <span class="span-green">full-service agency.</span></h2>
                    <p class="sub-headline">Whether it’s Home, Auto, Life or Business Insurance, <span class="black">we do it all.</span></p>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="ins-home-pers-content">
    <div class="marg-wrap">
        <div class="row">
            <div class="col-lg-8 col-md-8 col-sm-12">
                <h3 class="dark-green">Personal Insurance</h3>
                <p>Our family-owned and operated agency has thrived for more than a century because we deliver customized insurance and risk solutions for our friends and neighbors on the Eastern Shore. As an independent agency, we shop multiple companies on your behalf to make sure you get the coverage and price that’s right for you.</p>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-12">
            </div>
        </div>
    </div>
    <img src="<?php echo WEBURLROOT; ?>images/pers-ins-fam-mobile-horz.jpg" alt="" class="images-horz images-horz-top" />
</div>
<div class="inhouse-img-content">
    <div class="marg-wrap">
        <div class="row">
            <div class="col-lg-2 col-md-2 col-sm-12"></div>
            <div class="col-lg-8 col-md-8 col-sm-12">
                <h3 class="white">In-House Claims Service</h3>
                <p>We manage your claim in-house to give you the peace-of-mind that comes from dealing with someone local. We make sure the claims process gets done right.</p>
            </div>
            <div class="col-lg-2 col-md-2 col-sm-12"></div>
        </div>
    </div>
</div>
<div class="ins-home-com-content">
    <img src="<?php echo WEBURLROOT; ?>images/insurance-man-mobile-horz.jpg" alt="" class="images-horz images-horz-bot" />
    <div class="marg-wrap">
        <div class="row">
            <div class="col-lg-4 col-md-4 col-sm-12">

            </div>
            <div class="col-lg-8 col-md-8 col-sm-12">
                <h3 class="dark-green">Commercial Insurance</h3>
                <p>As a business owner we are your most valuable resource. Our commercial department can assist you with all lines of coverage and an array of options. We offer our clients free custom employee manuals, safety manuals and OSHA courses.</p>
            </div>
        </div>
    </div>
</div>
<?php include WEBROOT . 'inc/location-info.php';?>
<!-- Footer -->
<?php include WEBROOT . 'inc/footer.php';?>
<?php include WEBROOT . 'inc/bottomscripts.php';?>

</div><!-- Main Container Ends -->
</body>
</html>
