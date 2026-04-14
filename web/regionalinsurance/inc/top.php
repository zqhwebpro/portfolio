<?php
/* use:
require WEBROOT . 'inc/some.class.php';
<img src="<?php echo WEBURLROOT; ?>images/the_image.jpg" />
*/
/* Server Side */
define(
    'WEBROOT',
    str_repeat(
        '..' . DIRECTORY_SEPARATOR,
        substr_count(substr(dirname($_SERVER['SCRIPT_FILENAME']), strlen(dirname(dirname(__FILE__)))), DIRECTORY_SEPARATOR)
    )
);
/* Client Side */
define(
    'WEBURLROOT',
    str_replace('\\', '/', WEBROOT)
);
session_start();


// setup insurance types
$ins_types = array(
    'commercial' => array(
        'cat' => 'Commercial Insurance',
        'url' => 'commercial-insurance',
        'types' => array(
                array(
                    'name' => 'Contractors',
                    'url' => 'commercial-insurance',
                ),
                array(
                    'name' => 'Retail',
                    'url' => 'commercial-insurance',
                ),
                array(
                    'name' => 'Restaurants/Taverns',
                    'url' => 'commercial-insurance',
                ),
                array(
                    'name' => 'Professional Offices',
                    'url' => 'commercial-insurance',
                ),
                array(
                    'name' => 'Auto/Truck Service and Sales',
                    'url' => 'commercial-insurance',
                ),
            )
        ),
    'personal' => array(
        'cat' => 'Personal Insurance',
        'url' => 'personal-insurance',
        'types' => array(
                array(
                    'name' => 'Auto',
                    'url' => 'personal-insurance',
                ),
                array(
                    'name' => 'Homeowners',
                    'url' => 'personal-insurance',
                ),
                array(
                    'name' => 'Personal Umbrella',
                    'url' => 'personal-insurance',
                ),
                array(
                    'name' => 'Life & Health',
                    'url' => 'personal-insurance',
                ),
                array(
                    'name' => 'Watercraft',
                    'url' => 'personal-insurance',
                ),
                array(
                    'name' => 'Collector',
                    'url' => 'personal-insurance',
                ),
                array(
                    'name' => 'Flood',
                    'url' => 'personal-insurance',
                ),
            )
        ),
    'employee' => array(
        'cat' => 'Employee Benefits',
        'url' => 'employee-benefits',
        'types' => array(
            array(
                'name' => 'Group Health',
                'url' => 'employee-benefits',
            ),
            array(
                'name' => 'Short & Long Term Disability',
                'url' => 'employee-benefits',
            ),
        )
    )
);
