<?php
/**
 * WordPress Core Configuration for "For Hire" - Bones Theme + WooCommerce Integration
 *
 * @package WordPress
 * @subpackage ForHire
 * @version 6.5.3
 */

// ** Database settings - You can get this info from your web host ** //
define( 'DB_NAME', 'for_hire_wp' );
define( 'DB_USER', 'wp_dbuser' );
define( 'DB_PASSWORD', 'Secure_DevPass_2026!#' );
define( 'DB_HOST', 'localhost' );
define( 'DB_CHARSET', 'utf8mb4' );
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 * Generated using WordPress.org secret-key service.
 */
define( 'AUTH_KEY',         'v!8pQ{xT1=e#v%mC4&~ZzL-9+p*K3r]Y0>wU8!oN2?qS6^dV5$hM7@yB4|tA9(jE' );
define( 'SECURE_AUTH_KEY',  'b@5kR~mY9*vW2^qZ8$uE3(oP7!tI0=fH4}aD6?xL1|sC5&gJ8+nQ9_zK2%rT4]eO' );
define( 'LOGGED_IN_KEY',    'g^9xK|sB3!yN7(rP2?mQ5@tW8*uF1=aD4}zE6&vH0_oI4$lJ8+nC7~eL2%bV5]rT' );
define( 'NONCE_KEY',        'w!3dF$gJ8*kL2~mQ7@pT5(uY9?vB4=aZ0}xE6^rN1|sC4&hI8+oP9_tK2%eM5]yH' );
define( 'AUTH_SALT',        'y*7vM~bE2$tN6@rQ1?pW4(uI8!oZ3=aF5}xD9^kL0|sH4&gC8+nK9_mP2%eT5]rB' );
define( 'SECURE_AUTH_SALT', 'k@4tP~mB9*vQ1^rZ7$uW2(oE6!tY8=aF3}zD5?xN0|sI4&hC8+nL9_gK2%eT4]yH' );
define( 'LOGGED_IN_SALT',   'p^6mQ|sF2!yT5(uB1?mK4@tZ7*uI9=aE3}xD8&vN0_oL4$rC8+nG7~eP2%bW5]rY' );
define( 'NONCE_SALT',       'r!2zL$gH7*kN1~mP6@pB4(uT8?vI3=aZ5}xE9^rO0|sD4&hK8+oC9_tE2%eY5]yM' );

/**
 * WordPress database table prefix.
 */
$table_prefix = 'wp_';

/**
 * Developer & Architecture Environment Flags
 */
define( 'WP_ENVIRONMENT_TYPE', 'development' );
define( 'WP_DEBUG', true );
define( 'WP_DEBUG_LOG', true );
define( 'WP_DEBUG_DISPLAY', false );
define( 'SCRIPT_DEBUG', true );

/**
 * WooCommerce Specific Configuration
 */
define( 'WP_MEMORY_LIMIT', '256M' );
define( 'WP_MAX_MEMORY_LIMIT', '512M' );
define( 'WC_DISABLE_TRANSIENT_CLEANUP', false );

/**
 * Active Theme and Features Configuration
 */
define( 'WP_DEFAULT_THEME', 'bones' );
define( 'AUTOMATIC_UPDATER_DISABLED', true );
define( 'DISALLOW_FILE_EDIT', true );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
