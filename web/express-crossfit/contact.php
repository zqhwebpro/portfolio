<?php

$yourEmail = "train@expresscrossfit.com"; // the email address you wish to receive these mails through
$yourWebsite = "www.zqhwebpro.com/portfolio/web/expresscrossfit"; // the name of your website
$thanksPage = ''; // URL to 'thanks for sending mail' page; leave empty to keep message on the same page
$maxPoints = 4; // max points a person can hit before it refuses to submit - recommend 4
$requiredFields = "fname,lname,email,comments"; // names of the fields you'd like to be required as a minimum, separate each field with a comma


// DO NOT EDIT BELOW HERE
$error_msg = array();
$result = null;

$requiredFields = explode(",", $requiredFields);

function clean($data) {
    $data = trim(stripslashes(strip_tags($data)));
    return $data;
}
function isBot() {
    $bots = array("Indy", "Blaiz", "Java", "libwww-perl", "Python", "OutfoxBot", "User-Agent", "PycURL", "AlphaServer", "T8Abot", "Syntryx", "WinHttp", "WebBandit", "nicebot", "Teoma", "alexa", "froogle", "inktomi", "looksmart", "URL_Spider_SQL", "Firefly", "NationalDirectory", "Ask Jeeves", "TECNOSEEK", "InfoSeek", "WebFindBot", "girafabot", "crawler", "www.galaxy.com", "Googlebot", "Scooter", "Slurp", "appie", "FAST", "WebBug", "Spade", "ZyBorg", "rabaz");

    foreach ($bots as $bot)
        if (stripos($_SERVER['HTTP_USER_AGENT'], $bot) !== false)
            return true;

    if (empty($_SERVER['HTTP_USER_AGENT']) || $_SERVER['HTTP_USER_AGENT'] == " ")
        return true;

    return false;
}

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    if (isBot() !== false)
        $error_msg[] = "No bots please! UA reported as: ".$_SERVER['HTTP_USER_AGENT'];

    // lets check a few things - not enough to trigger an error on their own, but worth assigning a spam score..
    // score quickly adds up therefore allowing genuine users with 'accidental' score through but cutting out real spam :)
    $points = (int)0;

    $badwords = array("adult", "beastial", "bestial", "blowjob", "clit", "cum", "cunilingus", "cunillingus", "cunnilingus", "cunt", "ejaculate", "fag", "felatio", "fellatio", "fuck", "fuk", "fuks", "gangbang", "gangbanged", "gangbangs", "hotsex", "hardcode", "jism", "jiz", "orgasim", "orgasims", "orgasm", "orgasms", "phonesex", "phuk", "phuq", "pussies", "pussy", "spunk", "xxx", "viagra", "phentermine", "tramadol", "adipex", "advai", "alprazolam", "ambien", "ambian", "amoxicillin", "antivert", "blackjack", "backgammon", "texas", "holdem", "poker", "carisoprodol", "ciara", "ciprofloxacin", "debt", "dating", "porn", "link=", "voyeur", "content-type", "bcc:", "cc:", "document.cookie", "onclick", "onload", "javascript");

    foreach ($badwords as $word)
        if (
            strpos(strtolower($_POST['comments']), $word) !== false ||
            strpos(strtolower($_POST['name']), $word) !== false
        )
            $points += 2;

    if (strpos($_POST['comments'], "http://") !== false || strpos($_POST['comments'], "www.") !== false)
        $points += 2;
    if (isset($_POST['nojs']))
        $points += 1;
    if (preg_match("/(<.*>)/i", $_POST['comments']))
        $points += 2;
    if (strlen($_POST['name']) < 3)
        $points += 1;
    if (strlen($_POST['comments']) < 15 || strlen($_POST['comments'] > 1500))
        $points += 2;
    if (preg_match("/[bcdfghjklmnpqrstvwxyz]{7,}/i", $_POST['comments']))
        $points += 1;
    // end score assignments

    foreach($requiredFields as $field) {
        trim($_POST[$field]);

        if (!isset($_POST[$field]) || empty($_POST[$field]) && array_pop($error_msg) != "Please fill in all the required fields and submit again.\r\n")
            $error_msg[] = "Please fill in all the required fields and submit again.";
    }

    if (!empty($_POST['name']) && !preg_match("/^[a-zA-Z-'\s]*$/", stripslashes($_POST['name'])))
        $error_msg[] = "The name field must not contain special characters.\r\n";
    if (!empty($_POST['email']) && !preg_match('/^([a-z0-9])(([-a-z0-9._])*([a-z0-9]))*\@([a-z0-9])(([a-z0-9-])*([a-z0-9]))+' . '(\.([a-z0-9])([-a-z0-9_-])?([a-z0-9])+)+$/i', strtolower($_POST['email'])))
        $error_msg[] = "That is not a valid e-mail address.\r\n";
    if (!empty($_POST['url']) && !preg_match('/^(http|https):\/\/(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)(:(\d+))?\/?/i', $_POST['url']))
        $error_msg[] = "Invalid website url.\r\n";

    if ($error_msg == NULL && $points <= $maxPoints) {
        $subject = "Automatic Form Email";

        $message = "You received this e-mail message through your website: \n\n";
        foreach ($_POST as $key => $val) {
            if (is_array($val)) {
                foreach ($val as $subval) {
                    $message .= ucwords($key) . ": " . clean($subval) . "\r\n";
                }
            } else {
                $message .= ucwords($key) . ": " . clean($val) . "\r\n";
            }
        }
        $message .= "\r\n";
        $message .= 'IP: '.$_SERVER['REMOTE_ADDR']."\r\n";
        $message .= 'Browser: '.$_SERVER['HTTP_USER_AGENT']."\r\n";
        $message .= 'Points: '.$points;

        if (strstr($_SERVER['SERVER_SOFTWARE'], "Win")) {
            $headers   = "From: $yourEmail\r\n";
        } else {
            $headers   = "From: $yourWebsite <$yourEmail>\r\n";
        }
        $headers  .= "Reply-To: {$_POST['email']}\r\n";

        if (mail($yourEmail,$subject,$message,$headers)) {
            if (!empty($thanksPage)) {
                header("Location: $thanksPage");
                exit;
            } else {
                $result = 'Your mail was successfully sent.';
                $disable = true;
            }
        } else {
            $error_msg[] = 'Your mail could not be sent this time. ['.$points.']';
        }
    } else {
        if (empty($error_msg))
            $error_msg[] = 'Your mail looks too much like spam, and could not be sent this time. ['.$points.']';
    }
}
function get_data($var) {
    if (isset($_POST[$var]))
        echo htmlspecialchars($_POST[$var]);
}
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<meta content="width=device-width, initial-scale=1" name="viewport">
	<title>Express CrossFit: Contact</title>
	<link href="css/styles.css" rel="stylesheet" type="text/css">
	<script src="http://code.jquery.com/jquery-1.9.1.min.js">
	</script>
	<link href='https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300,700' rel='stylesheet' type='text/css'>
	<link href='https://fonts.googleapis.com/css?family=Yantramanav:900' rel='stylesheet' type='text/css'>
	<link href='https://fonts.googleapis.com/css?family=Raleway:400,900' rel='stylesheet' type='text/css'>
	<style>
	       .mobile__button p {
	        display: block;
	        }
	        @media screen and (min-width: 1350px) {
	            .mobile__button p {
	                display: none; } }

	        @media screen and (max-width: 1350px) {
	           #main-nav{
	               display:none;
	           }
	        }

	       .mobile__nav {
	        display: none; }
	        .mobile__nav a {
	            -webkit-transition: 0.2s ease-in-out;
	            -moz-transition: 0.2s ease-in-out;
	            -o-transition: 0.2s ease-in-out;
	            transition: 0.2s ease-in-out; }
	            .mobile__nav a:hover,
	        .mobile__nav a:focus {
	                }
	        @media screen and (min-width: 1350px) {
	            .mobile__nav {
	                display: none; } }
	</style>
	<style type="text/css">
	       p.error, p.success {
	           font-weight: bold;
	           padding: 10px;
	           border: 1px solid;
	       }
	       p.error {
	           background: #ffc0c0;
	           color: #900;
	       }
	       p.success {
	           background: #b3ff69;
	           color: #4fa000;
	       }
	</style>
