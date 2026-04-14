<?php include '../inc/top.php';
include WEBROOT . 'inc/quote_request_submit.php';
?>

<!doctype html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="description" content="Fill out our form to get a quick quote on your printing needs or to submit a simple reorder. Like to speak directly to someone?" />

	<title>Get A Quick Quote Or Reorder</title>
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
					<h1 class="white">Request a Quote</h1>
				</div>
			</div>
		</div>
	</div>
	<div class="white-bkg">
		<div class="container">
			<div class="row padding-vertical">
				<div class="col-lg-12 text-center padding-vertical">
					<p>For a quick quote or simple reorder, simply complete the form below. Call <a onclick="record_event('Phone Number','Click To Call','Header 717-336-1148');" href="tel:1-717-336-1148">717-336-1148</a> if you would like to speak to someone directly.</p>
					<p><strong>If you have files to send, there will be an opportunity to upload after you submit this form.</strong></p>
				</div>
				<div class="col-lg-12 text-left">
					<form data-quote-form="" class="send-style" method="post" action="#send-file">
						<h2 class="teal">REQUEST A QUOTE</h2>
						<hr>
						<br/>
						<div class="form-container-container">
							<div class="form-container">
								<p style="font-size: 20px;"><strong>Personal Info</strong><p>
								<label>Full Name <span class="tiny">required</span></label>
								<input type="text" name="fullname" required><br/>
								<label>Email <span class="tiny">required</span></label>
								<input type="text" name="email" required><br/>
								<label>Phone <span class="tiny">required</span></label>
								<input type="text" name="phone" required><br/>
								<label>Fax</label>
								<input type="text" name="fax"><br/>
								<label>Company</label>
								<input type="text" name="company"><br/>
							</div>
							<div class="form-container">
								<p style="font-size: 20px;"><strong>Address</strong><p>
								<label>Street Address</label><br>
								<input type="text" name="address"><br>
								<label>City</label><br>
								<input type="text" name="city">
								<label>State</label><br>
								<input type="text" name="state">
								<label>Zipcode</label><br>
								<input type="text" name="zip">
								<label>Notes</label><br>
								<textarea name="notes"></textarea>
							</div>
						</div>
							<h2 class="teal">PRINTING DETAILS</h2>
							<hr>
							<br/>
						<div class="form-container" style="width:100%;">
							<label>Quote or Reorder <span class="tiny">required</span></label><br>
                            <select required name="quote-or-reorder">
								<option value="" disabled selected>Please Select an Order Option</option>
                            	<option value="Quote">Quote</option>
                            	<option value="Reorder">Reorder</option>
                            </select>
							<label>Item <span class="tiny">required</span></label><br>
							<input type="text" name="item" required>
							<p><small>Example: Brochure, Newsletter, Presentation Folder, Booklet, etc.</small></p>
							<label>Reorder #</label><br>
							<input type="text" name="reorder">
							<label>Quantity <span class="tiny">required</span></label><br>
							<input type="text" name="quantity" required>
							<label>Flat Size</label><br>
							<input type="text" name="flat-size">
							<p><small>The size of a printed product after printing and trimming but before any finishing operations that affect its size, such as folding.</small></p>
							<label>Finished Size <span class="tiny">required</span></label><br>
							<input type="text" name="finished-size" required>
							<p><small>The size of a printed product after all production operations have been completed.</small></p>
							<label>Inks <span class="tiny">required</span></label><br>
							<select required name="ink-options">
								<option value="" disabled selected>Please Select an Ink Option</option>
								<option value="Full Color 2 Sides">Full color both sides (4/4)</option>
								<option value="Full Color 1 Side">Full color front only (4/0)</option>
								<option value="Full Color Front Black Back">Full color front, Black back (4/1)</option>
								<option value="Black Only 2 Sides">Black only on both sides (1/1)</option>
								<option value="Black Only 1 Side">Black on front only (1/0)</option>
								<option value="Other">Other (specify below)</option>
							</select>
							<p><small>Colors to be printed.</small></p>
							<label>Paper <span class="tiny">required</span></label><br>
							<input type="text" name="paper" required>
							<p><small>Please list the paper weight and type if possible (example: 80# Gloss Text). If you are unsure of the weight or type, just describe the type as best you can.</small></p>
							<label>Special Comments</label><br>
						  	<textarea name="comments"></textarea>
						</div>
						<div class="text-center">
							<!-- <div class="g-recaptcha" data-sitekey="6LeEfyoUAAAAAAD78OrC9yXBwl_rkS96UlyEFAK8"></div><br/>-->
							<input class="btn btn-teal" type="submit" value="Submit Quote" data-loading-text="Sending..." onclick="document.getElementById('hidden-form-message').style.display = 'block' ;">
						</div>
						<div class="text-center padding-vertical" id="hidden-form-message">
							<hr>
							<p><strong><big>Don't forget to send your files!</big></strong></p>
							<p class="mobile-center"><a href="https://beilerprinting.wetransfer.com/" target="_blank" class="btn btn-purple"><span class="glyphicon glyphicon-upload"></span> <strong>Click Here To Upload Your Files</strong></a></p>
						</div>
						</form>
				</div>
			</div>
		</div>
	</div>
	<?php
	include WEBROOT . 'inc/footer.php';
	include WEBROOT . 'inc/bottomscripts.php';
	include WEBROOT . 'inc/quote_request_script.php'; ?>
</body>
</html>
