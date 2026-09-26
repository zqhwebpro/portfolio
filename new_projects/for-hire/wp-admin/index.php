<?php
/**
 * Dashboard Administration Screen
 *
 * @package WordPress
 * @subpackage Administration
 */

/** Load WordPress Administration Bootstrap */
require_once __DIR__ . '/../wp-load.php';

// Display admin screen or redirect to login
header( 'Location: index.html' );
exit;
