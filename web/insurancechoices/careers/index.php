<?php
include '../inc/top.php';
// Get Categories and Jobs
$careers = $db->query('SELECT * FROM `careers` WHERE `active` = "Y" ORDER BY `listing_date` DESC');
?>
<!doctype html>
<html lang="en-US">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">

	<title>Careers | The Insurance Market</title>

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
    <h1 class="subpage-hl">Career Opportunities</h1>
</div>
<div class="subpage-main-content">
    <div class="marg-wrap">
        <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12">
                <div class="pro-com-blurb">
                    <p><span class="special-green-span">The Insurance Market's Current Career Opportunities</span><br />Apply for the available positions below</p><br />
                </div>
            </div>
        </div>
        <?php
        foreach ($careers as $key => $c) {
            // check for scroll
            if (getid($_GET['job']) == $c['id']) {
                $popup['career_id'] = $c['id'];
            }
            echo '<div class="staff-boxes' . ($key % 2 != 0 ? ' staff-alt-box' : '') . ' "id="career_' . $c['id'] . '">
                <div class="col-sm-8">
                    <h2><strong>' . $c['name'] . '</strong></h2>
                    </div>
                    <div class="col-sm-4">
                        <h5 class="text-right">
                            ';
                            switch($c['type']) {
                                case 'F': echo 'Full-Time'; break;
                                case 'P': echo 'Part-Time'; break;
                                case 'T': echo 'Temporary'; break;
                                case 'S': echo 'Seasonal'; break;
                            }
                            echo '
                        </h5>
                    </div>
                <div class="col-xs-12 text-left-imp">
                    ' . ( trim($c['description']) != '' ? $c['description'] : '' ) . '
                    <hr />
                </div>
                <div class="col-sm-8 desktop-right mobile-center">
                    <small>
                        Please email your resume to <a onmousedown="record_event(\'Application\',\'Email Resume\',\'' . $c['name'] . '\',\'1\');" href="mailto:jsmith@insurancechoices.com?subject=[The Insurance Market] Resume - ' . $c['name'] . '" >jsmith@insurancechoices.com</a>
                    </small>
                </div>
                <div class="col-sm-4">
                    <a onmousedown="record_event(\'Application\',\'Started\',\'' . $c['name'] . '\');" href="' . WEBURLROOT . 'careers/application/?pid=' . $c['id'] . '" class="btn btn-success btn-block">Apply Online <span class="glyphicon glyphicon-triangle-right"></span></a>
                </div>
            </div>';
        }
        ?>
    </div>
</div>
<div class="marg-top"></div>
<!-- Footer -->
<?php include WEBROOT . 'inc/footer.php';?>
<?php include WEBROOT . 'inc/bottomscripts.php';?>
<?php
    if(!empty($popup)) {
?>
<script type="text/javascript">
    $(document).ready(function(){
        job_scroll = true;
        $('#career_<?php echo $popup['career_id']; ?>').scrollView();
    });
</script>
<?php
    }
?>
</div><!-- Main Container Ends -->
</body>
</html>
