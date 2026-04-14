<?php
include '../../inc/top.php';

$loc = array(
    array(
        'anchor' => 'laurel',
        'name' => 'Laurel',
        'location' => '310 N. Central Avenue<br>Laurel, DE 19956',
        'directions' => 'https://www.google.com/maps/dir//310+N+Central+Ave,+Laurel,+DE+19956/@38.558641,-75.5740711,17z/data=!3m1!4b1!4m8!4m7!1m0!1m5!1m1!1s0x89b8faf7986f7105:0xf9f49950e3f26eaf!2m2!1d-75.5718824!2d38.5586368',
        'staff' => array(
            array(
                'name' => 'James J. Hartstein, CIC',
                'title' => 'Agency Principal * Certified Insurance Counselor',
                'office' => '',
                'mobile' => '',
                'fax' => '',
                'email' => 'jhartstein@insurancechoices.com',
                'img' => 'JimHartstein.jpg'
            ),
            array(
                'name' => 'Stephen M. Hartstein, CIC',
                'title' => 'Agency Principal * Certified Insurance Counselor',
                'office' => '',
                'mobile' => '',
                'fax' => '',
                'email' => 'shartstein@insurancechoices.com',
                'img' => 'SteveHartstein.jpg'
            ),
            array(
                'name' => 'Jill Smith, RHU',
                'title' => 'Operations Manager',
                'office' => '302-715-0194',
                'fax' => '302-875-7541',
                'email' => 'jsmith@insurancechoices.com'
            ),
            array(
                'name' => 'Andy Hartstein, Principal, CIC',
                'title' => 'Certified Insurance Counselor (CIC)',
                'office' => '302-280-3065',
                'mobile' => '302-381-0975',
                'fax' => '302-875-7541',
                'email' => 'ahartstein@insurancechoices.com',
                'img' => 'AndyHartstein.jpg'
            ),
            array(
                'name' => 'Terri L. Moore, CIC, CISR',
                'title' => 'Commercial Lines Supervisor / Certified Insurance Counselor (CIC) - Certified Insurance Service Representative (CISR)',
                'office' => '302-280-3062',
                'fax' => '302-875-7541',
                'email' => 'tmoore@insurancechoices.com',
                'img' => 'TerriMoore.jpg'
            ),
            array(
                'name' => 'Shelly Marino, CISR',
                'title' => 'Personal Lines Supervisor - Certifed Insurance Service Representative (CISR)',
                'office' => '302-280-3068',
                'fax' => '302-875-7541',
                'email' => 'smarino@insurancechoices.com',
                'img' => 'ShellyMarino.jpg'
            ),
            array(
                'name' => 'Mark S. Rubino, CIC',
                'title' => 'Certified Insurance Counselor (CIC)',
                'office' => '302-280-3072',
                'mobile' => '302-542-3180',
                'fax' => '302-875-7541',
                'email' => 'mrubino@insurancechoices.com',
                'img' => 'MarkRubino.jpg'
            ),
            array(
                'name' => 'Dawn Collins',
                'title' => 'Manager - Accounting Department',
                'office' => '302-875-8303',
                'fax' => '302-875-7541',
                'email' => 'dcollins@insurancechoices.com',
                'img' => 'DawnCollins.jpg'
            ),
            array(
                'name' => 'Janet Morgan, CISR',
                'title' => 'Senior Account Manager - Certified Insurance Service Representative (CISR)',
                'office' => '302-280-3063',
                'fax' => '302-875-7541',
                'email' => 'jamorgan@insurancechoices.com',
                'img' => 'JanetMorgan.jpg'
            ),
            array(
                'name' => 'Sherry Pusey, CISR',
                'title' => 'Manager Claims Department - Certified Insurance Service Representative (CISR)',
                'office' => '302-280-3073',
                'fax' => '302-875-7541',
                'email' => 'spusey@insurancechoices.com',
                'img' => 'SherryPusey.jpg'
            ),
            array(
                'name' => 'Ashley Griffith, CISR',
                'title' => 'Certified Insurance Service Representative (CISR)',
                'office' => '302-280-3070',
                'fax' => '302-875-7541',
                'email' => 'agriffith@insurancechoices.com',
                'img' => 'AshleyGriffith.jpg'
            ),
            array(
                'name' => 'Lisa Hastings, CISR',
                'title' => 'Certified Insurance Service Representative - Accounting Department Specialist',
                'office' => '302-280-3066',
                'fax' => '302-875-7541',
                'email' => 'lhastings@insurancechoices.com',
                'img' => 'LisaHastings.jpg'
            ),
            /*
            array(
                'name' => 'Kelly Smith',
                'title' => 'Customer Service Agent',
                'office' => '302-715-0194',
                'fax' => '302-875-7541',
                'email' => 'ksmith@insurancechoices.com',
                'img' => 'KellySmith.jpg'
            ),
            */
            array(
                'name' => 'Jessica Parrott',
                'title' => 'Customer Service Agent',
                'office' => '302-280-3061',
                'fax' => '302-875-7541',
                'email' => 'jparrott@insurancechoices.com',
                'img' => 'JessicaParrot.jpg'
            ),
            /*
            array(
                'name' => 'Crystal Caldwell',
                'title' => 'Financial Services',
                'office' => '302-280-3058',
                'fax' => '302-875-7541',
                'email' => 'ccaldwell@insurancechoices.com',
                'img' => 'CrystalCaldwell.png'
            ),
            */
            array(
                'name' => 'Valerie Johnson',
                'title' => 'Receptionist',
                'office' => '302-875-7591',
                'fax' => '302-875-7541',
                'email' => 'vjohnson@insurancechoices.com',
                'img' => 'ValerieJohnson.png'
            ),
            array(
                'name' => 'Bree Williams',
                'title' => 'Claim Assistant',
                'office' => '302-280-3060',
                'email' => 'bwilliams@insurancechoices.com',
                'img' => 'bree-williams.jpg'
            ),
            array(
                'name' => 'Sharon Melone',
                'title' => 'Personal Lines Agent',
                'office' => '302-280-3067',
                'email' => 'smelone@insurancechoices.com',
                'img' => 'sharon-melone.jpg'
            ),
            array(
                'name' => 'Debbie Long',
                'title' => 'Personal Lines Agent',
                'office' => '302-280-3059',
                'fax' => '302-875-7541',
                'email' => 'dlong@insurancechoices.com',
                'img' => 'debbie-long.jpg'
            ),
            array(
                'name' => 'Jordan Malone',
                'title' => 'Commercial Lines Assistant',
                'office' => '302-280-3066',
                'fax' => '302-875-7541',
                'email' => 'jmalone@insurancechoices.com',
                'img' => 'jordan-malone.jpg'
            ),
            array(
                'name' => 'Ashley Harris',
                'title' => 'Commercial Lines Assistant',
                'office' => '302-280-3069',
                'fax' => '302-875-7541',
                'email' => 'aharris@insurancechoices.com',
                'img' => 'ashley-harris.jpg'
            )
        )
    ),
    array(
        'anchor' => 'milford',
        'name' => 'Milford',
        'location' => '15 North Walnut Street<br>Milford, DE 19963',
        'directions' => 'https://www.google.com/maps/dir//15+N+Walnut+St,+Milford,+DE+19963/@38.9137542,-75.4301747,17z/data=!4m16!1m7!3m6!1s0x89b899f3fcdca0a1:0xe9f8ac03ddbb4568!2s15+N+Walnut+St,+Milford,+DE+19963!3b1!8m2!3d38.91375!4d-75.427986!4m7!1m0!1m5!1m1!1s0x89b899f3fcdca0a1:0xe9f8ac03ddbb4568!2m2!1d-75.427986!2d38.91375',
        'staff' => array(
            array(
                'name' => 'Scott Ward',
                'title' => 'All Lines Producer',
                'office' => '302-422-2558',
                'mobile' => '302-258-3675',
                'fax' => '302-422-9687',
                'email' => 'sward@insurancechoices.com',
                'img' => 'ScottWard.jpg'
            ),
            array(
                'name' => 'Amanda Melvin, CISR',
                'title' => 'Certified Insurance Service Representative (CISR)',
                'office' => '302-422-2558',
                'fax' => '302-422-9687',
                'email' => 'amelvin@inurancechoices.com',
                'img' => 'AmandaMelvin.jpg'
            ),
            array(
                'name' => 'Alisha McManus, AAI',
                'title' => 'Accredited Adviser in Insurance (AAI)',
                'office' => '302-422-2558',
                'fax' => '302-422-9687',
                'email' => 'amcmanus@insurancechoices.com',
                'img' => 'AlishaMcManus.jpg'
            ),
            array(
                'name' => 'Donna Hoffman',
                'title' => 'Customer Service Agent',
                'office' => '302-422-2558',
                'fax' => '302-422-9687',
                'email' => 'dhoffman@insurancechoices.com',
                'img' => 'DonnaHoffman.jpg'
            ),
            array(
                'name' => 'Shirley Lane, CISR',
                'title' => 'Certifed Insurance Service Representative (CISR)',
                'office' => '302-422-2558',
                'fax' => '302-422-9687',
                'email' => 'slane@insurancechoices.com',
                'img' => 'ShirleyLane.jpg'
                )
            )
        ),
        array(
            'anchor' => 'millsboro',
            'name' => 'Millsboro',
            'location' => '117 Main Street Unit 1<br>Millsboro, DE 19963',
            'directions' => 'https://www.google.com/maps/dir//117+Main+St+%231,+Millsboro,+DE+19966/@38.5922827,-75.3278481,13.31z/data=!4m8!4m7!1m0!1m5!1m1!1s0x89b8c3021a342621:0x7c24a021fc8f4617!2m2!1d-75.2935057!2d38.5884896',
            'staff' => array(
                array(
                    'name' => 'Stephen James Hartstein, Principal, CIC',
                    'title' => 'Certified Insurance Counselor (CIC)',
                    'office' => '302-934-5552',
                    'mobile' => '302-381-0612',
                    'fax' => '302-934-9137',
                    'email' => 'sjhartstein@insurancechoices.com',
                    'img' => 'StephenHartstein.jpg'
                ),
                array(
                    'name' => 'Dean R. Rubino, CIC',
                    'title' => 'Certified Insurance Counselor (CIC)',
                    'office' => '302-934-6880',
                    'mobile' => '302-381-2717',
                    'fax' => '302-934-9137',
                    'email' => 'drubino@insurancechoices.com',
                    'img' => 'DeanRubino.jpg'
                ),
                array(
                    'name' => 'Kevin Rodgers',
                    'title' => 'All Lines Producer',
                    'office' => '302-663-0883',
                    'mobile' => '302-245-8905',
                    'fax' => '302-934-9137',
                    'email' => 'krodgers@insurancechoices.com',
                    'img' => 'KevinRodgers.jpg'
                ),
                array(
                    'name' => 'Bruce Marine',
                    'title' => 'All Lines Producer',
                    'office' => '302-227-4726',
                    'mobile' => '302-542-5389',
                    'fax' => '302-227-0275',
                    'email' => 'bmarine@insurancechoices.com',
                    'img' => 'BruceMarine.jpg'
                ),
                array(
                    'name' => 'Heather Bailey, CISR',
                    'title' => 'Certified Insurance Service Representative (CISR)',
                    'office' => '302-280-3064',
                    'fax' => '302-875-7541',
                    'email' => 'hbailey@insurancechoices.com',
                    'img' => 'HeatherBailey.jpg'
                ),
                array(
                    'name' => 'Julie McCaffrey, CISR',
                    'title' => 'Certified Insurance Service Representative (CISR)',
                    'office' => '302-663-0882',
                    'fax' => '302-934-9137',
                    'email' => 'jmccaffrey@insurancechoices.com',
                    'img' => 'JulieMcCaffrey.jpg'
                ),
                array(
                    'name' => 'Susan Blades',
                    'title' => 'Personal Lines Agent',
                    'office' => '302-663-0885',
                    'email' => 'sblades@insurancechoices.com',
                    'img' => 'sblades.jpg'
                ),
            )
        ),
        array(
            'anchor' => 'salisbury',
            'name' => 'Salisbury',
            'location' => '109 Poplar Hill Avenue<br>Salisbury, MD 21801',
            'directions' => 'https://www.google.com/maps/dir//109+Poplar+Hill+Ave,+Salisbury,+MD+21801/@38.3669397,-75.5990812,17z/data=!4m16!1m7!3m6!1s0x89b903bf84487927:0xc81053d261c6c703!2s109+Poplar+Hill+Ave,+Salisbury,+MD+21801!3b1!8m2!3d38.3668993!4d-75.5970586!4m7!1m0!1m5!1m1!1s0x89b903bf84487927:0xc81053d261c6c703!2m2!1d-75.5968925!2d38.3669397',
            'staff' => array(
                array(
                    'name' => 'Jim W. Hartstein, Principal, CIC, CRM',
                    'title' => 'Certified Insurance Counselor (CIC) Certified Risk Manager (CRM)',
                    'office' => '443-736-3419',
                    'mobile' => '302-381-0977',
                    'fax' => '443-944-9683',
                    'email' => 'jwhartstein@insurancechoices.com',
                    'img' => 'JimHartstein-Sals.jpg'
                ),
                array(
                    'name' => 'Kelly Johnston, CIC',
                    'title' => 'Senior Account Manager / Certified Insurance Counselor (CIC)',
                    'office' => '443-944-0195 x30238',
                    'fax' => '443-944-9683',
                    'email' => 'kjohnston@insurancechoices.com',
                    'img' => 'KellyJohnston.jpg'
                ),
                array(
                    'name' => 'Roger Waters',
                    'title' => 'All Lines Producer',
                    'office' => '443-736-3426',
                    'mobile' => '302-531-6735',
                    'fax' => '443-944-9683',
                    'email' => 'rwaters@insurancechoices.com',
                    'img' => 'RogerWaters.jpg'
                ),
                array(
                    'name' => 'Joe Corona, CIC',
                    'title' => 'Marketing Department',
                    'office' => '443-736-3361',
                    'mobile' => '302-381-2380',
                    'fax' => '443-944-9683',
                    'email' => 'jcorona@insurancechoices.com',
                    'img' => 'JoeCorona.jpg'
                ),
                array(
                    'name' => 'Stephanie James',
                    'title' => 'Marketing Department',
                    'office' => '443-944-0180',
                    'fax' => '443-944-9683',
                    'email' => 'sjames@insurancechoices.com',
                    'img' => 'StephanieJames.jpg'
                ),
                array(
                    'name' => 'Don Roos',
                    'title' => 'Commercial Lines Producer',
                    'office' => '443-736-3419',
                    'fax' => '443-944-9683',
                    'email' => 'droos@insurancechoices.com',
                    'img' => 'DonRoos.png'
                )
            )
        ),
    );
