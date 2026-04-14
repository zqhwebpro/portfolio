<?php
class ruhuman
{
    public static function reset() {
        unset($_SESSION['ruhuman']);
    }

    public static function is_human() {
        return !($_SESSION['ruhuman']['loadtime'] >= strtotime('now - 3 seconds') || !$_SESSION['ruhuman']['checkin']);
    }

    public static function init() {
        $_SESSION['ruhuman']['loadtime'] = strtotime('now');
        $_SESSION['ruhuman']['checkin'] = false;
    }
}