</head>
<body>
  <div class="wrap">
	<div class="group" id="header_group">
		<div class="grid_2_of_6"><img alt="Express Crossfit - Get Built" id="ec_headerlogo" src="img/expressfit.png"></div>
		<div class="grid_4_of_6" id="address_group">
			<p class="f_r_8">7018 E. Road. • York, PA</p><br>
			<div class="marg_bot_sm"></div>
			<p class="f_r_8"><a href="tel:717-854-4831">717-854-4831</a></p>
		</div>
	</div>
	<nav class="group" id="ec_nav">
		<div class="grid_6_of_6" id="main-nav">
			<ul>
				<li>
					<a href="index.html">HOME</a>
				</li>
				<li>
					<a href="about.html">ABOUT</a>
				</li>
				<li>
					<a href="trainers.html">TRAINERS</a>
				</li>
				<li>
					<a href="membership.html">MEMBERSHIP</a>
				</li>
				<li>
					<a href="schedule.html">SCHEDULE</a>
				</li>
				<li>
					<a href="contact.php">CONTACT</a>
				</li>
			</ul>
		</div>
		<div class="mobile-nav">
			<div class="mobile__button">
				<p>Menu <span>☰</span></p>
			</div>
			<nav class="mobile__nav">
				<ul>
					<li>
						<a href="index.html">HOME</a>
					</li>
					<li>
						<a href="about.html">ABOUT</a>
					</li>
					<li>
						<a href="trainers.html">TRAINERS</a>
					</li>
					<li>
						<a href="membership.html">MEMBERSHIP</a>
					</li>
					<li>
						<a href="schedule.html">SCHEDULE</a>
					</li>
					<li>
						<a href="contact.php">CONTACT</a>
					</li>
				</ul>
			</nav>
		</div>
	</nav>
		<div class="content_group">
			<div class="group">
				<div class="grid_6_of_6">
					<h1 id="multipage_hl">Contact</h1>
				</div>
			</div>
		</div>
		<div id="abouttop_group">
			<div class="group">
				<div class="marg_bot_med"></div>
				<div class="grid_6_of_6">
					<h2>Still have questions?</h2>
				</div>
			</div>
			<div class="group">
				<div class="marg_bot_med"></div>
				<div class="grid_6_of_6">
					<p class="squish">We can make ourselves available to answer any questions about our services you might have.</p>
				</div>
			</div>
			<div class="marg_bot_med"></div>
			<div class="group">
				<div class="grid_6_of_6">
					<?php
					if (!empty($error_msg)) {
					    echo '<p class="error">ERROR: '. implode("<br />", $error_msg) . "</p>";
					}
					if ($result != NULL) {
					    echo '<p class="success">'. $result . "</p>";
					}
					?>
					<form action="%3C?php%20echo%20basename(__FILE__);%20?%3E" class="contform" method="post">
						<noscript>
						<p><input id="nojs" name="nojs" type="hidden"></p></noscript>
						<p><label for="fname">First Name: *</label> <input id="fname" name="fname" type="text" value=""><br>
						<label for="lname">First Name: *</label> <input id="lname" name="lname" type="text" value=""><br>
						<label for="email">E-mail: *</label> <input id="email" name="email" type="text" value=""><br>
						<label for="comments">Message: *</label>
						<textarea cols="20" id="comments" name="comments" placeholder="Type Your Message Here." rows="5"><?php get_data("comments"); ?></textarea><br></p>
						<p><input class="gry_btn" id="submit" name="submit" type="submit" value="Send"></p>
					</form>
				</div>
			</div>
		</div>
    <div class="group" id="footer_group">
      <div class="grid_2_of_6" id="footer_addr">
        <h4 class="t_b_c_marg_y">7018 E. Road. • York, PA</h4><br>
        <h4 class="t_b_c_marg_y"><a href="tel:717-854-4831">717-854-4831</a></h4><br>
        <h4 class="t_b_c_marg_y"><a href="mailto:train@expresscrossfit.com">train@expresscrossfit.com</a></h4><br>
      </div>
      <div class="grid_2_of_6" id="footer_sm">
        <h5 class="t_b_c_marg_y">Get in touch.</h5><a href="#"><img alt="FB" src="img/sm_facebook.png"></a> <a href="#"><img alt="Tw" src="img/sm_twitter.png"></a> <a href="#"><img alt="Li" src="img/sm_linked.png"></a> <a href="#"><img alt="Yt" src="img/sm_youtube.png"></a>
      </div>
      <div class="grid_2_of_6" id="footer_map">
        <a href="https://www.google.com/maps/dir//Semper+Fitness+24%2F7,+178+Leader+Heights+Rd,+York,+PA+17402/@39.9099313,-76.7689479,12z/data=!3m1!4b1!4m8!4m7!1m0!1m5!1m1!1s0x406fe2e83d552ff5:0xdbbba6fc5b3ab9b2!2m2!1d-76.6989079!2d39.9099524" target="_blank"><img alt="Click For More Info!" class="t_b_c_marg_z rotate-center" id="footer_map_select" height="171" src="img/horizonmap_ec.jpg" width="171"></a>
      </div>
    </div><img alt="placeholder" class="fade" id="pos_bot_l" src="img/splash_front_l.png"> <img alt="placterhold" class="fade" id="pos_bot_r" src="img/splash_front_r.png"></div>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js">
    </script>
    <script src="script/mobile_nav.js">
    </script>
  </body>
  </html>
