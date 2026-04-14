<?php
/* use:
require WEBROOT . 'inc/some.class.php';
<img src="<?php echo WEBURLROOT; ?>images/the_image.jpg" />
*/
define(
    'WEBROOT',
    str_repeat(
        '..' . DIRECTORY_SEPARATOR,
        substr_count(substr(dirname($_SERVER['SCRIPT_FILENAME']), strlen(dirname(dirname(__FILE__)))), DIRECTORY_SEPARATOR)
    )
);
define(
    'WEBURLROOT',
    str_replace('\\', '/', WEBROOT)
);
session_start();

?>
