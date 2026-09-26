<?php
/**
 * Bootstrap file for setting the ABSPATH constant
 * and loading the wp-config.php file. The wp-config.php
 * file will then include the wp-settings.php file, which
 * will set up the WordPress environment.
 *
 * @package WordPress
 */

/** Define ABSPATH as this directory's path */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

error_reporting( E_CORE_ERROR | E_CORE_WARNING | E_COMPILE_ERROR | E_ERROR | E_WARNING | E_PARSE | E_USER_ERROR | E_USER_WARNING | E_RECOVERABLE_ERROR );

/*
 * If wp-config.php exists in the WordPress root, or in the parent directory, load it.
 */
if ( file_exists( ABSPATH . 'wp-config.php' ) ) {
	require_once ABSPATH . 'wp-config.php';
} else {
	die( 'wp-config.php not found.' );
}
