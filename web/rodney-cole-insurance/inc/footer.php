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
            <a class="logo" href="#"><img src="<?php echo WEBURLROOT; ?>images/Rodney-Cole-Logo.png" alt="Rodney Cole Insurance" title="Rodney Cole Insurance" class="img-full" /></a>
        </div>
        <div class="col-sm-3">
            <p class="footer-address">
                <strong>Rodney Cole Insurance</strong><br />
                8052 Elm Dr., #D<br />
                Mechanicsville, VA 23111<br />
                <a onclick="record_event('Phone Number','Click To Call','804-569-6208');" href="tel:+18045696208" class="btn btn-default footer-button"><i class="fa fa-phone" aria-hidden="true"></i> 804-569-6208</a><br />
                <a href="mailto:info@rodneycoleinsuranceagency.com">info@rodneycoleinsuranceagency.com</a><br />
            </p>
        </div>
        <div class="col-sm-3">
            <p class="footer-hours"><strong>Business Hours</strong><br />M-Th: 8:00 am - 5:00 pm<br/>F: 8:00 am - 4:00 pm</p>
        </div>
        <div class="col-sm-3">
            <a href="<?php echo WEBURLROOT; ?>privacy-policy/" class="footer-links">Privacy Policy</a>
        </div>
    </div>
</footer>
<h6 class="copyright">© Copyright 2017 Rodney Cole Insurance</h6>
