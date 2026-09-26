<?php
/**
 * WooCommerce Product Class
 *
 * @package WooCommerce\Classes
 */

defined( 'ABSPATH' ) || exit;

class WC_Product {

	public $id;
	public $name;
	public $slug;
	public $price;
	public $regular_price;
	public $short_description;
	public $category;
	public $sku;
	public $rating;
	public $reviews;
	public $in_stock;

	public function __construct( $data = array() ) {
		foreach ( $data as $key => $val ) {
			$this->$key = $val;
		}
	}

	public function get_id() {
		return $this->id;
	}

	public function get_name() {
		return $this->name;
	}

	public function get_price() {
		return $this->price;
	}

	public function get_regular_price() {
		return $this->regular_price;
	}

	public function get_price_html() {
		if ( $this->regular_price > $this->price ) {
			return '<del>' . wc_price( $this->regular_price ) . '</del> <ins>' . wc_price( $this->price ) . '</ins>';
		}
		return wc_price( $this->price );
	}

	public function get_permalink() {
		return '?view=product&id=' . $this->id;
	}

	public function get_category() {
		return $this->category;
	}

	public function get_sku() {
		return $this->sku;
	}

	public function is_in_stock() {
		return $this->in_stock;
	}
}
