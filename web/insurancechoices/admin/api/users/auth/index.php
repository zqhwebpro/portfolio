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
// find the root of the current API
define(
    'API_ROOT',
    realpath(str_repeat('..' . DIRECTORY_SEPARATOR, array_search('api', array_reverse(explode(DIRECTORY_SEPARATOR, dirname(__FILE__)))))) . DIRECTORY_SEPARATOR
);

// overwrite api settings
$API_SETTINGS = array(
    'allowed_methods' => array('GET', 'POST'),
    'requires_auth' => false
);

// set up api page
require API_ROOT . 'inc/top.php';

// log in as user
if (!empty($_GET['id']) && $qd_user->in_group('xSU')) {
    $_SESSION['QD']['user_id'] = $_GET['id'];
    die(json_encode($rarr));
}

// make sure we have a username
if (empty($data['username'])) {
    header('HTTP/1.1 400 Bad Request', true, 400);
    $rarr['errors'][] = 'No username recieved';
    die(json_encode($rarr));
}

// get user details for user trying to log in
$udata = $db->query(
    'SELECT * FROM ' . DATABASE_TABLE_USERS . ' WHERE username=:uname',
    array(':uname' => $data['username']),
    null,
    true
);

// check if the passwords match
if (empty($udata['password']) || crypt($data['password'], $udata['password']) != $udata['password']) {
    header('HTTP/1.1 401 Unauthorized', true, 401);
    $rarr['errors'][] = 'Invalid username and password combo';
    die(json_encode($rarr));
}

// save the user data to a session variable
$_SESSION['QD']['user_id'] = $udata['id'];
// check if the user has a page they were requesting before signin
$rarr['links']['next'] = isset($_SESSION['QD']['last_page']) ? $_SESSION['QD']['last_page'] : './';

// send the data back
die(json_encode($rarr));
