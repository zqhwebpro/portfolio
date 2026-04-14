<?php

// get ruhuman class
require_once WEBROOT . 'js/ruhuman/ruhuman.class.php';

// check if we are getting post data
if (!empty($_POST)) {
	$rarr = array();

	// make sure we have all the parts we need
	if (empty($_POST['fullname']) || empty($_POST['email']) || empty($_POST['message'])) {
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
    $mail->Port = 25;

	// add spamBeast headers
	$mail->addCustomHeader('X-spamBeast-Email-Score', $sb->get_email_score());
	$mail->addCustomHeader('X-spamBeast-Message-Score', $sb->get_message_score() + $sb->get_message_link_score());
	$mail->addCustomHeader('X-spamBeast-Words', implode(', ', $sb->get_words()));

	$mail->setFrom('no-reply@weberadvertising.com', 'Regional Insurance Associates');
	$mail->addReplyTo($_POST['email'], $_POST['fullname']);

	$mail->isHTML(true);

    $mail->Subject = '[Regional Insurance] Contact Request';

    // format message
	$message = "{$_POST['fullname']} sent you a message.<br /><br />
    <strong>Their email:</strong> {$_POST['email']}<br />
    <strong>Their phone: </strong> {$_POST['phone']}<br />
	<strong>Their address: </strong> {$_POST['address']} <br />
    <strong>Concering: </strong> {$_POST['message']}";
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
