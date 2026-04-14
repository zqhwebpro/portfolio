<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'zqhwebpr_rockysbbq');

/** MySQL database username */
define('DB_USER', 'zqhwebpr_rockysb');

/** MySQL database password */
define('DB_PASSWORD', 'stUbent!3');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'nrR>GvK8%Q3{8eBa^v/m>r>y[0_4uIdIh5(+Qk.wn frtAtBW@(GD(H/jfu1$t {');
define('SECURE_AUTH_KEY',  'Y:>(+$nz6_RkBw7,9KDd=cw7^A$Z.>&B)1n!_]X0BY`g`^HENe_ %aXpfz{vMUNP');
define('LOGGED_IN_KEY',    'Yp.9Bj-Gg_blV%kC9S~)Wwu@GN~n?OJ0sG`RG|6~LdA_w1=>HPFW/[7?>LK)d98V');
define('NONCE_KEY',        'lwjNyFU.WmkXdaYZ-+0K-I^GK%{%GK0agZuP<<Kr+f5vXSwQR$I!WM*hiKMJ:Mq}');
define('AUTH_SALT',        'Q%Yfs$HY-o+Uq1`b)FIg5I3$(lS|HB9P1Rk1SUShxS0&6c xr@X_jn)GWq,DxPI9');
define('SECURE_AUTH_SALT', 'cgO2KqS_mO>[i/d_S^Ue8nA,/9c5fBTi]q%C!F%zfG{k.<,DnSs(5n<%drqXK_ j');
define('LOGGED_IN_SALT',   '.53|9cdZeA*/!_!LNiba]%x2+eK`%7 t!qM?Ow&Kbvf/J!{Ab!_Lzu%8kq{)IiCR');
define('NONCE_SALT',       'gc;*>GWjV`Oy}7X8*_T]mwmM}SP;?%e5WhDl,=<?4,|-qSm$C~Hz=1r;=8)~v7N8');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
