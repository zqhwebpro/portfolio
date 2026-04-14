<?php include '../inc/top.php'; ?>
<!doctype html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="description" content="" />

	<title>Order Cookie Trays | The Annual Cookie Sale To Combat World Hunger</title>
	<script src='https://www.google.com/recaptcha/api.js'></script>
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
			<div class="col-xs-12 text-center">
				<h1><img src="<?php echo WEBURLROOT; ?>images/order-cookie-trays.png" class="img-responsive" alt="Order Cookie Trays" style="margin: 0 auto;"/></h1>
				<hr>
				<br/>
				<p>This form is provided for your convenience to order gift trays for your company or yourself to give as year end gifts to employees, clients, vendors and friends. Each gift tray comes with chocolate chip, peanut butter and sugar cookies (8 each) and an assortment of Hershey's candies all wrapped up nicely in festive cellophane and tied with a bow. A unique gift card describing The Cookie Sale is also included. If you want to buy cookies and are not affiliated with a business or organization, please email <a href="mailto:cookie@thecookiesale.com">cookie@thecookiesale.com.</a> We will have someone contact you directly to confirm your order and provide any further information you may need. Please click here to view our cookie gift tray.</p>
				<p><span class="text-highlight">The cost of a cookie tray is $15. A $8 shipping and handling fee will be added to each tray that you have us mail.</span> If you are including a special gift from your company, there may be an increased shipping fee due to the weight of the item, please call for approval. Please note that all gift tray orders and any items you want to include must arrive to us by <span class="text-highlight">Saturday, November 25, 2017!</span></p>
				<p>If you have any questions please feel free to call <a href="tel:17175097399">717-509-7399</a> or <a href="tel:18662665439">1-866-COOKIE-9.</a></p>
			</div>
			<div class="col-xs-12">
				<form action="buycookies.php" method="post" name="regForm">
					<h2><label>How Many Cookie Trays Would You Like?</label></h2>
					<label>Number of Cookie Trays Desired:</label>
					<input type="text" name="total_trays" value="<?php echo $default[0]; ?>" />
					<h2><label>Include Company Gifts?</label></h2>
					<input type="checkbox" name="inc_gifts" value="checked" <?php echo $defaultcheck[0]; ?> style="float: left;">
					<label>I Would Like To Include A Company Gift In The Trays</label>
					<p class="small">Mugs and company holiday cards make excellent items to put in a cookie tray. *Gifts to be included must be received by Monday, November 27, 2017.</p>
					<h2><label>Personal Contact Information</label></h2>
					<div class="row">
						<div class="form-group col-xs-12 col-sm-6">
							<label>Business/Organization Name:</label>
							<input type="text" name="o_name" value="<?php echo $default[1]; ?>">
						</div>
						<div class="form-group col-xs-12 col-sm-6">
							<label>*Contact Person's First Name:</label>
							<input required type="text" name="first" value="<?php echo $default[2]; ?>">
						</div>
					</div>
					<div class="row">
						<div class="form-group col-xs-12 col-sm-6">
							<label>*Contact Person's Last Name:</label>
							<input required type="text" name="first" value="<?php echo $default[3]; ?>">
						</div>
						<div class="form-group col-xs-12 col-sm-6">
							<label>*Address:</label>
							<input required type="text" name="first" value="<?php echo $default[4]; ?>">
						</div>
					</div>
					<div class="row">
						<div class="form-group col-xs-12 col-sm-4">
							<label>*City:</label>
							<input required type="text" name="first" value="<?php echo $default[5]; ?>">
						</div>
						<div class="form-group col-xs-12 col-sm-4">
							<label>*Zip:</label>
							<input required type="text" name="first" value="<?php echo $default[6]; ?>">
						</div>
						<div class="form-group col-xs-12 col-sm-4">
							<label>*State:</label></br>
							<select name="state">
								<option selected value="">Select One</option>
								<option value="AL">Alabama</option>
								<option value="AK">Alaska</option>
								<option value="AZ">Arizona</option>
								<option value="AR">Arkansas</option>
								<option value="CA">California</option>
								<option value="CO">Colorado</option>
								<option value="CT">Connecticut</option>
								<option value="DE">Delaware</option>
								<option value="DC">District of Columbia</option>
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
								<option value="PR">Puerto Rico</option>
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
					<div class="row">
						<div class="form-group col-xs-12 col-sm-6">
							<label>*Email:</label>
							<input required type="text" name="first" value="<?php echo $default[7]; ?>">
						</div>
						<div class="form-group col-xs-12 col-sm-6">
							<label>*Phone:</label>
							<input required type="text" name="first" value="<?php echo $default[8]; ?>">
						</div>
					</div>
					<h2><label>Shipping</label></h2>
					<div class="row">
		   				<div class="form-group col-xs-12 col-sm-4">
							<label>Drop Ship Trays To Your Customers?:</label>
							<input type="checkbox" name="check_dropship" value="checked" <?php echo $defaultcheck[1]; ?>>
						</div>
						<div class="form-group col-xs-12 col-sm-8">
							<label>Number Of Trays To Drop Ship:</label>
							<input type="number" name="num_dropship" value="<?php echo $default[9]; ?>">
						</div>
					</div>
					<div class="row">
						<div class="form-group col-xs-12 col-sm-4">
							<label>Ship Trays To Address Specified Above?:</label>
							<input type="checkbox" name="check_dropship" value="checked" <?php echo $defaultcheck[2]; ?>>
						</div>
						<div class="form-group col-xs-12 col-sm-8">
							<label>Number Of Trays To Ship:</label>
							<input type="number" name="num_dropship" value="<?php echo $default[10]; ?>">
						</div>
					</div>
					<div class="row">
						<div class="form-group col-xs-12 col-sm-4">
							<label>Pickup Trays Locally (Lancaster, PA)?:</label>
							<input type="checkbox" name="check_dropship" value="checked" <?php echo $defaultcheck[3]; ?>>
						</div>
						<div class="form-group col-xs-12 col-sm-8">
							<label>Number Of Trays To Pickup:</label>
							<input type="number" name="num_dropship" value="<?php echo $default[11]; ?>">
						</div>
					</div>
					<div class="well">
						<label>FAQ</label><br/>
						<label>Where Do I Send The Gifts I Want Included In The Trays?</label>
						<p class="small">Someone will contact you by phone or email regarding where to send your gifts.</p>
						<label>How Do I Get You The Addresses For The Drop Shipping?</label>
						<p class="small">Someone will contact you by phone or email regarding your mailing list/labels.</p>
					</div>
					<h2><label>Questions or Comments</h2></label>
					<textarea name="questions" rows="6" cols="70" valign="right" align="right"><?php echo $default[12]; ?></textarea>
					<div class="row">
						<div class="form-group col-xs-12 col-sm-6">
							<label>Please Enter The Security Code Into The Textbox:</label>
							<div class="g-recaptcha" data-sitekey="6LeJJDkUAAAAAIkx3wOP1fBP75XY96hYh77_CigK"></div>
						</div>
						<div class="form-group col-xs-12 col-sm-6">
							<input class="btn btn-primary" type="submit" name="submit" value="Submit My Order">
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
	<?php include WEBROOT . 'inc/footer.php'; ?>
	</div><!-- End Surrounding Container -->
	<?php include WEBROOT . 'inc/bottomscripts.php'; ?>
</body>
</html>
