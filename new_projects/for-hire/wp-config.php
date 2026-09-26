<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'for_hire_wp' );

/** Database username */
define( 'DB_USER', 'zqhmagic' );

/** Database password */
define( 'DB_PASSWORD', 'Secure_DevPass_2026!#' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * @since 2.6.0
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
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define( 'WP_DEBUG', false );

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
