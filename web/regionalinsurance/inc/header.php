<header>
    <nav class="navbar navbar-default">
        <div class="container">
            <div class="navbar-header">
                <div class="row">
                    <div class="col-xs-8 col-sm-4">
                        <a class="logo" href="<?php echo WEBURLROOT; ?>"><img src="<?php echo WEBURLROOT; ?>images/ria.jpg" alt="Regional Insurance Associates" title="Regional Insurance Associates" style="width:155px; padding:0px 5px;" /></a>
                    </div>
                    <div class="col-xs-2 col-sm-4">
                        <div class="nav-tel">
                            <a onclick="record_event('Phone Number','Click To Call','215-321-1900');" href="tel:215-321-1900" class="btn btn-default"><i class="fa fa-phone" aria-hidden="true"></i> <span class="hidden-xs">215-321-1900</span></a>
                        </div>
                    </div>
                    <div class="hidden-xs col-sm-4 social-media-header">
                        <div class="social-btns">
                            <p><span style="margin-right:10px;">Connect with us:</span>
                            <a onclick="record_event('Facebook','Visit','<?php if($infooter) {echo'Footer';} else {echo'Header';}?>');" href="https://www.facebook.com/RegionalInsuranceAssociates/" target="_blank"><i class="fa fa-facebook-official fa-2x" aria-hidden="true" style="margin-right:10px;"></i></a>
                            <a onclick="record_event('Form','Open','<?php if($infooter) {echo'Footer';} else {echo'Header';}?>');" href="mailto:amockaitis@regionalinsurance.net"><i class="fa fa-envelope fa-2x" aria-hidden="true"></i></a>
                            </p>
                        </div>
                    </div>
                    <div class="col-xs-2 visible-xs">
                        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                            <span class="sr-only">Toggle navigation</span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
            <div class="container">
                <ul class="nav navbar-nav">
                    <li class="dropdown hidden-xs">
                        <a href="<?php echo WEBURLROOT; ?>services/" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-delay="100" data-close-others="true" role="button" aria-haspopup="true" aria-expanded="false">Services <span class="caret hidden-xs"></span></a>
                        <ul class="dropdown-menu hidden-xs">
                            <li><a href="<?php echo WEBURLROOT; ?>services/commercial-insurance/">Commercial Insurance</a></li>
                            <li><a href="<?php echo WEBURLROOT; ?>services/personal-insurance/">Personal Insurance</a></li>
                            <li><a href="<?php echo WEBURLROOT; ?>services/employee-benefits/">Employee Benefits</a></li>
                        </ul>
                    </li>
                    <li class="visible-xs nav-tog"><a href="<?php echo WEBURLROOT; ?>services/">Services</a></li>
                    <li class="visible-xs nav-tog"><a href="<?php echo WEBURLROOT; ?>services/commercial-insurance/">&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;Commercial Insurance</a></li>
                    <li class="visible-xs nav-tog"><a href="<?php echo WEBURLROOT; ?>services/personal-insurance/">&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;Personal Insurance</a></li>
                    <li class="visible-xs nav-tog"><a href="<?php echo WEBURLROOT; ?>services/employee-benefits/">&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;Employee Benefits</a></li>
                    <li><a href="<?php echo WEBURLROOT; ?>free-quote/">Free Quote</a></li>
                    <li><a href="<?php echo WEBURLROOT; ?>about-us/">About Us</a></li>
                    <li><a href="<?php echo WEBURLROOT; ?>contact-us/">Contact Us</a></li>
                    <li class="visible-xs"><a onclick="record_event('Facebook','Visit','<?php if($infooter) {echo'Footer';} else {echo'Header';}?>');" href="https://www.facebook.com/RegionalInsuranceAssociates/" target="_blank"><i class="fa fa-facebook-official fa-2x" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;Find Us On Facebook!</a></li>
                    <li class="visible-xs"><a onclick="record_event('Form','Open','<?php if($infooter) {echo'Footer';} else {echo'Header';}?>');" href="mailto:amockaitis@regionalinsurance.net"><i class="fa fa-envelope fa-2x" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;Contact Us Today!</a></li>
                </ul>
            </div>
        </div>
    </nav>
</header>
