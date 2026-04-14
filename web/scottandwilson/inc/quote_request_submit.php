<?php
// get ruhuman class
require WEBROOT . 'js/ruhuman/ruhuman.class.php';

// check if we are getting post data
if (!empty($_POST)) {
    $rarr = array();

    if (!ruhuman::is_human()) {
        header('Content-Type: application/json', true);
        header('HTTP/1.1 400 Bad Request', true, 400);
        $rarr['errors'][] = 'You dont appear to be a human<br>Please try again later';
        die(json_encode($rarr));
    }

    require WEBROOT . 'inc/spamBeast/spamBeast.class.php';

    $sb = new spamBeast();
    $sb->load_email($_POST['quoteEmail']);
    $sb->load_message($_POST['quoteMessage']);

    $spam_score = $sb->get_score();

	// if score is to high just ignore the request
	if ($spam_score >= 25) {
		header('Content-Type: application/json', true);
        header('HTTP/1.1 503 Service Unavailable', true, 503);
        $rarr['errors'][] = 'Message seems to spammy. Are you including to many links?';
        die(json_encode($rarr));
	}

    $_POST['quote_options'] = implode(', ', $_POST['quote_options']);

    require 'inc/PHPMailer/PHPMailerAutoload.php';

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

    $mail->setFrom('no-reply@weberadvertising.com', 'Scott & Wilson Insurance');
    $mail->addReplyTo($_POST['quoteEmail'], $_POST['quoteName']);
    // decide who to send the email to based on spam score
	if ($spam_score <= 4) {
        $mail->addAddress('info@scottandwilson.com');
		$mail->Subject = '[Scott & Wilson Insurance] Quote Request';
	} else {
		$mail->addAddress('ahaberstroh@weberadvertising.com', 'Angie Haberstroh');
		$mail->Subject = '[MARKED][Score: ' . $spam_score . '][Scott & Wilson Insurance] Quote Request';
	}

    $mail->isHTML(true);

    // foramt message
    $mail->Body = "<strong>Name</strong>: {$_POST['quoteName']}<br />
    <strong>Email</strong>: {$_POST['quoteEmail']}<br />
    <strong>Phone</strong>: {$_POST['quotePhone']}<br />
    <strong>Interests</strong>: {$_POST['quote_options']}<br />
    <strong>Message</strong>:<br />" . nl2br($_POST['quoteMessage']);

    $mail->AltBody = "Name: {$_POST['quoteName']}\nEmail: {$_POST['quoteEmail']}\nPhone: {$_POST['quotePhone']}\nInterests: {$_POST['quote_options']}\nMessage:\n{$_POST['quoteMessage']}";

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
