<?php include '../inc/top.php'; ?>
<?php $tab = 'services'; ?>
<!doctype html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="description" content="We offer a large variety of printing services such as labels, signage, ad specalties, and traditional printing needs." />

	<title>Services Offered | Fast, Affordable, And When You Need It</title>

	<?php
	include WEBROOT . 'inc/topscripts.php';
	include WEBROOT . 'inc/ga.php';
	?>
</head>

<body>
	<?php include WEBROOT . 'inc/header.php'; ?>

<div class="container">
	<div class="row home-add-padding">
		<div class="col-lg-3 col-md-3 col-sm-6 col-xs-6 text-center no-padding-horizontal cyan-bkg padding-vertical">
			<h2 class="white">Labels</h2>
			<img src="<?php echo $WEBURLROOT; ?>../images/services/labels/roll-labels-silo.png" class="img-services" />
			<a href="<?php echo WEBURLROOT; ?>services/labels/" class="btn btn-white outline"><span class="glyphicon glyphicon-info-sign"></span>More Info</a>
			<a href="<?php echo WEBURLROOT; ?>quote/" class="btn btn-yellow"><span class="glyphicon glyphicon-list-alt"></span>Get Quote</a>
		</div>
		<div class="col-lg-3 col-md-3 col-sm-6 col-xs-6 text-center no-padding-horizontal magenta-bkg padding-vertical">
			<h2 class="white">Printing</h2>
			<img src="<?php echo $WEBURLROOT; ?>../images/services/printing/single-pocket-folder-silo.png" class="img-services" />
			<a href="<?php echo WEBURLROOT; ?>services/printing/" class="btn btn-white outline"><span class="glyphicon glyphicon-info-sign"></span>More Info</a>
			<a href="<?php echo WEBURLROOT; ?>quote/" class="btn btn-black"><span class="glyphicon glyphicon-list-alt"></span>Get Quote</a>
		</div>
		<div class="col-lg-3 col-md-3 col-sm-6 col-xs-6 text-center no-padding-horizontal yellow-bkg padding-vertical">
			<h2 class="black">Signage</h2>
			<img src="<?php echo $WEBURLROOT; ?>../images/services/signage/real-estate-sign-silo.png" class="img-services" />
			<a href="<?php echo WEBURLROOT; ?>services/signage/" class="btn btn-black outline"><span class="glyphicon glyphicon-info-sign"></span>More Info</a>
			<a href="<?php echo WEBURLROOT; ?>quote/" class="btn btn-cyan"><span class="glyphicon glyphicon-list-alt"></span>Get Quote</a>
		</div>
		<div class="col-lg-3 col-md-3 col-sm-6 col-xs-6 text-center no-padding-horizontal black-bkg padding-vertical">
			<h2><span class="yellow">A</span><span class="magenta">d</span> <span class="cyan">S</span><span class="yellow">p</span><span class="magenta">e</span><span class="cyan">c</span><span class="yellow">i</span><span class="magenta">a</span><span class="cyan">l</span><span class="yellow">t</span><span class="magenta">i</span><span class="cyan">e</span><span class="yellow">s</span></h2>
			<img src="<?php echo $WEBURLROOT; ?>../images/services/specialties/stainless-tumbler-silo.png" class="img-services" />
			<a href="<?php echo WEBURLROOT; ?>services/ad-specialties/" class="btn btn-white outline"><span class="glyphicon glyphicon-info-sign"></span>More Info</a>
			<a href="<?php echo WEBURLROOT; ?>quote/" class="btn btn-magenta"><span class="glyphicon glyphicon-list-alt"></span>Get Quote</a>
		</div>
	</div>
</div>

<div class="white-bkg">
	<div class="container">
		<div class="row">
			<div class="col-lg-12 text-center">
				<h1 class="teal">Fast, Affordable, and When You Need It</h1>
				<p>Here at Beiler Printing, we have a wide variety of services offered to benefit all your needs. We guarantee the best prices and the best quality to make sure your company always looks good.</p>
			</div>
		</div>
	</div>
</div>

	<?php
	include WEBROOT . 'inc/footer.php';
	include WEBROOT . 'inc/bottomscripts.php';
	?>
</body>
</html>
