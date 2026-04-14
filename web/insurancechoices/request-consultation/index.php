<?php include '../inc/top.php';

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

    // // foramt message
    $message = "{$_POST['firstname']} {$_POST['lastname']} requested a call<br /><br />
    <strong>Location request:</strong> {$_POST['location']}<br />
    <strong>Contact requestee phone #:</strong> {$_POST['phone']}<br />
    <strong>Contact requestee email address </strong>: {$_POST['email']}<br />
    <strong>Contact requestee street address </strong>: {$_POST['address']} <br />
    <strong>Contact requestee city: </strong> {$_POST['city']} <br />
    <strong>Contact requestee zip code: </strong> {$_POST['zipcode']} <br />
    <strong>Contact requestee state: </strong> {$_POST['state']} <br />
    <strong>Prefered call time: </strong> {$_POST['calltime']}<br />
    <strong>Concering: </strong><br /> {$_POST['message']} <br />
    <strong>There is an included quote request for: </strong> {$_POST['ins-quote']}";

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
    <meta name="description" content="With 5 local offices in Delaware & Maryland, we make it easy to get personalize consultations so that all of your insurance questions are answered before signing a policy.">

	<title>Consultations With Insurance Experts In Delaware & Maryland</title>

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
<div class="subpage-main-content">
    <div class="marg-wrap">
        <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12">
                <p class="marg-top">We're dedicated to providing quality insurance products that keep you protected. To request a quote, <span class="special-green-span">simply fill out the form below, choose your product of interest, and submit your request.</span> One of our helpful agents will then contact you to discuss your needs. We appreciate your interest in The Insurance Market!</p><br/>
            </div>
        </div>
    </div>
