<?php
session_start();

if (empty($_SESSION['ruhuman']['loadtime'])) {
    header('HTTP/1.1 400 Bad Request', true, 400);
    exit;
}
$_SESSION['ruhuman']['checkin'] = true;
