<?php
/**
 * Custom Admin Panel Branding & Tweaks
 *
 * @package WordPress
 * @subpackage Bones
 */

function bones_custom_admin_footer() {
	echo '<span id="footer-thankyou">Developed with <a href="http://themble.com/bones" target="_blank">Bones</a> &amp; <a href="https://woocommerce.com" target="_blank">WooCommerce</a> for <a href="https://zqhwebpro.github.io/portfolio/2026/" target="_blank">Zach Heindel (ZQH.WEBPRO)</a>.</span>';
}
add_filter( 'admin_footer_text', 'bones_custom_admin_footer' );
