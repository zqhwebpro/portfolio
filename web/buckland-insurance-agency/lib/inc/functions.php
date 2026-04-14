<?php
function makeid($str) {
    $str = strtolower(trim(preg_replace('/[^a-zA-Z0-9]+/', '-', $str), '-'));
    return $str;
}

function getid($str) {
    $pieces = explode('-', $str);
    // get last element
    return end($pieces);
}

function pretty_url($url) {
    $url = str_replace('http://', '', $url);
    $url = str_replace('https://', '', $url);
    return $url;
}
