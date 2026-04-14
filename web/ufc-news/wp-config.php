<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, and ABSPATH. You can find more information by visiting
 * {@link http://codex.wordpress.org/Editing_wp-config.php Editing wp-config.php}
 * Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'zqhwebpr_ufc-news');

/** MySQL database username */
define('DB_USER', 'zqhwebpr_ufc-zqh');

/** MySQL database password */
define('DB_PASSWORD', 'stUbent!13');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

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
define('AUTH_KEY',         'B-`Wd1~MGB,G$})H1[M8SNW;f>EvKALkWkT$zZWoo#VZ[,hcJf`)zUcZ<Htt@&9d');
define('SECURE_AUTH_KEY',  'EE^j+<2|D&[A-_w!,M?eCr]]&_:{&!`&,#&`$Z*;-?X@$umAz`)5RSNdm[n#{hRV');
define('LOGGED_IN_KEY',    'zJGjD/mRL|q0tR$uV#2R%K:B;RMI8~lwDuKi15@i_X8sp[h7IE:T^m}%qRzS9!YF');
define('NONCE_KEY',        '~gY`~[2-RhK]Za5F2b|(|cuu-4!)Zc.oG8KOh+u~bY3E0HVb>+d<5.YN?S_+_WQ ');
define('AUTH_SALT',        '/z)6Tia_{CM2CM*Q;N^A`bE(*ePtERu1`bPpk%X5DpPaXD+pK Cj]q|FJ10Twb+/');
define('SECURE_AUTH_SALT', 'n)F-BN>nZY+Fl!IJh-wOJ)Q]xT+;+C[bO4|(B|F7I}x>w@4W=_(2^lrsW)FIXzF=');
define('LOGGED_IN_SALT',   '}hqN.Z@,<_&+i:h ],$(]|ZVlvaLCtGBv.A>@gQ}jWMrRn##ax7+&:]37 g)/=UK');
define('NONCE_SALT',       '^54+iu%|=Zoc>3-I-lmu/X+n?;*ZnCf{?P?A]qz]FjRDuzE]oNCtf D`3 fE3 mC');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
