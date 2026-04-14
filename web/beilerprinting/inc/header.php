<header>
    <nav class="navbar navbar-default">
        <div class="container">
            <div class="navbar-header">
                <div class="row">
                    <div class="col-xs-12 col-sm-3 text-center">
                        <a href="<?php echo WEBURLROOT; ?>"><img src="<?php echo WEBURLROOT; ?>images/beiler-printing-logo.png" alt="Beiler Printing LLC" class="img-full max-header" /></a>
                    </div>
                    <div class="col-xs-12 col-sm-3 text-center">
                        <a href="<?php echo WEBURLROOT; ?>"><img src="<?php echo WEBURLROOT; ?>images/tagline.png" alt="The King of Quick Turn & Short Run" class="img-full max-header" /></a>
                    </div>
                    <div class="col-xs-12 col-sm-6">
                        <div class="row">
                            <div class="hidden-xs col-sm-6 something-fast">
                                Need something fast? <strong>Give us a call.</strong>
                            </div>
                            <div class="col-xs-7 col-sm-6">
                                <div itemscope itemtype="http://schema.org/LocalBusiness">
                                    <a onclick="record_event('Phone Number','Click To Call','Header 717-336-1148');" href="tel:1-717-336-1148" class="btn btn-block btn-magenta telephone"><i class="fa fa-phone" aria-hidden="true"></i> <span class="hidden-xs"><span itemprop="telephone"><strong>717-336-1148</strong></span></span></a>
                                </div>
                                <div class="hidden-xs text-center hours">Hours: 7:30am-5:00pm</div>
                            </div>
                            <div class="col-xs-5 visible-xs">
                                <button type="button" class="collapsed btn btn-teal btn-media" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                                    <span class="sr-only">Toggle navigation</span>
                                    <span class="glyphicon glyphicon-menu-hamburger"></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
            <div class="container">
                <ul class="nav navbar-nav">
                    <li <?php echo $tab ; if ($tab == 'about') { echo ' class="active"';} ?>><a href="<?php echo WEBURLROOT; ?>">About Us</a></li>
                    <li class="dropdown <?php if ($tab == 'services') { echo 'active';} ?>">
                        <a href="<?php echo WEBURLROOT; ?>services/" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-delay="100" data-close-others="true"role="button" aria-haspopup="true" aria-expanded="false">Services <span class="caret"></span></a>
                        <ul class="dropdown-menu">
                            <li><a href="<?php echo WEBURLROOT; ?>services/labels/">Labels</a></li>
                            <li><a href="<?php echo WEBURLROOT; ?>services/printing/">Traditional Printing</a></li>
                            <li><a href="<?php echo WEBURLROOT; ?>services/signage/">Signage</a></li>
                            <li><a href="<?php echo WEBURLROOT; ?>services/ad-specialties/">Ad Specialties</a></li>
                        </ul>
                    </li>
                    <li <?php if ($tab == 'contact') { echo ' class="active"';} ?>><a href="<?php echo WEBURLROOT; ?>contact/">Contact</a></li>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                    <li><a href="<?php echo WEBURLROOT; ?>quote/" class="btn btn-yellow"><span class="glyphicon glyphicon-list-alt"></span> <strong>Quotes &amp; Reorders</strong></a></li>
                    <li><a href="https://beilerprinting.wetransfer.com/" target="_blank" class="btn btn-purple"><span class="glyphicon glyphicon-upload"></span> <strong>Send Files</strong></a></li>
                </ul>
            </div>
        </div>
    </nav>
</header>
