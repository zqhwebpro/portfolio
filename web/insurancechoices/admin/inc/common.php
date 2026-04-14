<?php
/*
Quantum Dash - A modular foundation for building admin panels
Copyright (C) 2017  Alex Mayer and Jonathan Gingrich

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
define('QD_VERSION', '2.5.4');

// define the folder that admin panel starts in
define('QD_ROOT', dirname(dirname(__FILE__)) . '/');

// make sure the admin is setup
if (!file_exists(QD_ROOT . 'inc/common/site/database.php')) {
    header('Location: setup.php', true, 302);
    exit;
}

// get the classes
require QD_ROOT . 'inc/classes/database.class.php';
require QD_ROOT . 'inc/classes/user.class.php';

// get the database info
require QD_ROOT . 'inc/common/site/database.php';
// create a database object for later use
$db = new database();

session_start();

// get current user data
if (isset($_SESSION['QD']['user_id'])) {
    $qd_user = $db->query('SELECT * FROM ' . DATABASE_TABLE_USERS . ' WHERE `id`=:uid', array(':uid' => $_SESSION['QD']['user_id']), 'user', true);
}

// get other site files
$site_files = glob(QD_ROOT . 'inc/common/site/*.php');
foreach ($site_files as $sf) {
    if (basename($sf) == 'database.php') {
        continue;
    }
    require $sf;
}
unset($site_files, $sf);
