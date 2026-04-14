<?php include '../inc/top.php'; ?>
<!doctype html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="description" content="" />

	<title>Help Sell | The Annual Cookie Sale To Combast World Hunger</title>

	<?php
	include WEBROOT . 'inc/topscripts.php';
	include WEBROOT . 'inc/ga.php';
	?>
</head>

<body>
	<div class="wrap"><!-- Surrounding Container -->
	<?php include WEBROOT . 'inc/header.php'; ?>
	<div class="container-fluid padding-vertical-lg">
		<div class="row">
			<div class="col-xs-12">
				<img src="<?php echo WEBURLROOT; ?>/images/helpsell.png" alt="Help Sell" class="img-responsive" style="margin: 0 auto;"/>
				<hr>
				<br/>
			</div>
			<div class="col-xs-12 col-sm-6 text-center">
				<a href="mailto:cookie@thecookiesale.com?subject=I Want To Help Sell Cookies">
					<img src="<?php echo WEBURLROOT; ?>/images/Register-to-Sell.gif" onmouseover="this.src='../images/Register-to-Sell-over.gif'" onmouseout="this.src='../images/Register-to-Sell.gif'" class="img-responsive" style="margin:0 auto; padding:10px 0px;" />
				</a>
			</div>
			<div class="col-xs-12 col-sm-6 text-center">
				<a href="<?php echo WEBURLROOT; ?>faq">
				    <img src="<?php echo WEBURLROOT; ?>images/Get-Answers-Button.gif" onmouseover="this.src='../images/Get-Answers-Button-over.gif'" onmouseout="this.src='../images/Get-Answers-Button.gif'" class="img-responsive" style="margin:0 auto; padding:10px 0px;" />
				</a>
			</div>
		</div>
	</div>
	<?php include WEBROOT . 'inc/footer.php'; ?>
	</div><!-- End Surrounding Container -->
	<?php include WEBROOT . 'inc/bottomscripts.php'; ?>
</body>
</html>
