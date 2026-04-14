<?php
$infooter = true;
// get ruhuman class
require_once WEBROOT . 'js/ruhuman/ruhuman.class.php';

ruhuman::init();
?>
<footer>
    <div class="red-texture-bkg padding-vertical-lg">
        <div class="container">
            <h2 class="text-center text-slab white">Still Have Questions?</h2>
            <h3 class="text-center white">No Problem - We Can Call You!</h3>
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
                    <?php
                        $directory_string =  dirname( $_SERVER['SCRIPT_NAME']);
                        $directories = explode(DIRECTORY_SEPARATOR, $directory_string);
                        $cur_dir = $directories[count($directories) - 1];
                    ?>
                    <label class="sr-only" for="questionsInsurance">Enter Phone Number</label>
                    <select class="form-control" id="questionsInsurance" name="questionsInsurance">
                        <option value="" selected disabled>Select Insurance Type</option>
                        <?php
                        foreach($ins_types as $it) {
                            echo ' <optgroup label="' . $it['cat'] . '">';
                            foreach($it['types'] as $t) {
                                echo '<option value="' . $t['name'] . '" ' . ($cur_dir == $t['url'] ? ' selected' : ''). '>' . $t['name'] . '</option>';
                            }
                            echo '</otpgroup>';
                        }
                        ?>
                    </select>
                </div>
                <button type="submit" class="btn btn-primary"><i class="fa fa-phone"></i> Please Call Me</button>
            </form>
        </div>
    </div>
    <div class="container padding-vertical-lg footer-fix">
        <div class="col-sm-3">
            <a class="logo" href="<?php echo WEBURLROOT; ?>"><img src="<?php echo WEBURLROOT; ?>images/ria.jpg" alt="Regional Insurance Associates" title="Regional Insurance Associates" class="img-full" style="width:115px; padding:0px 5px;" /></a>
        </div>
        <div class="col-sm-3">
            <p class="footer-address">
                <strong>Regional Insurance Associates</strong><br />
                1113 A Washington Crossing Blvd<br />
                Washington Crossing, PA 18977<br />
                Fax: 215-321-1700<br/><br/>
                <a onclick="record_event('Phone Number','Click To Call','215-321-1900');" href="tel:215-321-1900" class="btn btn-default"><i class="fa fa-phone" aria-hidden="true"></i> 215-321-1900</a>
            </p>
        </div>
        <div class="col-sm-3">
            <p><strong>Business Hours</strong><br />M-F: 8:30AM - 5:00PM</p>
        </div>
        <div class="col-sm-3">
            <div class="social-media-footer">
                <p><span class="hidden-sm hidden-xs" style="margin-right:10px;">Connect with us:</span>
                <a onclick="record_event('Facebook','Visit','<?php if($infooter) {echo'Footer';} else {echo'Header';}?>');" href="https://www.facebook.com/RegionalInsuranceAssociates/" target="_blank"><i class="fa fa-facebook-official fa-2x" aria-hidden="true" style="margin-right:10px;"></i></a>
                <a onclick="record_event('Form','Open','<?php if($infooter) {echo'Footer';} else {echo'Header';}?>');" href="mailto:amockaitis@regionalinsurance.net"><i class="fa fa-envelope fa-2x" aria-hidden="true"></i></a>
                <br/>
                <a style="margin-top:5px;" href="<?php echo WEBURLROOT; ?>privacy-policy/">Privacy Policy</a>
                </p>
            </div>
        </div>
    </div>
</footer>
