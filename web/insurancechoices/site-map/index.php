<?php include '../inc/top.php';?>
<!doctype html>
<html lang="en-US">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="With offices in Laurel, Milford, Millsboro, Rehoboth, &  Salisbury, we make it easy to work one-on-one with an agent who can match you with great insurance for a great price.">

	<title>Contact Us | The Insurance Market</title>

	<?php
	include WEBROOT . 'inc/topscripts.php';
	include WEBROOT . 'inc/ga.php';
	?>
</head>

<body>
<div class="site-wrap"><!-- Main Container -->
<?php include WEBROOT . 'inc/nav.php';?>
<!-- Header -->
<?php include WEBROOT . 'inc/header.php';?>

<!-- Content -->
<div class="subpage-banner">
    <h1 class="subpage-hl">Site Map</h1>
</div>
<div class="subpage-main-content">
    <div class="marg-wrap">
        <div class="row">
            <div class="col-lg-4 col-md-4 col-sm-6">
                <ul class="site-map">
                    <li><a href="<?php echo WEBURLROOT; ?>index.php">Home</a></li>
                    <li class="dropdown sitemap-linkpad">Personal Insurance</li>
                    <li><a href="<?php echo WEBURLROOT; ?>products/home-insurance/">Homeowners &amp; Renters</a></li>
                    <li><a href="<?php echo WEBURLROOT; ?>products/auto-insurance/">Auto</a></li>
                    <li><a href="<?php echo WEBURLROOT; ?>products/health-insurance/">Health</a></li>
                    <li><a href="<?php echo WEBURLROOT; ?>products/life-insurance/">Life</a></li>
                </ul>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6">
                <ul class="site-map">
                    <li class="dropdown">Commercial Insurance</li>
                    <li><a href="<?php echo WEBURLROOT; ?>commercial-products/for-employees/">Coverage For Employees</a></li>
                    <li><a href="<?php echo WEBURLROOT; ?>commercial-products/liability/">Liability</a></li>
                    <li><a href="<?php echo WEBURLROOT; ?>commercial-products/property-auto/">Property &amp; Auto</a></li>
                    <li><a href="<?php echo WEBURLROOT; ?>commercial-products/workers-comp/">Workers' Comp</a></li>
                    <li><a href="<?php echo WEBURLROOT; ?>commercial-products/farm-insurance/">Farm</a></li>
                    <li class="sitemap-linkpad"><a href="<?php echo WEBURLROOT; ?>about-us/">About Us</a></li>
                    <li><a href="<?php echo WEBURLROOT; ?>contact-us/">Contact Us</a></li>
                    <li><a href="<?php echo WEBURLROOT; ?>request-consultation/"><i class="fa fa-file-text" aria-hidden="true" style="margin-right:10px;"></i>Request Consultation</a></li>
                </ul>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-6">
                <ul class="site-map">
                    <li><a href="<?php echo WEBURLROOT; ?>privacy/">Privacy</a></li>
                        <li><a href="<?php echo WEBURLROOT; ?>site-map/">Site Map</a></li>
                </ul>
            </div>
        </div>
    </div>
</div>
<!-- Footer -->
<?php include WEBROOT . 'inc/footer.php';?>
<?php include WEBROOT . 'inc/bottomscripts.php';?>
</div><!-- Main Container Ends -->
</body>
</html>
