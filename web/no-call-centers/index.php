<?php
    $agent_name = 'Jones Insurance';
    $agent_logo = 'Jones-Insurance-logo.png';
    $corp_logo = 'Donegal-Co-Op-logo.jpg';
    $corp_name = 'Donegal Insurance Group';
    $corp_website = 'https://www.donegalgroup.com/';
    $phone = '1-717-867-5309';
    $agent_email = 'jones@jonesinsurance.com';
    $agent_send_message_link = '';
    if (empty($agent_send_message_link)){
        $agent_send_message_link = "mailto:$agent_email";
    };
    $agent_website = 'http://www.jonesins.com';
    $agent_quote_link = 'http://www.jonesins.com/quote/';
    $ga_action = 'Commercial';
    function clean_single_quotes($str) {
        return addcslashes($str, "'");
    };
?>
<!doctype html>
<html lang="en-US">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title><?php echo $agent_name ?> - Visit Us Today!</title>
<link href="https://fonts.googleapis.com/css?family=Montserrat|Muli" rel="stylesheet">
<link href="https://fonts.googleapis.com/css?family=Montserrat:500" rel="stylesheet">
<link href="lib/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
<link href="lib/css/reset.css" rel="stylesheet" type="text/css" />
<link href="lib/css/custom.css" rel="stylesheet" type="text/css" />
<?php include '../../../inc/ga.php'; ?>
</head>

<body>
<!-- Main Container -->
<div class="site-wrap">
<!-- Header -->
    <header>
        <div class="marg-wrap">
            <div class="row">
                <div class="col-md-4 text-center">
                    <a href="<?php echo $agent_website ?>" onclick="record_event('Visit Agent Site','<?php echo $ga_action; ?>','<?php echo clean_single_quotes($agent_name); ?>','1');"><img src="lib/images/<?php echo $agent_logo ?>" class="swi" alt="<?php echo $agent_name ?>"/></a>
                </div>
                <div class="col-md-4"></div>
                <div class="col-md-4 text-center">
                    <a href="<?php echo $corp_website ?>" onclick="record_event('Visit Corporate Site','<?php echo $ga_action; ?>','<?php echo clean_single_quotes($corp_name); ?>','1');"><img src="lib/images/<?php echo $corp_logo ?>" class="dco" alt="<?php echo $corp_name ?>"/></a>
                </div>
            </div>
        </div>
    </header>
    <div id="hero-img" class="banner">
        <h1 class="hl-align personal text-center hidden-xs"><img src="lib/images/no-call-center-hl.png" alt="No Call Centers" class="img-responsive max-width-hl hidden-xs" /></h1>
        <h1 class="hl-align personal text-center visible-xs"><img src="lib/images/no-call-center-hl-sm.png" alt="No Call Centers" class="img-responsive max-width-hl visible-xs" /></h1>
    </div>
    <!-- Body Scroll Wrap -->
    <div id="body-scroll-wrap">
    <!-- Headline/Image Content -->
        <div class="marg-wrap">
             <div class="row">
                <div class="col-md-12">
                </div>
            </div>
        </div>
        <!-- Split Body Content -->
        <div id="main-content">
            <div class="marg-wrap">
                <div class="row">
                    <div class="col-md-12 text-block">
                        <div class="row">
                            <div class="col-md-3">
                                <img src="lib/images/Donegal House.jpg" alt="Generic Home" class="onethird-img img-responsive" />
                            </div>
                            <div class="col-md-9">
                                    <p>At <?php echo $agent_name ?> we deliver quality local service and money-saving options for auto, home and business insurance. Outstanding service and savings, that’s <?php echo $agent_name ?>.</p>
                                    <ul>
                                        <li><span class="bold">Local Service</span> - no call centers</li>
                                        <li><span class="bold">Save Money</span> - quality insurance at a great price</li>
                                        <li><span class="bold">Options</span> - we know a variety of companies and their coverages which means more options for you</li>
                                    </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
<!-- Footer -->
    <footer>
        <div class="marg-wrap">
            <div class="row">
                <div class="col-md-3 col-xs-3">
                    <a href="tel:<?php echo $phone ?>" onclick="record_event('Call','<?php echo $ga_action; ?>','<?php echo clean_single_quotes($agent_name); ?>','1');" class="btn btn-default btn-block button phone"><img class="button-icon" src="lib/images/call-us.png" alt="Call Us - <?php echo $phone ?>" /><p>Call<span class="hidden-xs"> Us At <?php echo $phone ?></span></p></a>
                </div>
                <div class="col-md-3 col-xs-3">
                    <a href="<?php echo $agent_send_message_link ?>" onclick="record_event('Start Message','<?php echo $ga_action; ?>','<?php echo clean_single_quotes($agent_name); ?>','1');" class="btn btn-default btn-block button email"><img class="button-icon" src="lib/images/email-us.png" alt="Send Us A Message!" /><p><span class="hidden-xs">Send Us A </span>Message</p></a>
                </div>
                <div class="col-md-3 col-xs-3">
                    <a href="<?php echo $agent_website ?>" onclick="record_event('Visit Agent Site','<?php echo $ga_action; ?>','<?php echo clean_single_quotes($agent_name); ?>','1');" class="btn btn-default btn-block button visit"><img class="button-icon" src="lib/images/visit-us.png" alt="Visit Us!" /><p>Visit Us<span class="hidden-xs"> Online</span></p></a>
                </div>
                <div class="col-md-3 col-xs-3">
                    <a href="<?php echo $agent_quote_link ?>" onclick="record_event('Start Quote','<?php echo $ga_action; ?>','<?php echo clean_single_quotes($agent_name); ?>','1');" class="btn btn-default btn-block button quote"><img class="button-icon" src="lib/images/quote.png" alt="Request A Quote" /><p><span class="hidden-xs">Request A </span>Quote</p></a>
                </div>
            </div>
        </div>
    </footer>
</div>
<!-- Main Container Ends -->
</body>
</html>
