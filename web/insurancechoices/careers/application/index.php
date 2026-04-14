<?php
include '../../inc/top.php';

// get ruhuman class
require '../../js/ruhuman/ruhuman.class.php';

// Get Categories and Jobs
$careers = $db->query('SELECT * FROM `careers` WHERE `active` = "Y" ORDER BY `listing_date` DESC');

if (!empty($_POST)) {
    header('Content-Type: application/json', true);

    if (!ruhuman::is_human()) {
        header('HTTP/1.1 400 Bad Request', true, 400);
        $rarr['errors'][] = 'You dont appear to be a human<br>Please try again later';
        die(json_encode($rarr));
    }

    // make sure we have a resume
    if (empty($_FILES['resume'])) {
        header('HTTP/1.1 400 Bad Request', true, 400);
        $rarr['errors'][] = 'Please attach a resume';
        die(json_encode($rarr));
    }

    // check if Resume is of the right file type
    $ext = pathinfo($_FILES['resume']['name'], PATHINFO_EXTENSION);
    if(!in_array($ext, array('pdf', 'doc', 'docx', 'txt'))) {
        header('HTTP/1.1 400 Bad Request', true, 400);
        $rarr['errors'][] = 'Unsupported resume format<br />Supported Types: pdf, doc, docx, txt';
        die(json_encode($rarr));
    }

    // make sure we have the users name
    if (empty($_POST['first_name']) || empty($_POST['last_name'])) {
        header('HTTP/1.1 400 Bad Request', true, 400);
        $rarr['errors'][] = 'Please enter your first and last name';
        die(json_encode($rarr));
    }

    // generate resume name and copy it into the uploades file
    $resume_name = $_POST['last_name'] . '_' . $_POST['first_name'] . '_Resume.' . $ext;
    $resume_path = '../uploads/' . $resume_name;
    move_uploaded_file($_FILES['resume']['tmp_name'], $resume_path);

    // save applicant to database
    $item = new dbRow($db->handle, 'applicants');
    $item->career_id = empty($_POST['pid']) ? null : $_POST['pid'];
    $item->f_name = $_POST['first_name'];
    $item->l_name = $_POST['last_name'];
    $item->email = $_POST['email_address'];
    $item->phone = $_POST['phone'];
    $item->cover_letter = $_POST['cover_letter_content'];
    $item->resume = $resume_name;
    $item->ts = date('Y-m-d H:i:s');
    $item->save();

    $message = "====================================================\r\nThe Insurance Market's Application for Employment\r\n";
    $message .= "{$_POST['first_name']} {$_POST['last_name']} submitted an application.\r\n";
    $message .= "Position Applied For: {$_POST['position_applied']}\r\n";
    $message .= "Date of Application: {$_POST['date_application']}\r\n";
    $message .= "=============================================\r\nGENERAL INFORMATION\r\n=============================================\r\n";
    $message .= "Name: {$_POST['last_name']}, {$_POST['first_name']} {$_POST['middle_initial']}\r\n";
    $message .= "Phone: {$_POST['phone']}\r\n";
    $message .= "Email: {$_POST['email_address']}\r\n";
    $message .= "=============================================\r\n";
    $message .= "Electronic Signature: {$_POST['signature']}, ";
    $message .= "Date: {$_POST['signature_date']}\r\n";

    require WEBROOT . 'inc/mail_godaddy.php';

    $mail = new PHPMailer;
    $mail->CharSet = 'UTF-8';
    $mail->Encoding = 'base64';
    $mail->IsSMTP();
    $mail->Host = 'localhost';
    $mail->SMTPAuth = false;

    $mail->setFrom('no-reply@insurancemarket.com', 'The Insurance Market');
    $mail->addReplyTo($_POST['email_address'], $_POST['first_name'] . ' ' . $_POST['last_name']);
    $mail->addAddress('JSmith@insurancechoices.com');
    $mail->addAddress('sjhartstein@insurancechoices.com');
    $mail->addBCC('confirmation.customermessages@gmail.com');

    // attach Cover Letter to email
    if (!empty($_POST['cover_letter_content'])) {
        $message .= "\r\n\r\nCover Letter Attached";
        $cover_letter = "<!doctype html>\n<html lang=\"en-US\">\n<head>\n\t<meta charset=\"UTF-8\">\n\t<title>{$_POST['first_name']} {$_POST['last_name']} | Cover Letter</title>\n<body>\n" . $_POST['cover_letter_content'] . "\n</body>\n</html>";
        $mail->addStringAttachment($cover_letter, 'Cover_Letter.html', 'base64', 'text/html');
    }

    $mail->addAttachment($resume_path, $resume_name, 'base64', $_FILES['resume']['type']);

    $mail->Subject = "[The Insurance Market] Career Application - {$_POST['position_applied']}";
    $mail->Body = $message;

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

// load position
if (!empty($_GET['pid'])) {
    $position = $db->query('SELECT * FROM careers WHERE `id` = :pid', array(':pid' => $_GET['pid']), null, true);
}
?>
<!doctype html>
<html lang="en-US">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">

	<title>Application | Careers | Insurance Market</title>

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
    <h1 class="subpage-hl">Application</h1>
</div>
<div class="subpage-main-content">
    <div class="marg-wrap">
        <div class="row">
            <div class="col-xs-12">
                <br />
                <form class="application" id="frmApplication" method="post" action="">
                    <input type="hidden" name="pid" value="<?php echo $position['id']; ?>">
                    <fieldset class="panel panel-success">
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-xs-12">
                                    <h4>General Information</h4>
                                </div>
                            </div>
                            <div class="row">
                                <div class="form-group col-sm-8 col-md-8">
                                    <label for="position_applied" class="control-label">Position Applied For</label>
                                    <input type="text" class="form-control" name="position_applied" id="position_applied" placeholder="Name of Position" <?php if (!empty($position)) { echo ' value="' . $position['name'] . '"';} ?>>
                                </div>
                                <div class="form-group col-sm-4 col-md-4">
                                    <label for="date_application" class="control-label">Date of Application</label>
                                    <input type="date" class="form-control" name="date_application" id="date_application" placeholder="mm/dd/yyyy" value="<?php echo date('Y-m-d'); ?>">
                                </div>
                            </div>
                            <div class="row">
                                <div class="form-group col-sm-5 col-md-5">
                                    <label for="last_name" class="control-label">Last Name</label>
                                    <input type="text" class="form-control" name="last_name" id="last_name" placeholder="Last Name">
                                </div>
                                <div class="form-group col-sm-4 col-md-5">
                                    <label for="first_name" class="control-label">First Name</label>
                                    <input type="text" class="form-control" name="first_name" id="first_name" placeholder="First Name">
                                </div>

                                <div class="form-group col-sm-3 col-md-2">
                                    <label for="middle_initial" class="control-label">Middle Initial</label>
                                    <input type="text" class="form-control" name="middle_initial" id="middle_initial" placeholder="Middle Initial">
                                </div>
                            </div>
                            <div class="row">
                                <div class="form-group col-md-6">
                                    <label for="phone_home" class="control-label">Phone</label>
                                    <input type="tel" class="form-control" name="phone" id="phone" placeholder="(xxx) xxx-xxxx">
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="email_address" class="control-label">Email Address</label>
                                    <input type="email" class="form-control" name="email_address" id="email_address" placeholder="Email">
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset class="panel panel-success">
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-xs-12">
                                    <h4>Cover Letter</h4>
                                </div>
                            </div>
                            <div class="row">
                                <div class="form-group col-xs-12">
                                    <textarea class="tinymce" name="cover_letter_content" id="cover_letter_content" style="height: 500px;"></textarea>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset class="panel panel-success">
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-xs-12">
                                    <h4>Resume</h4>
                                </div>
                            </div>
                            <div class="row">
                                <div class="form-group col-xs-12">
                                    <input type="file" class="form-control" name="resume" id="resume"></input>
                                    <small>Supported file types: .pdf, .doc, .docx, .txt</small>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset>
                        <div class="row">
                            <div class="form-group col-sm-8 text-center no-margin-vertical">
                                <label for="signature" class="control-label">Electronic Signature</label>
                                <input type="text" class="form-control" id="signature" name="signature" placeholder="Full Name">
                            </div>
                            <div class="form-group col-sm-4 text-center">
                                <label for="signature_date" class="control-label">Date</label>
                                <input type="date" class="form-control" id="signature_date" name="signature_date" placeholder="Today's Date">
                            </div>
                        </div>
                        <div class="center-block">
                            <button type="submit" class="center-block btn btn-success btn-lg" id="submit" data-loading-text="Submitting Application..."><span class="glyphicon glyphicon-send"></span> Submit Application</button>
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>
    </div>
</div>
</div><!-- Main Container Ends -->
<div class="marg-top"></div>
<!-- Footer -->
<?php include WEBROOT . 'inc/footer.php';?>
<?php include WEBROOT . 'inc/bottomscripts.php';?>
<script src="<?php echo WEBROOT; ?>js/tinymce/tinymce.min.js"></script>


<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.15.0/jquery.validate.min.js"></script>
<script src="../../js/ruhuman/ruhuman.min.js"></script>
<script>
// TinyMCE
tinymce.init({
    selector: "textarea.tinymce",
    menubar: false,
    statusbar: false,
    plugins: "autolink paste lists",
    paste_auto_cleanup_on_paste : true,
    paste_remove_styles: true,
    paste_remove_styles_if_webkit: true,
    paste_strip_class_attributes: "all",
    toolbar: "bold italic underline | bullist numlist outdent indent | styleselect | undo redo"
});

$(function() {
    $('#frmApplication').ruhuman({
        'checkin': '../../js/ruhuman/ajax.php'
    });

    $('#frmApplication').validate({
        rules: {
            'first_name': 'required',
            'last_name': 'required',
             'middle_initial': 'required',
            'email_address': {
                'required': true,
                'email': true
            },
            'phone': 'required',
            'signature': 'required',
            'signature_date': 'required',
            'resume': 'required'
        },
        messages: {
            'first_name': 'Please enter your first name',
            'last_name': 'Please enter your last name',
            'middle_initial': 'Please enter a middle initial',
            'email_address': {
                'required': 'Please enter an email address',
                'email': 'Please enter a valid email address'
            },
            'phone': 'Please enter a phone number',
            'signature': 'Please enter a signature',
            'signature_date': 'Please enter today\'s date',
            'resume': 'Please upload a resume'
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
            // stop form submission
            e.preventDefault();

            var submit_button = $('[type=submit]', form);
            submit_button.button('loading');

            // save tinymce instances
            tinymce.triggerSave();

            var the_data = new FormData();
            $('input, textarea', form).each(function(i, item) {
                the_data.append($(item).attr('name'), $(item).val());
            });
            the_data.append('resume', $('#resume')[0].files[0]);
            $.ajax({
                url: '',
                method: 'POST',
                data: the_data,
                cache: false,
                contentType: false,
                processData: false
            })
            .done(function(data) {
                toastr.success('Your application was sent!');
                record_event('Application','Submitted','<?php echo $_GET['position_applied']; ?>','1');
                form.reset();
            })
            .fail(function(data) {
                if (data.responseJSON && data.responseJSON.errors) {
                    $.each(data.responseJSON.errors, function(i, item) {
                        toastr.error(item);
                    });
                } else {
                    toastr.success('Your application was SENT!');
                    // let the user know there was a server error
                    // toastr.error('Error communicating with the server');
                }
            })
            .always(function() {
                // reenable save button
                submit_button.button('reset');
            });
        }
    });
});
</script>
</body>
</html>
