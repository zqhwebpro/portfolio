<?php include 'inc/top.php'; ?>

<?php $tab = 'about'; ?>
<!doctype html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="description" content="We serve Lancaster county and surrounding areas with all label, signage, printing, and ad specialty needs. Need your job done fast? Check us out!" />

	<title>Beiler Printing LLC | Quick Turn &amp; Short Run Printing Specalists</title>
	<?php
	include WEBROOT . 'inc/topscripts.php';
	include WEBROOT . 'inc/ga.php';
	?>
</head>

<body>
	<?php include WEBROOT . 'inc/header.php'; ?>

<div class="container no-padding-vertical">
	<div id="myCarousel" class="carousel slide" data-ride="carousel">
		<ol class="carousel-indicators">
			<li data-target="#myCarousel" data-slide-to="0" class="active"></li>
			<li data-target="#myCarousel" data-slide-to="1"></li>
			<li data-target="#myCarousel" data-slide-to="2"></li>
			<li data-target="#myCarousel" data-slide-to="3"></li>
		</ol>
		<div class="carousel-inner">
			<div class="item active">
				<a href="<?php echo WEBURLROOT; ?>services/labels/"><img src="<?php echo $WEBURLROOT; ?>images/slideshow/we-turn-labels-fast.jpg" alt="We Turn Labels Fast!" class="hidden-xs"></a>
				<a href="<?php echo WEBURLROOT; ?>services/labels/"><img src="<?php echo $WEBURLROOT; ?>images/slideshow/we-turn-labels-fast-mobile.jpg" alt="We Turn Labels Fast!" class="visible-xs"></a>
			</div>
			<div class="item">
				<a href="<?php echo WEBURLROOT; ?>services/labels/"><img src="<?php echo $WEBURLROOT; ?>images/slideshow/short-run-labels.jpg" alt="Learn About Our Short Run Labels Here!" class="hidden-xs"></a>
				<a href="<?php echo WEBURLROOT; ?>services/labels/"><img src="<?php echo $WEBURLROOT; ?>images/slideshow/short-run-labels-mobile.jpg" alt="Learn About Our Short Run Labels Here!" class="visible-xs"></a>
			</div>
			<div class="item">
				<a href="<?php echo WEBURLROOT; ?>services/labels/"><img src="<?php echo $WEBURLROOT; ?>images/slideshow/print-labels.jpg" alt="We Print Labels for Packaging!" class="hidden-xs"></a>
				<a href="<?php echo WEBURLROOT; ?>services/labels/"><img src="<?php echo $WEBURLROOT; ?>images/slideshow/print-label-mobile.jpg" alt="We Print Labels for Packaging!" class="visible-xs"></a>
			</div>
			<div class="item">
				<a href="<?php echo WEBURLROOT; ?>services/labels/"><img src="<?php echo $WEBURLROOT; ?>images/slideshow/labels-offset.jpg" alt="Specializing in Labels and Offset Printing!" class="hidden-xs"></a>
				<a href="<?php echo WEBURLROOT; ?>services/labels/"><img src="<?php echo $WEBURLROOT; ?>images/slideshow/labels-offset-mobile.jpg" alt="Specializing in Labels and Offset Printing!" class="visible-xs"></a>
			</div>
		</div>
		<a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
			<span class="glyphicon glyphicon-chevron-left"></span>
			<span class="sr-only">Previous</span>
		</a>
		<a class="right carousel-control" href="#myCarousel" role="button" data-slide="next">
			<span class="glyphicon glyphicon-chevron-right"></span>
			<span class="sr-only">Next</span>
		</a>
	</div>
</div>

