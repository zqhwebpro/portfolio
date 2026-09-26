<?php
/**
 * The Plugin API: Action and Filter Hooks implementation.
 *
 * @package WordPress
 * @subpackage Plugin
 */

global $wp_filter, $wp_actions;

if ( ! isset( $wp_filter ) ) {
	$wp_filter = array();
}

if ( ! isset( $wp_actions ) ) {
	$wp_actions = array();
}

function add_filter( $hook_name, $callback, $priority = 10, $accepted_args = 1 ) {
	global $wp_filter;
	if ( ! isset( $wp_filter[ $hook_name ] ) ) {
		$wp_filter[ $hook_name ] = array();
	}
	if ( ! isset( $wp_filter[ $hook_name ][ $priority ] ) ) {
		$wp_filter[ $hook_name ][ $priority ] = array();
	}
	$wp_filter[ $hook_name ][ $priority ][] = array(
		'function'      => $callback,
		'accepted_args' => $accepted_args,
	);
	return true;
}

function add_action( $hook_name, $callback, $priority = 10, $accepted_args = 1 ) {
	return add_filter( $hook_name, $callback, $priority, $accepted_args );
}

function apply_filters( $hook_name, $value, ...$args ) {
	global $wp_filter;
	if ( ! isset( $wp_filter[ $hook_name ] ) ) {
		return $value;
	}

	ksort( $wp_filter[ $hook_name ] );

	foreach ( $wp_filter[ $hook_name ] as $priority => $callbacks ) {
		foreach ( $callbacks as $cb ) {
			$function = $cb['function'];
			$call_args = array_slice( array_merge( array( $value ), $args ), 0, $cb['accepted_args'] );
			$value = call_user_func_array( $function, $call_args );
		}
	}

	return $value;
}

function do_action( $hook_name, ...$args ) {
	global $wp_filter, $wp_actions;

	if ( ! isset( $wp_actions[ $hook_name ] ) ) {
		$wp_actions[ $hook_name ] = 1;
	} else {
		$wp_actions[ $hook_name ]++;
	}

	if ( ! isset( $wp_filter[ $hook_name ] ) ) {
		return;
	}

	ksort( $wp_filter[ $hook_name ] );

	foreach ( $wp_filter[ $hook_name ] as $priority => $callbacks ) {
		foreach ( $callbacks as $cb ) {
			$function = $cb['function'];
			$call_args = array_slice( $args, 0, $cb['accepted_args'] );
			call_user_func_array( $function, $call_args );
		}
	}
}

function remove_filter( $hook_name, $callback, $priority = 10 ) {
	global $wp_filter;
	if ( ! isset( $wp_filter[ $hook_name ][ $priority ] ) ) {
		return false;
	}
	foreach ( $wp_filter[ $hook_name ][ $priority ] as $idx => $cb ) {
		if ( $cb['function'] === $callback ) {
			unset( $wp_filter[ $hook_name ][ $priority ][ $idx ] );
			return true;
		}
	}
	return false;
}

function remove_action( $hook_name, $callback, $priority = 10 ) {
	return remove_filter( $hook_name, $callback, $priority );
}

function has_action( $hook_name, $callback = false ) {
	global $wp_filter;
	if ( ! isset( $wp_filter[ $hook_name ] ) ) {
		return false;
	}
	if ( false === $callback ) {
		return count( $wp_filter[ $hook_name ] ) > 0;
	}
	foreach ( $wp_filter[ $hook_name ] as $priority => $callbacks ) {
		foreach ( $callbacks as $cb ) {
			if ( $cb['function'] === $callback ) {
				return $priority;
			}
		}
	}
	return false;
}
