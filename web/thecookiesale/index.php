<?php include 'inc/top.php'; ?>
<!doctype html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="description" content="" />

	<title>The Annual Cookie Sale To Combat World Hunger</title>

	<?php
	include WEBROOT . 'inc/topscripts.php';
	include WEBROOT . 'inc/ga.php';
	?>
</head>

<body>
	<div class="wrap"><!-- Surrounding Container -->
		<?php include WEBROOT . 'inc/header.php'; ?>
		<div class="container-fluid remove-padding">
			<div id="myCarousel" class="carousel slide" data-ride="carousel">
			    <!-- Indicators -->
			    <ol class="carousel-indicators">
			      <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
			      <li data-target="#myCarousel" data-slide-to="1"></li>
			      <li data-target="#myCarousel" data-slide-to="2"></li>
			    </ol>
				<!-- Wrapper for slides -->
				<div class="carousel-inner">
					<div class="item active">
						<h1><img src="<?php echo WEBURLROOT; ?>images/banner-1.jpg" alt="20 Year Anniversary" style="width:100%;"></h1>
					</div>
					<div class="item">
						<h1><img src="<?php echo WEBURLROOT; ?>images/banner-2.jpg" alt="57 Cookies Types Available" style="width:100%;"></h1>
					</div>
	 				<div class="item">
						<h1><img src="<?php echo WEBURLROOT; ?>images/banner-3.jpg" alt="11 Million People Fed Every Year" style="width:100%;"></h1>
					</div>
				</div>
				<!-- Left and right controls -->
				<a class="left carousel-control" href="#myCarousel" data-slide="prev">
					<span class="glyphicon glyphicon-chevron-left"></span>
					<span class="sr-only">Previous</span>
				</a>
				<a class="right carousel-control" href="#myCarousel" data-slide="next">
					<span class="glyphicon glyphicon-chevron-right"></span>
					<span class="sr-only">Next</span>
				</a>
			</div>
		</div>
		<div class="container-fluid padding-vertical-lg">
			<div class="row">
				<div class="col-xs-12 col-sm-6">
					<h2><img src="<?php echo WEBURLROOT; ?>images/how-it-all-began.png" alt="How It All Began" class="img-responsive"/></h2>
					<hr>
					<p>In 1997, Jim and Jen Weber wanted to start a project that would motivate their Sunday school class at St. Joseph’s Parish... <a href="<?php echo WEBURLROOT; ?>more#How it Began">More</a></p>
					<a href="<?php echo WEBURLROOT; ?>gallery"><img src="<?php echo WEBURLROOT; ?>images/view-gallery.png" alt="View Gallery" class="img-responsive grow-rotate" /></a>
				</div>
				<div class="col-xs-12 col-sm-6">
					<div class="iframe-cont-cont">
						<h3 class="text-center white" style="padding:0px 0px 10px;">Why Your Church Should Participate:</h3>
						<div class="iframe-cont iframe-cont-16x9">
							<iframe src="https://www.youtube.com/embed/FOfaOO7fj9s" frameborder="0" allowfullscreen></iframe>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="container-fluid remove-padding text-center red-headline">
			<div class="row">
				<div class="col-xs-12">
					<h3><img src="<?php echo WEBURLROOT; ?>images/2017-cookie-sale.png" alt="2017 Cookie Sale Dates: Nov. 12 - Dec. 3" class="img-responsive" style="margin:0 auto;"/></h3>
				</div>
			</div>
		</div>
		<div class="container-fluid padding-vertical-lg">
			<div class="row">
				<div class="col-xs-12 col-sm-3 home-image-row hidden-xs">
					<img src="<?php echo WEBURLROOT; ?>images/Haitians2.png" alt="Working In Haiti" class="img-responsive" />
					<img src="<?php echo WEBURLROOT; ?>images/Haitians4.png" alt="Combating World Hunger" class="img-responsive" />
					<img src="<?php echo WEBURLROOT; ?>images/CI-Vitafood.png" alt="Vitafood" class="img-responsive" />
				</div>
				<div class="col-xs-12 col-sm-3 home-image-row visible-xs">
					<img src="<?php echo WEBURLROOT; ?>images/haitians-row.png" alt="Combating World Hunger" class="img-responsive" />
				</div>
				<div class="col-xs-12 col-sm-9">
					<h4>2016 Cookie Sale Helped Feed 2.6 Million</h4>
					<p>Last year's Cookie Sale raised enough money to help Cross International feed more than 2.6 million people. This was achieved with the help of Cross International finding new ways to stretch The Cookie Sale proceeds. Our goal for this year is to feed over 2.6 million people! 100°/o of the proceeds from the Annual Cookie Sale goes to Cross lnternational's Hunger Relief Program in
					Haiti and Nicaragua!</p>
					<h4>How You Can Help</h4>
					<p>We are looking for churches, youth groups, businesses, or organizations... <a href="<?php echo WEBURLROOT; ?>more#How You Can Help">More</a><p>
					<h4>Want to Know More?</h4>
					<p>For more information on The Cookie Sale or to find out how you can take part, <a href="<?php echo WEBURLROOT; ?>more">click here</a> or call <a href="tel:18662665439">1-866-COOKIE-9 (1-866-266-5439)</a>.</p>
					<h4>Make Checks Payable To...</h4>
					<p>All checks should be made payable to: Cross International.</p>
					<h4>Where The Proceeds Go...</h4>
					<p><a href="<?php echo WEBURLROOT; ?>proceeds">Click here</a> to read about Cross International and where our proceeds go.</p>
					<h4>Vitafood</h4>
					<p>Vitafood contains a scientific blend of vitamins, minerals, protein, fat, fiber, electrolytes and carbohydrates, specifically developed to feed malnourished and starving children. Each bag provides six nutritious meals.</p>
				</div>
			</div>
		</div>
	<?php include WEBROOT . 'inc/footer.php'; ?>
	</div><!-- End Surrounding Container -->
	<?php include WEBROOT . 'inc/bottomscripts.php'; ?>
</body>
</html>
