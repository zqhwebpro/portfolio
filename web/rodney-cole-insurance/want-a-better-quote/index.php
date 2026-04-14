<?php
include '../inc/top.php';
include '../inc/quote_request_submit.php';
?>
<!doctype html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="description" content="Curious? Request a quote and make your that you're getting the best coverage in Mechanicsville at a fair price." />

	<title>Insurance Quote | Rodney Cole Insurance</title>

	<?php
		include WEBROOT . 'inc/topscripts.php';
		include WEBROOT . 'inc/ga.php';
	?>
</head>

<body>
	<?php include WEBROOT . 'inc/header.php';?>
<div class="subpage-banners">
	<div class="container padding-vertical-lg">
		<div class="row">
			<div class="col-sm-12">
				<h1 class="subpage-headline">Want A Better Quote?</h1>
			</div>
		</div>
	</div>
</div>
<div class="container padding-vertical-lg">
	<div class="row">
		<div class="col-sm-12">
			<form data-quote-form="quote-request-submit.php">
				<div class="form form-default form-quote">
					<div class="form-heading">
						<h2 class="form-title">Get A Quote</h2>
					</div>
					<div class="form-body">
						<p><small>ALL FIELDS REQUIRED</small></p>
						<div class="row">
							<div class="col-sm-4">
								<div class="form-group">
									<label for="quoteName" class="sr-only">Name</label>
									<input type="text" class="form-control" name="quoteName" id="quoteName" placeholder="Enter Name">
								</div>
								<div class="form-group">
									<label for="quotePhone" class="sr-only">Phone</label>
									<input type="text" class="form-control" name="quotePhone" id="quotePhone" placeholder="Enter Phone Number">
								</div>
								<div class="form-group">
									<label for="quoteEmail" class="sr-only">Email</label>
									<input type="email" class="form-control" name="quoteEmail" id="quoteEmail" placeholder="Enter Email Address">
								</div>
							</div>
							<div class="col-sm-4 col-md-3">
								<h3 style="margin-top: -6px;">I am interested in a quote for...</h3>
								<label class="control-label"><input type="checkbox" name="quote_options[]" value="Business Owners Insurance"> Business Owners Insurance</label><br />
								<label class="control-label"><input type="checkbox" name="quote_options[]" value="Commercial Auto"> Commercial Auto</label><br />
								<label class="control-label"><input type="checkbox" name="quote_options[]" value="Commercial Umbrella"> Commercial Umbrella</label><br />
								<label class="control-label"><input type="checkbox" name="quote_options[]" value="Liability"> Liability</label><br />
								<label class="control-label"><input type="checkbox" name="quote_options[]" value="Workers' Compensation"> Workers' Compensation</label><br />

								<label class="control-label"><input type="checkbox" name="quote_options[]" value="Auto &amp; Boat"> Auto &amp; Boat</label><br />
								<label class="control-label"><input type="checkbox" name="quote_options[]" value="Condo Insurance"> Condo Insurance</label><br />
								<label class="control-label"><input type="checkbox" name="quote_options[]" value="Health Insurance"> Health Insurance</label><br />
								<label class="control-label"><input type="checkbox" name="quote_options[]" value="Homeowners &amp; Renters"> Homeowners &amp; Renters</label><br />
								<label class="control-label"><input type="checkbox" name="quote_options[]" value="Life Insurance"> Life Insurance</label><br />
								<label class="control-label"><input type="checkbox" name="quote_options[]" value="Umbrella Insurance"> Umbrella Insurance</label><br />
							</div>
							<div class="col-sm-4 col-md-5">
								<div class="form-group">
									<label for="quoteMessage" class="sr-only">Message</label>
									<textarea class="form-control" name="quoteMessage" id="quoteMessage" placeholder="Enter Message" rows="10"></textarea>
								</div>
							</div>
						</div>
					</div>
					<div class="form-footer">
						<button type="submit" class="btn btn-block btn-lg btn-contact" data-loading-text="Sending...">Submit Request</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</div>
<?php include WEBROOT . 'inc/footer.php'; ?>
<?php include WEBROOT . 'inc/bottomscripts.php'; ?>
<?php include WEBROOT . 'inc/quote_request_script.php'; ?>
</body>
</html>
