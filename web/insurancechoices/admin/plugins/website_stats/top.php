<?php
$plugin_careers = $db->query('SELECT count(*) as `count` FROM careers WHERE `active`="Y";', null, null, true);
