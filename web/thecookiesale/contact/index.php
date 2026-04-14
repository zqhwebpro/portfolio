<?php include '../inc/top.php'; ?>
<!doctype html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="description" content="" />

	<title>Contact Us | The Annual Cookie Sale To Combast World Hunger</title>

	<?php
	include WEBROOT . 'inc/topscripts.php';
	include WEBROOT . 'inc/ga.php';
	?>
</head>

<body>
	<div class="wrap"><!-- Surrounding Container -->
	<?php include WEBROOT . 'inc/header.php'; ?>
		<div class="container-fluid">
			<div class="row">
				<div class="col-xs-12 col-sm-12">
					<h1><img src="<?php echo WEBURLROOT; ?>images/contact-us.png" alt="Contact Us" style="margin:0 auto;" class="img-responsive" /></h1>
					<hr>
					<br/>
					<p>Please use this form to contact us or call <a href="tel:18662665439">1-866-COOKIE-9</a></p>
					<div id="contact-area">
						<form id="frmContact">
							<div class="row">
								<div class="form-group col-xs-12 col-sm-6">
									<label for="Name">Name:</label>
									<input type="text" name="Name" id="Name" />
									<label for="Phone">Phone:</label>
									<input type="text" name="Phone" id="Phone" />
									<label for="Email">Email:</label>
									<input type="text" name="Email" id="Email" />
								</div>
								<div class="form-group col-xs-12 col-sm-6">
									<label for="Message">Message:</label>
									<textarea name="Message" id="Message" style="height:210px;"></textarea>
									<input type="submit" name="submit" value="Submit" class="btn btn-primary" />
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	<?php include WEBROOT . 'inc/footer.php'; ?>
	</div><!-- End Surrounding Container -->
	<?php include WEBROOT . 'inc/bottomscripts.php'; ?>
</body>
</html>
