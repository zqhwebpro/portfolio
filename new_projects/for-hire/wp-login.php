<?php
/**
 * WordPress User Page
 *
 * Handles authentication, registration, password retrieval, etc.
 *
 * @package WordPress
 */

require __DIR__ . '/wp-load.php';

// Redirect to wp-admin if already authenticated or show login screen
header( 'Location: wp-admin/' );
exit;
