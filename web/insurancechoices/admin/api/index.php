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

$API_SETTINGS = array(
    'requires_auth' => false,
    'requires_database' => false
);

// set up api page
require API_ROOT . 'inc/top.php';

// send the data back
die(json_encode($rarr));
