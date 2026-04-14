<?php
include 'inc/top.php';
?>

<!doctype html>
<html lang="en-US">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<title>404 Error | The Insurance Market </title>

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
<div class="headline-grey-content">
    <div class="marg-wrap">
        <div class="row">
            <div class="col-lg-12">
                <div class="headline-container">
					<h2>404 Error</h2>
					<p>The page you were looking for was moved or doesn't exist.</p>
					<button class="button404" onclick="goBack()"><h4>Click Here To Go Back</h4></button>
					<script>
						function goBack() {
						    window.history.back();
						}
					</script>
                </div>
            </div>
        </div>
    </div>
</div>

<?php include WEBROOT . 'inc/location-info.php';?>
<!-- Footer -->
<?php include WEBROOT . 'inc/footer.php';?>
<?php include WEBROOT . 'inc/bottomscripts.php';?>

</div><!-- Main Container Ends -->
</body>
</html>
