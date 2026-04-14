<?php
include 'inc/top.php';
include 'inc/quote_request_submit.php';
?>
<!doctype html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="description" content="Curious? Request a quote and make your that you're getting the best coverage in Appomattox at a fair price." />

	<title>Insurance Quote | Scott &amp; Wilson Insurance</title>

	<?php include 'inc/topscripts.php';?>
	<?php include 'inc/ga.php'; ?>
</head>

<body>
	<?php include 'inc/header.php';?>
<div class="subpage-banner-quote">
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
				<form data-quote-form="">
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
									<h6>I am interested in a quote for...</h6>
									<label class="control-label"><input type="checkbox" name="quote_options[]" value="Commercial Auto Insurance"> Commercial Auto Insurance</label><br />
									<label class="control-label"><input type="checkbox" name="quote_options[]" value="Workers' Comp"> Workers' Comp</label><br />
									<label class="control-label"><input type="checkbox" name="quote_options[]" value="Property Insurance"> Property Insurance</label><br />
									<label class="control-label"><input type="checkbox" name="quote_options[]" value="General Liability"> General Liability</label><br />
									<label class="control-label"><input type="checkbox" name="quote_options[]" value="Farm Insurance"> Farm Insurance</label><br />
									<label class="control-label"><input type="checkbox" name="quote_options[]" value="Church Programs"> Church Programs</label><br />
									<label class="control-label"><input type="checkbox" name="quote_options[]" value="Homeowners &amp; Renters Insurance"> Homeowners &amp; Renters Insurance</label><br />
									<label class="control-label"><input type="checkbox" name="quote_options[]" value="Personal Auto Insurance"> Personal Auto Insurance</label><br />
									<label class="control-label"><input type="checkbox" name="quote_options[]" value="Boat Insurance"> Boat Insurance</label><br />
									<label class="control-label"><input type="checkbox" name="quote_options[]" value="Motorcycle Insurance"> Motorcycle Insurance</label><br />
									<label class="control-label"><input type="checkbox" name="quote_options[]" value="Life Insurance"> Life Insurance</label><br />
									<label class="control-label"><input type="checkbox" name="quote_options[]" value="Long-Term Care Insurance"> Long-Term Care Insurance</label><br />
									<label class="control-label"><input type="checkbox" name="quote_options[]" value="Umbrella Insurance"> Umbrella Insurance</label><br />
									<label class="control-label"><input type="checkbox" name="quote_options[]" value="Disability Insurance"> Disability Insurance</label><br />
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
	<?php include 'inc/footer.php'; ?>
	<?php include 'inc/bottomscripts.php'; ?>
	<?php include 'inc/quote_request_script.php'; ?>
</body>
</html>
