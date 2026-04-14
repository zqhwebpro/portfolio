<?php

include '../inc/top.php';

// get ruhuman class
require '../js/ruhuman/ruhuman.class.php';

if (!empty($_POST)) {

	require WEBROOT . 'inc/mail_godaddy.php';

	$mail = new PHPMailer;

	$mail->CharSet = 'UTF-8';
	$mail->Encoding = 'base64';
	$mail->isSMTP();
	$mail->Host = 'localhost';
	$mail->SMTPAuth = false;

	$mail->setFrom('no-reply@insurancemarket.com', 'Insurance Market Inc.');
	$mail->addAddress('sjhartstein@insurancechoices.com');
	$mail->addBCC('confirmation.customermessages@gmail.com');

	$mail->isHTML(true);

    $mail->Subject = '[Insurance Market Inc.] Contact Request';

    $message = "{$_POST['firstname']} {$_POST['lastname']} requested a call<br /><br />
    <strong>Location request:</strong> {$_POST['location']}<br />
    <strong>Contact requestee phone #:</strong> {$_POST['phone']}<br />
    <strong>Contact requestee email address </strong>: {$_POST['email']}<br />
    <strong>Prefered call time: </strong> {$_POST['calltime']}<br />
    <strong>Concering: </strong><br /> {$_POST['message']} <br />";

    $mail->Body = $message;
    $mail->AltBody = "{$_POST['firstname']} {$_POST['lastname']} requested a call.<br />Phone: {$_POST['phone']}";

	// check if email was sent
	if (!$mail->send()) {
		header('Content-Type: application/json', true);
		header('HTTP/1.1 503 Service Unavailable', true, 503);
		$rarr['errors'][] = 'Could not send email';
		$rarr['errors'][] = $mail->ErrorInfo;
		die(json_encode($rarr));
	}

	ruhuman::reset();

	// return an empty string
	die('""');
}

ruhuman::init();
?>
<!doctype html>
<html lang="en-US">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="With offices in Laurel, Milford, Millsboro, Rehoboth, &  Salisbury, we make it easy to work one-on-one with an agent who can match you with great insurance for a great price.">

	<title>Contact Us | The Insurance Market</title>

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
<div class="subpage-banner">
    <h1 class="subpage-hl">Contact Us</h1>
</div>
<img src="<?php echo WEBURLROOT; ?>images/contact-image.jpg" alt="Contact Our Team - We Can Help" class="sub-img" />
<div class="subpage-main-content">
    <div class="marg-wrap">
        <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12">
                <p class="marg-bot">The Insurance Market is committed to providing you with the <span class="special-green-span">best customer service to meet your insurance needs.</span> Have a question about your policy? Checking on a claim? Have you been in an accident? We're here to help. Call us at <a style="text-decoration:underline;" href="tel:18009997518" onclick="record_event('Phone', 'Click', 'Contact');">800-999-7518.</a> Or fill out the form below and we'll contact you shortly.</p><br/>
            </div>
        </div>
    </div>
</div>
<a name="consult"></a>
<div class="contact-grey-content">
    <div class="marg-wrap">
        <div class="row">
            <div class="col-lg-12">
                <?php
                    if (!empty($_POST['selection'])) { ?>
                <h3>Request Consultation</h3>
                <p>One of our helpful agents will then contact you to discuss your needs. We appreciate your interest in The Insurance Market!</p>
                <?php
                    } else {
                ?>
                <h3>Want to Learn More?</h3>
                <p>Contact us in any of our four locations or give us a call and we’ll connect you with an agent.</p>
                <?php
                    }
                ?>
                <form id="frmContact" method="post" action="">
                    <div class="form-container-container">
                        <div class="form-container">
                            <label>First Name*</label><br>
                            <input type="text" name="firstname" required><br>
                            <label>Last Name*</label><br>
                            <input type="text" name="lastname" required>
                            <label>Choose A Location*</label><br>
                            <select name="location" required>
                                <option label="Laurel Office">Laurel Office</option>
                                <option label="Milford Office">Milford Office</option>
                                <option label="Millsboro Office">Millsboro Office</option>
                                <option label="Rehobeth Beach Office">Rehobeth Beach Office</option>
                                <option label="Salisbury Office">Salisburg Office</option>
                            </select>
                        </div>
                        <div class="form-container">
                            <label>Email Address*</label><br>
                            <input type="text" name="email" required><br>
                            <label>Phone Number*</label><br>
                            <input type="text" name="phone">
                            <label>Best Time to Call</label><br>
                            <select name="calltime" required>
                                <option label="No Preference">No Preference</option>
                                <option label="Daytime">Daytime</option>
                                <option label="Morning">Morning</option>
                                <option label="Afternoon">Afternoon</option>
                                <option label="Evening">Evening</option>
                            </select>
                        </div>
                        <div class="form-container">
                            <label>Message*</label><br>
                            <textarea name="message"></textarea>
                        </div>
                    </div>
                    <div class="form-button">
                        <input type="submit" value="Submit Message" data-loading-text="Sending...">
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
<!-- Footer -->
<?php include WEBROOT . 'inc/footer.php';?>
<?php include WEBROOT . 'inc/bottomscripts.php';?>
</div><!-- Main Container Ends -->
<script>
// call me form
$(function() {
    $('#frmContact').ruhuman({
        checkin: WEBROOT + 'js/ruhuman/ajax.php'
    });

    $('#frmContact').validate({
        rules: {
            'firstname': 'required',
            'lastname': 'required',
            'location': 'required',
            'email': 'required',
            'phone': 'required',
            'calltime': 'required',
            'message': 'required'
        },
        messages: {
            'firstname': 'PLEASE enter your first name',
            'lastname': 'Please enter your last name',
            'location': 'Please enter your location',
            'email': 'Please enter your email address',
            'phone': 'Please enter your phone number',
            'calltime': 'Plase enter a time for us to call you',
            'message': 'Please enter your message'
        },
        invalidHandler: function(event, validator) {
            // reset toastr
            toastr.remove();
            // output the error message
            toastr.error(validator.errorList[0].message);
        },
        errorClass: 'has-error',
        highlight: function(element, errorClass) {
            $(element).closest('.form-group').addClass(errorClass);
        },
        unhighlight: function(element, errorClass) {
            $(element).closest('.form-group').removeClass(errorClass);
        },
        errorPlacement: function(error) {
            return true;
        },
        submitHandler: function(form, e) {
            e.preventDefault();

            // get the submit button
            var submit_button = $('input[type=submit]', form);
            // disable login button
            submit_button.button('loading');

            $.ajax({
                url: '',
                method: 'POST',
                data: $(form).serialize()
            })
            .done(function(data) {
                // let the user know their message was sent
                toastr.success('Your request was sent!');
                record_event('Form','Submit','<?php if (!empty($_POST['selection'])) { echo 'Consult Request'; } else { echo 'Message'; } ?>');
                // reset the form
                form.reset();
            })
            .fail(function(x, status, error) {
                if (x.responseJSON && x.responseJSON.errors) {
                    $.each(x.responseJSON.errors, function(i, item) {
                        toastr.error(item);
                    });
                } else {
                    // let the user know there was a server error
                    toastr.error('Error communicating with the server');
                }
            })
            .always(function() {
                // reenable button
                submit_button.button('reset');
            });
        }
    });
});
</script>
</body>
</html>
