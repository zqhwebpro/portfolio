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

    // decide who to send the email to based on spam score
	if ($spam_score <= 4) {
        $send_to = array('info@rodneycoleinsuranceagency.com');
		$subject = '[Rodney Cole Insurance Agency] Quote Request';
	} else {
		$send_to = array('ahaberstroh@weberadvertising.com');
		$subject = '[MARKED][Score: ' . $spam_score . '][Rodney Cole Insurance Agency] Quote Request';
	}
    $to = implode(',', $send_to);
    $from = '"Rodney Cole Insurance Agency Website Quote Form" <no-reply@rodneycoleinsuranceagency.com>';
    $reply_to = $_POST['email'];

    // format message
    $message = "<strong>Name</strong>: {$_POST['quoteName']}<br />
    <strong>Email</strong>: {$_POST['quoteEmail']}<br />
    <strong>Phone</strong>: {$_POST['quotePhone']}<br />
    <strong>Interests</strong>: {$_POST['quote_options']}<br />
    <strong>Message</strong>:<br />" . nl2br($_POST['quoteMessage']);

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
			'reply_to' => $reply_to,
			'subject' => $subject,
			'message' => $message,
            'mimetype' => 'text/html',
            'spambeast' => false
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

    die(json_encode($rdata));
    exit;
}

// reset are you human
ruhuman::init();
