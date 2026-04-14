<?php
$infooter = true;
// get ruhuman class
require_once WEBROOT . 'js/ruhuman/ruhuman.class.php';

ruhuman::init();
?>
<footer>
    <div class="red-texture-bkg padding-vertical-lg">
        <div class="container" style="margin-bottom: 30px;">
            <h2 class="text-center text-slab white">Still Have Questions?</h2>
            <h3 class="text-center white" style="margin-bottom: 40px;">No Problem - We Can Call You!</h3>
            <form class="form-inline text-center" id="frmCallMe">
                <div class="form-group">
                    <label class="sr-only" for="questionsName">Enter Name</label>
                    <input type="text" class="form-control" id="questionsName" name="questionsName" placeholder="Enter Name">
                </div>
                <div class="form-group">
                    <label class="sr-only" for="questionsPhone">Enter Phone Number</label>
                    <input type="text" class="form-control" id="questionsPhone" name="questionsPhone" placeholder="Enter Phone Number">
                </div>
                <div class="form-group">
                    <button data-loading-text="Sending Message..." type="submit" class="btn btn-primary"><i class="fa fa-send" style="margin-right:5px;"></i> Submit Request</button>
                </div>
            </form>
        </div>
    </div>
    <div class="container padding-vertical-lg">
        <div class="col-sm-3">
            <a class="logo" href="#"><img src="images/Scott-&-Wilson-Logo.png" alt="Scott & Wilson Insurance" title="Scott & Wilson Insurance" class="img-full" /></a>
            <!-- BEGIN: BBB AB Seal -->
            <script type="text/javascript">
                   var bbb = bbb || [];
                   bbb.push(["bbbid", "richmond"]);
                   bbb.push(["bid", "63410001"]);
                   bbb.push(["chk", "F79FCAC86B"]);
                   bbb.push(["pos", "bottom-left"]);
                   (function () {
                       var scheme = (("https:" == document.location.protocol) ? "https://" : "http://");
                       var bbb = document.createElement("script");
                       bbb.type = "text/javascript";
                       bbb.async = true;
                       bbb.src = scheme + "seal-richmond.bbb.org/badge/badge.min.js";
                       var s = document.getElementsByTagName("script")[0];
                       s.parentNode.insertBefore(bbb, s);
                   })();
            </script>
            <!-- END: BBB AB Seal -->
        </div>
        <div class="col-sm-3">
            <p class="footer-address">
                <strong>Scott &amp; Wilson Insurance</strong><br />
                PO Box 2168<br />
                569 Court St.<br />
                Appomattox, VA 24522<br />
                <a onclick="record_event('Phone Number','Click To Call','1-434-352-7550');" href="tel:434-352-7550" class="btn btn-default footer-button"><i class="fa fa-phone" aria-hidden="true"></i> 1-434-352-7550</a><br />
                fax: 434-352-2567<br />
                <a href="mailto:info@scottandwilson.com">info@scottandwilson.com</a><br />
            </p>
        </div>
        <div class="col-sm-3">
            <p class="footer-hours"><strong>Business Hours</strong><br />M-F: 8:30 am - 5:00 pm</p>
        </div>
        <div class="col-sm-3">
            <a href="about-us.php#provider-links" class="footer-links">Provider Links</a>
            <a href="privacypolicy.php" class="footer-links">Privacy Policy</a>
            <a href="claim-numbers.php" class="footer-links">Claim Numbers</a>
        </div>
    </div>
</footer>
<h6 class="copyright">© Copyright 2017 Scott &amp; Wilson Insurance</h6>
