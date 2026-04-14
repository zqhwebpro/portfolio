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
// useful to output arrays when debugging
// voted "most handy function of the year" 4 years in a row... true story bro
function pre($arr, $exit = false)
{
    echo '<pre>' . print_r($arr, true) . '</pre>';
    if ($exit) {
        exit;
    }
}

// format a notification to be displayed on next pageload
function qd_notify($message, $title = '', $type = 'info', $options = '{}')
{
    $type = strtolower($type);
    // valid notify types
    $valid_types = array('info', 'success', 'warning', 'error');
    // ensure type is valid
    if (!in_array($type, $valid_types)) {
        $type = 'info';
    }

    // store notification
    $_SESSION['QD']['notify'][] = array(
        'title' => $title,
        'message' => $message,
        'type' => $type,
        'options' => $options
    );
}

// returns safe file names
function clean_filename($str = '', $tolower = false)
{
    $str = preg_replace('/[^a-zA-Z0-9\.\-\_]/', '_', $str);
    $str = trim(preg_replace('/_+/', '_', $str), '.-_');
    if ($tolower) {
        $str = strtolower($str);
    }
    return $str;
}