<div class="container">
	<div class="row home-add-padding">
		<div class="col-lg-3 col-md-3 col-sm-6 col-xs-6 text-center no-padding-horizontal cyan-bkg padding-vertical">
			<h2 class="white">Labels</h2>
			<img src="<?php echo $WEBURLROOT; ?>images/services/labels/roll-labels-silo.png" class="img-services" />
			<a href="<?php echo WEBURLROOT; ?>services/labels/" class="btn btn-white outline"><span class="glyphicon glyphicon-info-sign"></span>More Info</a>
			<a href="<?php echo WEBURLROOT; ?>quote/" class="btn btn-yellow"><span class="glyphicon glyphicon-list-alt"></span>Get Quote</a>
		</div>
		<div class="col-lg-3 col-md-3 col-sm-6 col-xs-6 text-center no-padding-horizontal magenta-bkg padding-vertical">
			<h2 class="white">Printing</h2>
			<img src="<?php echo $WEBURLROOT; ?>images/services/printing/single-pocket-folder-silo.png" class="img-services" />
			<a href="<?php echo WEBURLROOT; ?>services/printing/" class="btn btn-white outline"><span class="glyphicon glyphicon-info-sign"></span>More Info</a>
			<a href="<?php echo WEBURLROOT; ?>quote/" class="btn btn-black"><span class="glyphicon glyphicon-list-alt"></span>Get Quote</a>
		</div>
		<div class="col-lg-3 col-md-3 col-sm-6 col-xs-6 text-center no-padding-horizontal yellow-bkg padding-vertical">
			<h2 class="black">Signage</h2>
			<img src="<?php echo $WEBURLROOT; ?>images/services/signage/real-estate-sign-silo.png" class="img-services" />
			<a href="<?php echo WEBURLROOT; ?>services/signage/" class="btn btn-black outline"><span class="glyphicon glyphicon-info-sign"></span>More Info</a>
			<a href="<?php echo WEBURLROOT; ?>quote/" class="btn btn-cyan"><span class="glyphicon glyphicon-list-alt"></span>Get Quote</a>
		</div>
		<div class="col-lg-3 col-md-3 col-sm-6 col-xs-6 text-center no-padding-horizontal black-bkg padding-vertical">
			<h2><span class="yellow">A</span><span class="magenta">d</span> <span class="cyan">S</span><span class="yellow">p</span><span class="magenta">e</span><span class="cyan">c</span><span class="yellow">i</span><span class="magenta">a</span><span class="cyan">l</span><span class="yellow">t</span><span class="magenta">i</span><span class="cyan">e</span><span class="yellow">s</span></h2>
			<img src="<?php echo $WEBURLROOT; ?>images/services/specialties/stainless-tumbler-silo.png" class="img-services" />
			<a href="<?php echo WEBURLROOT; ?>services/ad-specialties/" class="btn btn-white outline"><span class="glyphicon glyphicon-info-sign"></span>More Info</a>
			<a href="<?php echo WEBURLROOT; ?>quote/" class="btn btn-magenta"><span class="glyphicon glyphicon-list-alt"></span>Get Quote</a>
		</div>
	</div>
</div>

<div class="white-bkg">
	<div class="container">
		<div class="row home-add-padding">
			<div class="col-lg-12 text-center">
				<h1 class="teal homepage-h1">Your Fastest Local <br/>Label Printing Company</h1>
				<p>Need to get your orders done fast? You came to the right place! Here at Beiler Printing, our customers think of us as the company that gets their needs <strong style="text-decoration:underline;">done fast</strong> and <strong style="text-decoration:underline;">done right.</strong> We specialize in <a href="<?php echo WEBURLROOT; ?>services/labels/"><strong style="text-decoration:underline;" class="teal">Labels</strong></a> but have many other services such as <a href="<?php echo WEBURLROOT; ?>services/printing/"><strong style="text-decoration:underline;" class="teal">Traditional Printing</strong></a>, <a href="<?php echo WEBURLROOT; ?>services/signage/"><strong style="text-decoration:underline;" class="teal">Signage</strong></a>, and various <a href="<?php echo WEBURLROOT; ?>services/ad-specialties/"><strong style="text-decoration:underline;" class="teal">Promo Products</strong></a> as well.</p>
				<p>We have made it our goal to be the company that produces a quick turn and short run to fulfill all your needs and to create lasting partnerships that will benefit your company for years to come!</p>
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
