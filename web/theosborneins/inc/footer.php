<?php
$infooter = true;
// get ruhuman class
require_once WEBROOT . 'js/ruhuman/ruhuman.class.php';

ruhuman::init();
?>
<footer class="blue-bkg">
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
                    <button data-loading-text="Sending Message..." type="submit" class="btn btn-primary">Submit Request</button>
                </div>
            </form>
        </div>
    </div>
    <div class="container padding-vertical-lg footer-line-height">
        <div class="col-sm-4">
            <p><strong>Osborne Insurance</strong><br />
            2016 Euclid Ave.<br />
            Bristol, VA 24201<br />
            Phone:&nbsp;<a onclick="record_event('Phone Number','Click To Call','1-276-466-5492');" href="tel:276-466-5492"><strong>1-276-466-5492</strong></a></p><br />
        </div>
        <div class="col-sm-4">
            <p>
                <strong>Business Hours:</strong><br />
                M-F: 8:30 am - 5:00 pm
            </p>
        </div>
        <div class="col-sm-4 right-center">
            <a href="https://www.linkedin.com/in/eric-osborne-aa537267" target="_blank"><i class="fa fa-linkedin-square fa-3" aria-hidden="true"></i></a>
            <a href="https://www.facebook.com/Eric-Osborne-Insurance-117014951656163/" target="_blank"><i class="fa fa-facebook-square fa-3" aria-hidden="true"></i></a>
        </div>
    </div>
</footer>