</div>
<a name="consult"></a>
<div class="contact-grey-content">
    <div class="marg-wrap">
        <div class="row">
            <div class="col-lg-12">
                <form id="frmQuote" method="post" action="">
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
                    <div style="display:inline-block";>
                        <p class="ins-options">I would like to request a quote for the follow:</p>
                        <div class="form-checkbox">
                            <div class="checkboxes"><input type="checkbox" name="ins-quote" value="Home And Auto Insurance"><h4>Home &amp; Auto Insurance</h4></div>
                            <div class="checkboxes"><input type="checkbox" name="ins-quote" value="Auto Insurance"><h4>Auto Insurance</h4></div>
                            <div class="checkboxes"><input type="checkbox" name="ins-quote" value="Home Insurance"><h4>Home Insurance</h4></div>
                            <div class="checkboxes"><input type="checkbox" name="ins-quote" value="Other Personal Insurance"><h4>Other Personal Insurance</h4></div>
                            <div class="checkboxes"><input type="checkbox" name="ins-quote" value="Farm Insurance"><h4>Farm Insurance</h4></div>
                            <div class="checkboxes"><input type="checkbox" name="ins-quote" value="Life Insurance"><h4>Life Insurance</h4></div>
                            <div class="checkboxes"><input type="checkbox" name="ins-quote" value="Health Insurance"><h4>Health Insurance</h4></div>
                            <div class="checkboxes"><input type="checkbox" name="ins-quote" value="Recreational Vehicle Insurance"><h4>Recreational Vehicle Insurance</h4></div>
                            <div class="checkboxes"><input type="checkbox" name="ins-quote" value="Financial Service"><h4>Financial Service</h4></div>
                            <div class="checkboxes"><input type="checkbox" name="ins-quote" value="Additional Insurance Service"><h4>Additional Service</h4></div>
                            <div class="checkboxes"><input type="checkbox" name="ins-quote" value="Coverage for Specific Industries"><h4>Coverage for Specific Industries</h4></div>
                            <div class="checkboxes"><input type="checkbox" name="ins-quote" value="Coverage for Your Business"><h4>Coverage for Your Business</h4></div>
                            <div class="checkboxes"><input type="checkbox" name="ins-quote" value="Coverage for Your Employees"><h4>Coverage for Your Employees</h4></div>
                        </div>
                    </div>
                    <div class="form-container">
                        <label>Street Address</label><br>
                        <input type="text" name="address"><br>
                    </div>
                    <div class="form-container">
                        <label>City</label><br>
                        <input type="text" name="city"><br>
                    </div>
                    <div class="form-container">
                        <label>Zip Code</label><br>
                        <input type="text" name="zipcode"><br>
                    </div>
                    <div class="form-container">
                        <label>State</label><br>
                        <select name="state">
                        	<option value="AL">Alabama</option>
                        	<option value="AK">Alaska</option>
                        	<option value="AZ">Arizona</option>
                        	<option value="AR">Arkansas</option>
                        	<option value="CA">California</option>
                        	<option value="CO">Colorado</option>
                        	<option value="CT">Connecticut</option>
                        	<option value="DE">Delaware</option>
                        	<option value="DC">District Of Columbia</option>
                        	<option value="FL">Florida</option>
                        	<option value="GA">Georgia</option>
                        	<option value="HI">Hawaii</option>
                        	<option value="ID">Idaho</option>
                        	<option value="IL">Illinois</option>
                        	<option value="IN">Indiana</option>
                        	<option value="IA">Iowa</option>
                        	<option value="KS">Kansas</option>
                        	<option value="KY">Kentucky</option>
                        	<option value="LA">Louisiana</option>
                        	<option value="ME">Maine</option>
                        	<option value="MD">Maryland</option>
                        	<option value="MA">Massachusetts</option>
                        	<option value="MI">Michigan</option>
                        	<option value="MN">Minnesota</option>
                        	<option value="MS">Mississippi</option>
                        	<option value="MO">Missouri</option>
                        	<option value="MT">Montana</option>
                        	<option value="NE">Nebraska</option>
                        	<option value="NV">Nevada</option>
                        	<option value="NH">New Hampshire</option>
                        	<option value="NJ">New Jersey</option>
                        	<option value="NM">New Mexico</option>
                        	<option value="NY">New York</option>
                        	<option value="NC">North Carolina</option>
                        	<option value="ND">North Dakota</option>
                        	<option value="OH">Ohio</option>
                        	<option value="OK">Oklahoma</option>
                        	<option value="OR">Oregon</option>
                        	<option value="PA">Pennsylvania</option>
                        	<option value="RI">Rhode Island</option>
                        	<option value="SC">South Carolina</option>
                        	<option value="SD">South Dakota</option>
                        	<option value="TN">Tennessee</option>
                        	<option value="TX">Texas</option>
                        	<option value="UT">Utah</option>
                        	<option value="VT">Vermont</option>
                        	<option value="VA">Virginia</option>
                        	<option value="WA">Washington</option>
                        	<option value="WV">West Virginia</option>
                        	<option value="WI">Wisconsin</option>
                        	<option value="WY">Wyoming</option>
                        </select>
                    </div>
                </div>
                <div style="margin-top:130px;"></div>
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
    $('#frmQuote').ruhuman({
        checkin: WEBROOT + 'js/ruhuman/ajax.php'
    });

    $('#frmQuote').validate({
        rules: {
            'firstname': 'required',
            'lastname': 'required',
            'location': 'required',
            'email': 'required',
            'phone': 'required',
            'calltime': 'required',
            'message': 'required',
            'ins-quote': 'required',
            'address': 'required',
            'city': 'required',
            'state': 'required',
            'zipcode': 'required'

        },
        messages: {
            'firstname': 'Please enter your first name',
            'lastname': 'Please enter your last name',
            'location': 'Please enter your location',
            'email': 'Please enter your email address',
            'phone': 'Please enter your phone number',
            'calltime': 'Plase enter a time for us to call you',
            'message': 'Please enter your message',
            'ins-quote': 'Please select a type of insurance',
            'address': 'Please enter your street address',
            'city': 'Please enter your city',
            'state': 'Please select your state',
            'zipcode': 'Please enter your zipcode'
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
