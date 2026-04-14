<?php include '../inc/top.php';
include WEBROOT . 'inc/contact_request_submit.php';
?>

<?php $tab = 'contact'; ?>
<!doctype html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="description" content="Have any questions about the services we offer? Contact us with your printing needs and we will be happy to answer your questions. " />

	<title>Contact Us With Your Printing Needs | Beiler Printing LLC | Lancaster, PA </title>
	<?php
	include WEBROOT . 'inc/topscripts.php';
	include WEBROOT . 'inc/ga.php';
	?>
	<script src='https://www.google.com/recaptcha/api.js'></script>
</head>

<body>
	<?php include WEBROOT . 'inc/header.php'; ?>
	<div class="cyan-bkg">
		<div class="container">
			<div class="row">
				<div class="col-lg-12">
					<h1 class="white">Contact Us</h1>
				</div>
			</div>
		</div>
	</div>
	<div class="white-bkg">
		<div class="container">
			<div class="row padding-vertical">
				<div class="text-left col-xs-12 col-sm-5 col-sm-push-7">
					<p class="contact-push"><strong>Address:</strong><br/>
					Beiler Printing, LLC<br/>
					115 N. King St.<br/>
					Denver, PA 17517</p>
					<p>We are located in the town of Schoeneck near Denver, <a target="_blank" href="https://www.google.com/maps/dir/''/Beiler+Printing+LLC+Denver,+PA+17517/@40.2446892,-76.2118664,13z/data=!3m1!4b1!4m8!4m7!1m0!1m5!1m1!1s0x89c613d5a703de37:0x55fc6b37fa3e68e1!2m2!1d-76.176847!2d40.244629">click here</a> or call for specific directions <a onclick="record_event('Phone Number','Click To Call','Header 717-336-1148');" href="tel:1-717-336-1148">717-336-1148</a>.</p>
					<br/>
					<p><strong>Phone:</strong> <a onclick="record_event('Phone Number','Click To Call','Header 717-336-1148');" href="tel:1-717-336-1148">717-336-1148</a><br/>
					<strong>Fax:</strong> 717-336-7227<br/>
					<strong>Email:</strong> <a href="mailto:info@beilerprinting.com">info@beilerprinting.com</a><br/>
					<strong>Hours:</strong> M-F 7:30 AM to 5:00 PM, Sat. by appt.</p>
				</div>
				<div class="text-left col-xs-12 col-sm-7 col-sm-pull-5">
					<form data-contact-form="" class="send-style" method="post">
						<h2 class="teal">SEND US A MESSAGE</h2>
						<hr>
						<br/>
						<div class="form-container-container">
							<div class="form-container form-group" style="width:100%;">
								<label>Full Name<span class="tiny">Required</span></label>
								<input type="text" name="fullname" id="fullname" required><br/>
								<label>Email<span class="tiny">Required</span></label>
								<input type="text" name="email" id="email" required><br/>
								<label>Phone</label>
								<input type="text" name="phone" id="phone"><br/>
								<label>Address</label>
								<input type="text" name="address" id="address"><br/>
								<label>Message<span class="tiny">Required</span></label>
								<textarea name="message" id="message"></textarea>
							</div>
						</div>
						<div class="text-center">
							<!--<div class="g-recaptcha" data-sitekey="6LeEfyoUAAAAAAD78OrC9yXBwl_rkS96UlyEFAK8"></div><br/>-->
							<input class="btn btn-teal" type="submit" value="Submit Message" data-loading-text="Sending...">
						</div>
					</form>
				</div>

			</div>
		</div>
	</div>
	<?php
	include WEBROOT . 'inc/footer.php';
	include WEBROOT . 'inc/bottomscripts.php';
 	include WEBROOT . 'inc/contact_request_script.php'; ?>
</body>
</html>