?>
<!doctype html>
<html lang="en-US">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Our staff of insurance service specialists at The Insurance Market can help you find the insurance service that fits your needs.">
	<title>Meet Our Team of Experts - The Insurance Market</title>

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
    <h1 class="subpage-hl">Meet Our Team of Experts</h1>
</div>
<div class="subpage-main-content">
    <div class="marg-wrap">
        <div class="row">
            <div class="col-md-12 anchor-nav">
                <p style="margin-bottom:20px;">Choose your location:</p>
                <ul style="list-style:none; margin-left:0px;">
                    <li><a href="#laurel">Laurel Office</a></li>
                    <li><a href="#milford">Milford Office</a></li>
                    <li><a href="#millsboro">Millsboro Office</a></li>
                    <li><a href="#salisbury">Salisbury Office</a></li>
                </ul>
            </div>
        </div>
        <div class="row">
            <?php
            foreach($loc as $l){
                echo (!empty($l['anchor']) ? '<a name="' . $l['anchor'] . '"></a>' : '' );
                echo '<h2><br>' . $l['name'] . ' Office</h2><hr>';
                $class = 'staff-boxes';
                foreach($l['staff'] as $key => $s){
                    echo '
                    <div class="staff-boxes' . ($key % 2 != 0 ? ' staff-alt-box' : '') . '">
                        <div class="col-md-3">
                            ' . (!empty($s['img']) ? '<img src="' . WEBURLROOT . 'images/staff-imgs/' . $s['img'] . '" alt="' . $s['name'] . '" class="staff-imgs" />' : '' ) . '
                        </div>
                        <div class="col-md-3">
                            ' . (!empty($s['name']) ? '<p class="staff-names">' . $s['name'] . '</p>' : '' ) . '
                            ' . (!empty($s['title']) ? '<p class="staff-position">' . $s['title'] . '</p>' : '' ) . '
                        </div>
                        <div class="col-md-3">
                            ' . (!empty($s['office']) ? '<p><span class="bolder">Office: </span>' . $s['office'] . '</p>' : '' ) . '
                            ' . (!empty($s['mobile']) ? '<p><span class="bolder">Mobile: </span>' . $s['mobile'] . '</p>' : '' ) . '
                            ' . (!empty($s['fax']) ? '<p><span class="bolder">Fax: </span>' . $s['fax'] . '</p>' : '' ) . '
                            ' . (!empty($s['email']) ? '<br><p><span class="bolder">Email Me: </span></p>
                            <a href="mailto:' . $s['email'] . '">' . $s['email'] . '</a>' : '' ) . '
                        </div>
                        <div class="col-md-3">
                            ' . (!empty($l['location']) ? '<img src="' . WEBURLROOT . 'images/map-marker.png" alt="Map Marker" class="staff-map-marker" />
                            <p>' . $l['location'] . '</p><br/> ' : '' ) . '
                            ' . (!empty($l['directions']) ? '<a href="' . $l['directions'] .'" target="_blank">Get Directions >></a>' : '' ) . '
                        </div>
                    </div>
                    ';
                }
            }
            ?>
            <!-- Page/Wrap/Row Closers-->
        </div>
    </div>
</div>
<div class="marg-top"></div>
<?php include WEBROOT . 'inc/location-info.php';?>
<!-- Footer -->
<?php include WEBROOT . 'inc/footer.php';?>
<?php include WEBROOT . 'inc/bottomscripts.php';?>
</div><!-- Main Container Ends -->
</body>
</html>
