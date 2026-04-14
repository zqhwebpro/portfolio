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
    'allowed_methods' => array('GET', 'PATCH', 'PUT', 'DELETE')
);

// set up api page
require API_ROOT . 'inc/top.php';

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        if (!empty($_GET['id'])) {
            // get the item if it exists
            $item = $db->query('SELECT * FROM ' . DATABASE_TABLE_USERS . ' WHERE `id`=:iid;', array(':iid' => $_GET['id']), null, true);
            // make sure we have an item to return
            if (empty($item)) {
                header('HTTP/1.1 404 Not Found', true, 404);
                $rarr['errors'][] = 'User does not exist';
                die(json_encode($rarr));
            }
            // strip password
            unset($item['password']);
            // add item to return data
            $rarr['data'] = $item;
        } else {
            // if user is not an admin only return their user
            if (!$qd_user->in_group('xSU')) {
                $rarr['data'] = $db->query('SELECT * FROM ' . DATABASE_TABLE_USERS . ' WHERE `id`=:uid;', array(':uid' => $qd_user->id));
            } else {
                $rarr['data'] = $db->query('SELECT * FROM ' . DATABASE_TABLE_USERS . ' ORDER BY `username`;');
            }
            // strip passwords
            foreach ($rarr['data'] as &$tmp) {
                unset($tmp['password']);
            }
        }
        break;
    case 'PATCH':
        // check that the user has access to the user they are trying to modify
        if (!$qd_user->in_group('xSU') && $qd_user->id != $_GET['id']) {
            header('HTTP/1.1 401 Unauthorized', true, 401);
            $rarr['errors'][] = 'You do not have access to modify this item';
            die(json_encode($rarr));
        }

        // make sure we have an id to work with
        if (empty($_GET['id'])) {
            header('HTTP/1.1 400 Bad Request', true, 400);
            $rarr['errors'][] = 'No ID was passed';
            die(json_encode($rarr));
        }

        // get the item we are working with
        $item = $db->query('SELECT * FROM ' . DATABASE_TABLE_USERS . ' WHERE `id`=:iid', array(':iid' => $_GET['id']), 'dbRow', true);
        // return an error if no item is found
        if (empty($item)) {
            header('HTTP/1.1 404 Not Found', true, 404);
            $rarr['errors'][] = 'User does not exist';
            die(json_encode($rarr));
        }

        // fields that should not be saved
        $exclude_fields = array('id', 'password', 'groups');
        // loop throught each field and save it if a value was set
        foreach ($item->tables[0]->cols as $col) {
            if (in_array($col, $exclude_fields)) {
                continue;
            }
            if (isset($data[$col])) {
                $item->$col = $data[$col];
            }
        }
        // check if we need to update the password
        if (!empty($data['password'])) {
            // generate a hash
            $hash = version_compare(phpversion(), '5.3.7', '>') ? '$2y$12$' : '$1$';
            // generate random salt
            $salt = function_exists('openssl_random_pseudo_bytes') ? substr(strtr(base64_encode(openssl_random_pseudo_bytes(22)), '+', '.'), 0, 22) : md5($data['password'] . time() . '#fakerandomsalt');
            $item->password = crypt($data['password'], $hash . $salt);
        }
        if ($qd_user->in_group('xSU')) {
            if (!empty($data['groups'])) {
                // $item->groups = is_array($data['groups']) ? implode(',', $data['groups']) : $data['groups'];
                $item->groups = $data['groups'];
            } elseif (in_array('groups', array_keys($data))) {
                $item->groups = null;
            }
        }

        // save the data to the database
        if (!$item->save()) {
            header('HTTP/1.1 503 Service Unavailable', true, 503);
            $rarr['errors'][] = 'Error writing to database';
            die(json_encode($rarr));
        }
        break;
    case 'PUT':
        // check that the user has access to the item they are trying to modify
        if (!$qd_user->in_group('xSU')) {
            header('HTTP/1.1 401 Unauthorized', true, 401);
            $rarr['errors'][] = 'You do not have access to modify this item';
            die(json_encode($rarr));
        }

        // get the item we are working with
        $item = new dbRow($db->handle, DATABASE_TABLE_USERS);

        // fields that should not be saved
        $exclude_fields = array('id', 'password', 'groups');
        // loop throught each field and save it if a value was set
        foreach ($item->tables[0]->cols as $col) {
            if (in_array($col, $exclude_fields)) {
                continue;
            }
            if (isset($data[$col])) {
                $item->$col = $data[$col];
            }
        }
        // check if we need to update the password
        if (!empty($data['password'])) {
            // generate a hash
            $hash = version_compare(phpversion(), '5.3.7', '>') ? '$2y$12$' : '$1$';
            // generate random salt
            $salt = function_exists('openssl_random_pseudo_bytes') ? substr(strtr(base64_encode(openssl_random_pseudo_bytes(22)), '+', '.'), 0, 22) : md5($data['password'] . time() . '#fakerandomsalt');
            $item->password = crypt($data['password'], $hash . $salt);
        }
        if ($qd_user->in_group('xSU') && !empty($data['groups'])) {
            // $item->groups = is_array($data['groups']) ? implode(',', $data['groups']) : $data['groups'];
            $item->groups = $data['groups'];
        }

        // save the data to the database
        if (!$item->save()) {
            header('HTTP/1.1 503 Service Unavailable', true, 503);
            $rarr['errors'][] = 'Error writing to database';
            die(json_encode($rarr));
        }
        break;
    case 'DELETE':
        // check that the user has access to the item they are trying to modify
        if (!$qd_user->in_group('xSU')) {
            header('HTTP/1.1 401 Unauthorized', true, 401);
            $rarr['errors'][] = 'You do not have access to modify this item';
            die(json_encode($rarr));
        }

        // make sure we have an id to work with
        if (empty($_GET['id'])) {
            header('HTTP/1.1 400 Bad Request', true, 400);
            $rarr['errors'][] = 'No ID was passed';
            die(json_encode($rarr));
        }

        // get the item we are working with
        $item = $db->query('SELECT * FROM ' . DATABASE_TABLE_USERS . ' WHERE `id`=:iid', array(':iid' => $_GET['id']), 'dbRow', true);
        // return an error if no item is found
        if (empty($item)) {
            header('HTTP/1.1 404 Not Found', true, 404);
            $rarr['errors'][] = 'User does not exist';
            die(json_encode($rarr));
        }

        // remove the data from the database
        if (!$item->delete()) {
            header('HTTP/1.1 503 Service Unavailable', true, 503);
            $rarr['errors'][] = 'Error writing to database';
            die(json_encode($rarr));
        }
        break;
}

// send the data back
die(json_encode($rarr));
