<?php include '../inc/top.php'; ?>
<!doctype html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="description" content="" />

	<title>Image Gallery | The Annual Cookie Sale To Combast World Hunger</title>

	<?php
	include WEBROOT . 'inc/topscripts.php';
	include WEBROOT . 'inc/ga.php';
	?>
</head>

<body>
	<div class="wrap"><!-- Surrounding Container -->
	<?php include WEBROOT . 'inc/header.php'; ?>
		<div class="container-fluid padding-vertical-lg">
			<h1><img src="<?php echo WEBURLROOT; ?>/images/image-gallery.png" alt="The Cookie Sale Image Gallery" class="img-responsive" style="margin:0 auto;" /></h1>
			<hr>
			<br/>
			<!-- thumb navigation carousel -->
			<div class="row">
				<div class="col-md-2"></div>
				<div class="col-sm-12 col-md-2" id="slider-thumbs">
				<!-- thumb navigation carousel items -->
					<ul class="list-inline scrollbar" id="style-2">
						<li> <a id="carousel-selector-0" class="selected">
							<img src="<?php echo WEBURLROOT; ?>images/image-gallery/2010 Cookie Sale 01.jpg" class="img-responsive" alt="2010 Cookie Sale 01">
						</a></li>
						<li> <a id="carousel-selector-1">
							<img src="<?php echo WEBURLROOT; ?>images/image-gallery/2010 Cookie Sale 04.jpg" class="img-responsive" alt="2010 Cookie Sale 04">
						</a></li>
						<li> <a id="carousel-selector-2">
							<img src="<?php echo WEBURLROOT; ?>images/image-gallery/2010 Cookie Sale 18.jpg" class="img-responsive" alt="2010 Cookie Sale 18">
						</a></li>
						<li> <a id="carousel-selector-3">
							<img src="<?php echo WEBURLROOT; ?>images/image-gallery/2010 Cookie Sale 19.jpg" class="img-responsive" alt="2010 Cookie Sale 19">
						</a></li>
						<li> <a id="carousel-selector-4">
							<img src="<?php echo WEBURLROOT; ?>images/image-gallery/2010 Cookie Sale 21.jpg" class="img-responsive" alt="2010 Cookie Sale 21">
						</a></li>
						<li> <a id="carousel-selector-5">
							<img src="<?php echo WEBURLROOT; ?>images/image-gallery/2010 Cookie Sale 22.jpg" class="img-responsive" alt="2010 Cookie Sale 22">
						</a></li>
						<li> <a id="carousel-selector-6">
							<img src="<?php echo WEBURLROOT; ?>images/image-gallery/2010 Cookie Sale 23.jpg" class="img-responsive" alt="2010 Cookie Sale 23">
						</a></li>
						<li> <a id="carousel-selector-7">
							<img src="<?php echo WEBURLROOT; ?>images/image-gallery/2010 Cookie Sale 24.jpg" class="img-responsive" alt="2010 Cookie Sale 24">
						</a></li>
						<li> <a id="carousel-selector-8">
							<img src="<?php echo WEBURLROOT; ?>images/image-gallery/2011 Cookie Sale 01.jpg" class="img-responsive" alt="2011 Cookie Sale 01">
						</a></li>
						<li> <a id="carousel-selector-9">
							<img src="<?php echo WEBURLROOT; ?>images/image-gallery/2011 Cookie Sale 02.jpg" class="img-responsive" alt="2011 Cookie Sale 02">
						</a></li>
						<li> <a id="carousel-selector-10">
							<img src="<?php echo WEBURLROOT; ?>images/image-gallery/2011 Cookie Sale 03.jpg" class="img-responsive" alt="2011 Cookie Sale 03">
						</a></li>
						<li> <a id="carousel-selector-11">
							<img src="<?php echo WEBURLROOT; ?>images/image-gallery/2011 Cookie Sale 04.jpg" class="img-responsive" alt="2011 Cookie Sale 04">
						</a></li>
						<li> <a id="carousel-selector-12">
							<img src="<?php echo WEBURLROOT; ?>images/image-gallery/2011 Cookie Sale 06.jpg" class="img-responsive" alt="2011 Cookie Sale 06">
						</a></li>
						<li> <a id="carousel-selector-13">
							<img src="<?php echo WEBURLROOT; ?>images/image-gallery/2011 Cookie Sale 07.jpg" class="img-responsive" alt="2011 Cookie Sale 07">
						</a></li>
						<li> <a id="carousel-selector-14">
							<img src="<?php echo WEBURLROOT; ?>images/image-gallery/2011 Cookie Sale 08.jpg" class="img-responsive" alt="2011 Cookie Sale 08">
						</a></li>
						<li> <a id="carousel-selector-15">
							<img src="<?php echo WEBURLROOT; ?>images/image-gallery/2011 Cookie Sale 10.jpg" class="img-responsive" alt="2011 Cookie Sale 10">
						</a></li>
						<li> <a id="carousel-selector-16">
							<img src="<?php echo WEBURLROOT; ?>images/image-gallery/2011 Cookie Sale 11.jpg" class="img-responsive" alt="2011 Cookie Sale 11">
						</a></li>
						<li> <a id="carousel-selector-17">
							<img src="<?php echo WEBURLROOT; ?>images/image-gallery/2011 Cookie Sale 12.jpg" class="img-responsive" alt="2011 Cookie Sale 12">
						</a></li>
					</ul>
				</div>
				<!-- main slider carousel -->
				<div class="col-sm-1 hidden-md hidden-lg"></div>
				<div class="col-sm-10 col-md-6" id="slider carousel-bounding-box">
					<div id="myCarousel" class="carousel slide">
						<!-- main slider carousel items -->
						<div class="carousel-inner">
							<div class="active item" data-slide-number="0">
								<img src="<?php echo WEBURLROOT; ?>images/image-gallery/2010 Cookie Sale 01.jpg" class="img-responsive" alt="2010 Cookie Sale 01">
							</div>
							<div class="item" data-slide-number="1">
								<img src="<?php echo WEBURLROOT; ?>images/image-gallery/2010 Cookie Sale 04.jpg" class="img-responsive" alt="2010 Cookie Sale 04">
							</div>
							<div class="item" data-slide-number="2">
								<img src="<?php echo WEBURLROOT; ?>images/image-gallery/2010 Cookie Sale 18.jpg" class="img-responsive" alt="2010 Cookie Sale 18">
							</div>
							<div class="item" data-slide-number="3">
								<img src="<?php echo WEBURLROOT; ?>images/image-gallery/2010 Cookie Sale 19.jpg" class="img-responsive" alt="2010 Cookie Sale 19">
							</div>
							<div class="item" data-slide-number="4">
								<img src="<?php echo WEBURLROOT; ?>images/image-gallery/2010 Cookie Sale 21.jpg" class="img-responsive" alt="2010 Cookie Sale 21">
							</div>
							<div class="item" data-slide-number="5">
								<img src="<?php echo WEBURLROOT; ?>images/image-gallery/2010 Cookie Sale 22.jpg" class="img-responsive" alt="2010 Cookie Sale 22">
							</div>
							<div class="item" data-slide-number="6">
								<img src="<?php echo WEBURLROOT; ?>images/image-gallery/2010 Cookie Sale 23.jpg" class="img-responsive" alt="2010 Cookie Sale 23">
							</div>
							<div class="item" data-slide-number="7">
								<img src="<?php echo WEBURLROOT; ?>images/image-gallery/2010 Cookie Sale 24.jpg" class="img-responsive" alt="2010 Cookie Sale 24">
							</div>
							<div class="item" data-slide-number="8">
								<img src="<?php echo WEBURLROOT; ?>images/image-gallery/2011 Cookie Sale 01.jpg" class="img-responsive" alt="2011 Cookie Sale 01">
							</div>
							<div class="item" data-slide-number="9">
								<img src="<?php echo WEBURLROOT; ?>images/image-gallery/2011 Cookie Sale 02.jpg" class="img-responsive" alt="2011 Cookie Sale 02">
							</div>
							<div class="item" data-slide-number="10">
								<img src="<?php echo WEBURLROOT; ?>images/image-gallery/2011 Cookie Sale 03.jpg" class="img-responsive" alt="2011 Cookie Sale 03">
							</div>
							<div class="item" data-slide-number="11">
								<img src="<?php echo WEBURLROOT; ?>images/image-gallery/2011 Cookie Sale 04.jpg" class="img-responsive" alt="2011 Cookie Sale 04">
							</div>
							<div class="item" data-slide-number="12">
								<img src="<?php echo WEBURLROOT; ?>images/image-gallery/2011 Cookie Sale 06.jpg" class="img-responsive" alt="2011 Cookie Sale 06">
							</div>
							<div class="item" data-slide-number="13">
								<img src="<?php echo WEBURLROOT; ?>images/image-gallery/2011 Cookie Sale 07.jpg" class="img-responsive" alt="2011 Cookie Sale 07">
							</div>
							<div class="item" data-slide-number="14">
								<img src="<?php echo WEBURLROOT; ?>images/image-gallery/2011 Cookie Sale 08.jpg" class="img-responsive" alt="2011 Cookie Sale 08">
							</div>
							<div class="item" data-slide-number="15">
								<img src="<?php echo WEBURLROOT; ?>images/image-gallery/2011 Cookie Sale 10.jpg" class="img-responsive" alt="2011 Cookie Sale 10">
							</div>
							<div class="item" data-slide-number="16">
								<img src="<?php echo WEBURLROOT; ?>images/image-gallery/2011 Cookie Sale 11.jpg" class="img-responsive" alt="2011 Cookie Sale 11">
							</div>
							<div class="item" data-slide-number="17">
								<img src="<?php echo WEBURLROOT; ?>images/image-gallery/2011 Cookie Sale 12.jpg" class="img-responsive" alt="2011 Cookie Sale 12">
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
				<div class="col-sm-1 col-md-2"></div>
			</div>
		</div>
		<div class="container cookies">

		</div>
		<!--/main slider carousel-->
	<?php include WEBROOT . 'inc/footer.php'; ?>
	</div><!-- End Surrounding Container -->
	<?php include WEBROOT . 'inc/bottomscripts.php'; ?>
	<script>
		$('#myCarousel').carousel({
			interval: 4000
		});

		// handles the carousel thumbnails
		$('[id^=carousel-selector-]').click( function(){
			var id_selector = $(this).attr("id");
			var id = id_selector.replace('carousel-selector-','');
			id = parseInt(id);
			$('#myCarousel').carousel(id);
			$('[id^=carousel-selector-]').removeClass('selected');
			$(this).addClass('selected');
		});

		// when the carousel slides, auto update
		$('#myCarousel').on('slide', function (e) {
			var id = $('.item.active').data('slide-number');
			id = parseInt(id);
			$('[id^=carousel-selector-]').removeClass('selected');
			$('[id=carousel-selector-'+id+']').addClass('selected');
		});
	</script>
</body>
</html>
