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
define(
    'ADMIN_ROOT',
    dirname(API_ROOT) . '/'
);

// default settings for API pages
$API_DEFAULTS = array(
    'allowed_methods' => array('GET'),
    'requires_auth' => true,
    'requires_database' => true,
    'resources_ignore' => array('inc')
);
// overwrite defaults if other settings are specified
$API_SETTINGS = isset($API_SETTINGS) ? array_merge($API_DEFAULTS, $API_SETTINGS) : $API_DEFAULTS;

// set return type
header('Content-Type: application/json');

// the return array
$rarr = array();

// step one to becoming self aware: identify your place in space-time
$rarr['links']['self'] = $_SERVER['REQUEST_SCHEME'] . '://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];

// make sure request method is in allowed list
if (!in_array($_SERVER['REQUEST_METHOD'], $API_SETTINGS['allowed_methods'])) {
    header('HTTP/1.1 405 Method Not Allowed', true, 405);
    header('Allow: ' . implode(', ', $API_SETTINGS['allowed_methods']), true);
    $rarr['errors'] = array('Method Not Allowed');
    die(json_encode($rarr));
}

require ADMIN_ROOT . 'inc/common/site/database.php';
require ADMIN_ROOT . 'inc/classes/database.class.php';
$db = new database();

// get the user class
require ADMIN_ROOT . 'inc/classes/user.class.php';
// start the session
session_start();
// get current user data
if (isset($_SESSION['QD']['user_id'])) {
    $qd_user = $db->query('SELECT * FROM ' . DATABASE_TABLE_USERS . ' WHERE `id`=:uid', array(':uid' => $_SESSION['QD']['user_id']), 'user', true);
}
// check if the page requires the user to be logged in
if ($API_SETTINGS['requires_auth'] && empty($qd_user)) {
    header('HTTP/1.1 401 Unauthorized', true, 401);
    $rarr['errors'][] = 'Please login';
    die(json_encode($rarr));
}

// get other site files
$site_files = glob(ADMIN_ROOT . 'inc/common/site/*.php');
foreach ($site_files as $sf) {
    if (basename($sf) == 'database.php') {
        continue;
    }
    require $sf;
}
unset($site_files);

// check if we are looking for form data or json
if ($_SERVER['REQUEST_METHOD'] == 'POST' && strpos($_SERVER['CONTENT_TYPE'], 'application/json') === false) {
    $data = $_POST;
} else {
    // make sure we are dealing with json
    if ($_SERVER['REQUEST_METHOD'] != 'GET' && strpos($_SERVER['CONTENT_TYPE'], 'application/json') === false) {
        header('HTTP/1.1 415 Unsupported Media Type', true, 415);
        header('Accept: application/json');
        $rarr['errors'][] = 'Accepted media types: "application/json"';
        die(json_encode($rarr));
    }
    // get sent data if any
    $data = json_decode(file_get_contents('php://input'), true);
}

// get all folders
$paths = glob('*', GLOB_ONLYDIR);
if (count($paths) > 0) {
    // add valid paths to links/resources
    $rarr['links']['resources'] = array();
    foreach ($paths as $path) {
        if (in_array($path, $API_SETTINGS['resources_ignore'])) {
            continue;
        }
        $rarr['links']['resources'][] = $path;
    }
}
unset($paths);
