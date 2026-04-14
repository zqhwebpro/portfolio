<?php
/*
Quantum Dash - A modular foundation for building admin panels
Copyright (C) 2015  Alex Mayer and Jonathan Gingrich

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
            $item = $db->query('SELECT * FROM careers WHERE `id`=:iid;', array(':iid' => $_GET['id']), null, true);
            // make sure we have an item to return
            if (empty($item)) {
                header('HTTP/1.1 404 Not Found', true, 404);
                $rarr['errors'][] = 'Item does not exist';
                die(json_encode($rarr));
            }
            // add item to return data
            $rarr['data'] = $item;
        } else {
            $rarr['data'] = $db->query('SELECT * FROM careers ORDER BY FIELD(careers.`active`, "Y", "N"), careers.`listing_date`;');
        }
        break;
    case 'PATCH':
        // check that the user has access to the item they are trying to modify
        if (!$qd_user->in_group('mCAREERS')) {
            header('HTTP/1.1 403 Forbidden', true, 403);
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
        $item = $db->query('SELECT * FROM careers WHERE `id`=:iid', array(':iid' => $_GET['id']), 'dbRow', true);
        // return an error if no item is found
        if (empty($item)) {
            header('HTTP/1.1 404 Not Found', true, 404);
            $rarr['errors'][] = 'Item does not exist';
            die(json_encode($rarr));
        }

        // fields that should not be saved
        $exclude_fields = array('id', 'active', 'listing_date');
        // loop throught each field and save it if a value was set
        foreach ($item->tables[0]->cols as $col) {
            if (in_array($col, $exclude_fields)) {
                continue;
            }
            if (isset($data[$col])) {
                $item->$col = $data[$col];
            }
        }
        // format listing date
        if (isset($data['active'])) {
            $item->active = $data['active'] == 'Y' ? 'Y' : 'N';
        }
        // make sure active is set correctly
        if (isset($data['listing_date'])) {
            $item->listing_date = !empty($data['listing_date']) ? date('Y-m-d', strtotime($data['listing_date'])) : null;
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
        if (!$qd_user->in_group('mCAREERS')) {
            header('HTTP/1.1 403 Forbidden', true, 403);
            $rarr['errors'][] = 'You do not have access to modify this item';
            die(json_encode($rarr));
        }

        // get the item we are working with
        $item = new dbRow($db->handle, 'careers');

        // fields that should not be saved
        $exclude_fields = array('id', 'active', 'listing_date');
        // loop throught each field and save it if a value was set
        foreach ($item->tables[0]->cols as $col) {
            if (in_array($col, $exclude_fields)) {
                continue;
            }
            if (isset($data[$col])) {
                $item->$col = $data[$col];
            }
        }
        // make sure active is set correctly
        if (isset($data['active'])) {
            $item->active = $data['active'] == 'Y' ? 'Y' : 'N';
        }
        // format listing date
        if (isset($data['listing_date'])) {
            $item->listing_date = !empty($data['listing_date']) ? date('Y-m-d', strtotime($data['listing_date'])) : null;
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
        if (!$qd_user->in_group('mCAREERS')) {
            header('HTTP/1.1 403 Forbidden', true, 403);
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
        $item = $db->query('SELECT * FROM careers WHERE `id`=:iid', array(':iid' => $_GET['id']), 'dbRow', true);
        // return an error if no item is found
        if (empty($item)) {
            header('HTTP/1.1 404 Not Found', true, 404);
            $rarr['errors'][] = 'Item does not exist';
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
