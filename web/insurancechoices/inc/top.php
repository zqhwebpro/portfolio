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

require WEBROOT . 'admin/inc/common/site/database.php';
require WEBROOT . 'admin/inc/classes/database.class.php';
require WEBROOT . 'admin/inc/common/functions.php';
$db = new database();
require WEBROOT . 'inc/functions.php';
