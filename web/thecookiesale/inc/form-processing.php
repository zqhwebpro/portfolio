<?php
session_start();

// get ruhuman class
require 'js/ruhuman/ruhuman.class.php';

// check if we are getting post data
if (!empty($_POST)) {
    $rarr = array();

    if (!ruhuman::is_human()) {
        header('Content-Type: application/json', true);
        header('HTTP/1.1 400 Bad Request', true, 400);
        $rarr['errors'][] = 'You dont appear to be a human<br>Please try again later';
        die(json_encode($rarr));
    }
    ruhuman::reset();

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

    $mail->setFrom('no-reply@weberadvertising.com', 'Cookie Sale');
    $mail->addReplyTo($_POST['Email'], $_POST['Name']);
    $mail->addAddress('cookie@thecookiesale.com');

    $mail->isHTML(true);

    $mail->Subject = '[Cookie Sale] Contact Us';

    // foramt message
    $mail->Body = "<strong>Name</strong>: {$_POST['Name']}<br />
    <strong>Email</strong>: {$_POST['Email']}<br />
    <strong>Phone</strong>: {$_POST['Phone']}<br />
    <strong>Message</strong>:<br />" . nl2br($_POST['Message']);

    $mail->AltBody = "Name: {$_POST['Name']}\nEmail: {$_POST['Email']}\nPhone: {$_POST['Phone']}\nMessage:\n{$_POST['Message']}";

    // check if email was sent
    if (!$mail->send()) {
        header('Content-Type: application/json', true);
        header('HTTP/1.1 503 Service Unavailable', true, 503);
        $rarr['errors'][] = 'Could not send email';
        $rarr['errors'][] = $mail->ErrorInfo;
        die(json_encode($rarr));
    }

    exit;
}

ruhuman::init();
?>
