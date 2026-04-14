<?php
// get ruhuman class
require_once WEBROOT . 'js/ruhuman/ruhuman.class.php';

// check if we are getting post data
if (!empty($_POST)) {
	$rarr = array();

	// make sure we have all the parts we need
	if (empty($_POST['fullname']) || empty($_POST['email']) || empty($_POST['phone']) || empty($_POST['quote-or-reorder']) || empty($_POST['item']) || empty($_POST['quantity']) ||	empty($_POST['finished-size']) || empty($_POST['ink-options'])
	|| empty($_POST['paper'])) {
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

    require '../inc/PHPMailer/PHPMailerAutoload.php';

	$mail = new PHPMailer;

	$mail->CharSet = 'UTF-8';
	$mail->Encoding = 'base64';
	$mail->isSMTP();
	$mail->Host = 'mail.omnis.com';
	$mail->SMTPAuth = true;
	$mail->SMTPSecure = 'tls';
	$mail->Username = 'info@beilerprinting.com';
	$mail->Password = 'Beiler123';
	$mail->Port = 587;

    $mail->setFrom('info@beilerprinting.com', 'Beiler Printing');
	$mail->addReplyTo($_POST['email'], $_POST['fullname']);
	$mail->addAddress('info@beilerprinting.com');
	$mail->addAddress('confirmation.customermessages@gmail.com');

    $mail->isHTML(true);

    $mail->Subject = '[Beiler Printing] Quote Request';

    // format message
	$message = "{$_POST['fullname']}  sent you a quote request.<br /><br />
    <strong>Email:</strong> {$_POST['email']}<br />
    <strong>Phone: </strong> {$_POST['phone']}<br />
	<strong>Fax: </strong> {$_POST['fax']} <br />
	<strong>Company: </strong> {$_POST['company']} <br />
	<strong>Address: </strong> {$_POST['address']} <br />
	<strong>City: </strong> {$_POST['city']} <br />
	<strong>State: </strong> {$_POST['state']} <br />
	<strong>Zipcode: </strong> {$_POST['zip']} <br />
	<strong>Notes: </strong><br />&emsp;&emsp;{$_POST['notes']} <br />
	<strong>Quote or Reorder: </strong> {$_POST['quote-or-reorder']} <br />
	<strong>Item: </strong> {$_POST['item']} <br />
	<strong>Reorder #: </strong> {$_POST['reorder']} <br />
	<strong>Quantity: </strong> {$_POST['quantity']} <br />
	<strong>Flat Size: </strong> {$_POST['flat-size']} <br />
	<strong>Finished Size: </strong> {$_POST['finished-size']} <br />
	<strong>Inks: </strong> {$_POST['ink-options']} <br />
	<strong>Paper: </strong> {$_POST['paper']} <br />
	<strong>Special Comments: </strong><br />&emsp;&emsp;{$_POST['comments']}";
    $mail->Body = $message;

    $mail->AltBody = "{$_POST['fullname']} sent a message.\n\nEmail: {$_POST['email']}";

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


ruhuman::init();
