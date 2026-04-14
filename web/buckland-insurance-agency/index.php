<?php
    include 'lib/inc/top.php';
    include WEBROOT . 'lib/inc/quote_request_submit.php';

    $agent_name = 'Buckland Insurance Agency, Inc.';
    $agent_logo = 'Buckland-Insurance-Agency.png';
    $corp_logo = 'Michigan-Insurance-Company-Logo.png';
    $corp_name = 'Michigan Insurance Company';
    $corp_website = 'https://www.michiganinsurance.com/';
    $phone = '1-269-623-5115';
    $agent_email = 'info@bucklandinsurance.com,jennym@bucklandinsurance.com';
    $agent_send_message_link = '';
    if (empty($agent_send_message_link)){
        $agent_send_message_link = "mailto:$agent_email";
    };
    $agent_website = 'http://bucklandinsurance.com/';
    //$agent_quote_link = 'http://bucklandinsurance.com/contact-us/';
    $ga_action = 'Personal';
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
<?php include WEBROOT . 'lib/inc/topscripts.php';?>
<?php include '../inc/ga.php'; ?>
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
    <div class="hero-img banner">
        <h1 class="hl-align personal text-center">Discover The Power Of Choice!</h1>
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
                            <div class="col-md-8">
                                <p>When you work with an independent insurance agent like <?php echo $agent_name ?> for your auto and home insurance, you put the power of choice to work for you. <?php echo $agent_name ?> knows a variety of insurance companies and their coverages, which means more options for you. And because we work with outstanding companies like <?php echo $corp_name ?>, you get quality insurance at a great price.</p>
                                <ul>
                                    <li>Helps Protect Your Assets</li>
                                    <li>Friendly Service</li>
                                    <li>Saves You Money</li>
                                </ul>
                                <p>Let <?php echo $agent_name ?> help you discover the power of choice!</p>
                            </div>
                            <div class="col-md-4">
                                <img src="lib/images/insurance-home-auto.jpg" alt="Home And Auto Insurance" class="onethird-img img-responsive img-thumbnail" />
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
                    <a href="javascript:void(0)" data-toggle="modal" data-target="#modal-quote" onclick="record_event('Start Quote','<?php echo $ga_action; ?>','<?php echo clean_single_quotes($agent_name); ?>,'1');" class="btn btn-default btn-block button quote"><img class="button-icon" src="lib/images/quote.png" alt="Request A Quote" /><p><span class="hidden-xs">Request A </span>Quote</p></a>
                </div>
            </div>
        </div>
    </footer>
</div><!-- Main Container Ends -->
<div id="modal-quote" class="modal fade" role="dialog">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Request A Quote</h4>
            </div>
            <div class="modal-body">
                <form data-quote-form="">
                    <div class="form form-default form-quote">
                        <div class="form-body">
                            <p><small>ALL FIELDS REQUIRED</small></p>
                            <div class="row">
                                <div class="col-sm-4">
                                    <div class="form-group">
                                        <label for="quoteName" class="sr-only">Name</label>
                                        <input type="text" class="form-control" name="quoteName" id="quoteName" placeholder="Enter Name">
                                    </div>
                                    <div class="form-group">
                                        <label for="quotePhone" class="sr-only">Phone</label>
                                        <input type="text" class="form-control" name="quotePhone" id="quotePhone" placeholder="Enter Phone Number">
                                    </div>
                                    <div class="form-group">
                                        <label for="quoteEmail" class="sr-only">Email</label>
                                        <input type="email" class="form-control" name="quoteEmail" id="quoteEmail" placeholder="Enter Email Address">
                                    </div>
                                </div>
                                <div class="col-sm-4 col-md-3">
                                    <h3 style="margin-top: -10px;">I am interested in a quote for...</h3>
                                    <label class="control-label"><input type="checkbox" name="quote_options[]" value="Commercial Insurance"> Commercial Insurance</label><br />
                                    <label class="control-label"><input type="checkbox" name="quote_options[]" value="Life / Disability / Annuitiese"> Life / Disability / Annuities</label><br />
                                    <label class="control-label" style="margin-bottom: 30px;"><input type="checkbox" name="quote_options[]" value="Personal Insurance" checked="checked"> Personal Insurance</label><br />
                                </div>
                                <div class="col-sm-4 col-md-5">
                                    <div class="form-group">
                                        <label for="quoteMessage" class="sr-only">Message</label>
                                        <textarea class="form-control" name="quoteMessage" id="quoteMessage" placeholder="Enter Message" rows="10"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-footer">
                            <button type="submit" class="btn btn-block btn-lg btn-contact" id="white" data-loading-text="Sending...">Submit Request</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
<?php include WEBROOT . 'lib/inc/bottomscripts.php'; ?>
<?php include WEBROOT . 'lib/inc/quote_request_script.php'; ?>
</body>
</html>
