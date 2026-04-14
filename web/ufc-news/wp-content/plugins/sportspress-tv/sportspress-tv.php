<?php
/**
 * @package SportsPress_TV
 * @version 0.9.6
 */
/*
Plugin Name: SportsPress TV
Plugin URI: http://wordpress.org/plugins/sportspress-tv/
Description: Embed premium news and match highlights using ePlayer, the leading video on demand service for professional sports content.
Author: ThemeBoy
Version: 0.9.6
Author URI: http://themeboy.com/
*/
if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

if ( ! class_exists( 'SportsPress_TV' ) ) :

/**
 * Main SportsPress_TV Class
 *
 * @class SportsPress_TV
 * @version	0.9.6
 */
class SportsPress_TV {

	/**
	 * @var string
	 */
	public $version = '0.9.6';

	/**
	 * @var SportsPress_TV The single instance of the class
	 * @since 0.9
	 */
	protected static $_instance = null;

	/**
	 * @var array
	 */
	var $defaults = array();

	/**
	 * @var array
	 */
	var $presets = array();

	/**
	 * @var array
	 */
	var $sizes = array();

	/**
	 * @var array
	 */
	var $channels = array();

	/**
	 * @var array
	 */
	var $behaviors = array();

	/**
	 * Main SportsPress_TV Instance
	 *
	 * Ensures only one instance of SportsPress_TV is loaded or can be loaded.
	 *
	 * @since 0.9
	 * @static
	 * @see SportsPress_TV()
	 * @return SportsPress_TV - Main instance
	 */
	public static function instance() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}

	/**
	 * Cloning is forbidden.
	 *
	 * @since 0.9
	 */
	public function __clone() {
		_doing_it_wrong( __FUNCTION__, __( 'Cheatin&#8217; huh?', 'sportspress-tv' ), '0.7' );
	}

	/**
	 * Unserializing instances of this class is forbidden.
	 *
	 * @since 0.9
	 */
	public function __wakeup() {
		_doing_it_wrong( __FUNCTION__, __( 'Cheatin&#8217; huh?', 'sportspress-tv' ), '0.7' );
	}

	/**
	 * SportsPress_TV Constructor.
	 * @access public
	 */
	public function __construct() {

		// Define constants
		$this->define_constants();

		// Get player options
		$this->get_defaults();
		$this->get_presets();
		$this->get_sizes();
		$this->get_regions();
		$this->get_channels();
		$this->get_behaviors();

		// Init
		add_action( 'init', array( $this, 'init' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'scripts' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'admin_styles' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'admin_scripts' ) );

		// Settings
		add_action( 'admin_menu', array( $this, 'admin_menu' ) );

		// Widget
		add_action( 'widgets_init', array( $this, 'include_widget' ) );

		// Shortcode
		add_action( 'admin_head', array( $this, 'add_shortcode_button' ) );
		add_filter( 'tiny_mce_version', array( $this, 'refresh_mce' ) );
		add_filter( 'mce_external_languages', array( $this, 'add_tinymce_lang' ), 10, 1 );
		add_action( 'wp_ajax_sportspress_tv', array( $this, 'ajax' ) );
		add_action( 'wp_ajax_sportspress_tv_save_default_settings', array( $this, 'save_default_settings' ), 1 );

	}

	/**
	 * Define constants
	*/
	private function define_constants() {
		if ( !defined( 'SPORTSPRESS_TV_VERSION' ) )
			define( 'SPORTSPRESS_TV_VERSION', '0.9.2' );

		if ( !defined( 'SPORTSPRESS_TV_URL' ) )
			define( 'SPORTSPRESS_TV_URL', trailingslashit( plugin_dir_url( __FILE__ ) ) );

		if ( !defined( 'SPORTSPRESS_TV_DIR' ) )
			define( 'SPORTSPRESS_TV_DIR', trailingslashit( plugin_dir_path( __FILE__ ) ) );
	}

	/**
	 * Get player defaults
	 */
	private function get_defaults() {

		// Get default region
		$region = get_option( 'sportspress_tv_default_region', false );
		if ( ! $region ) {
			$locale = get_locale();
			switch ( $locale ) {
				case 'fr':
				case 'fr_FR':
					$region = 'fr';
					break;
				case 'de':
				case 'de_DE':
					$region = 'de';
					break;
				case 'es':
				case 'es_ES':
					$region = 'de';
					break;
				case 'en_GB':
					$region = 'gb';
					break;
				default:
					$region = 'us';
			}
		}

		$this->defaults = array(
			'region' => $region,
			'uuid' => get_option( 'sportspress_tv_default_uuid', '1oqnoh7xbgu9915cydfkasumnp' ),
			'size' => get_option( 'sportspress_tv_default_size', 'large' ),
			'behavior' => get_option( 'sportspress_tv_default_behavior', 'auto' ),
		);
	}

	/**
	 * Get player presets
	 */
	private function get_presets() {
		$this->presets = array(
			'small' => __( 'Small', 'sportspress-tv' ),
			'medium' => __( 'Medium', 'sportspress-tv' ),
			'large' => __( 'Large', 'sportspress-tv' ),
			'fullwidth' => __( 'Full Width', 'sportspress-tv' ),
		);
	}

	/**
	 * Get player sizes
	 */
	private function get_sizes() {
		$this->sizes = array(
			'small' => array( '300', '367' ),
			'medium' => array( '380', '412' ),
			'large' => array( '620', '547' ),
			'fullwidth' => array( '100%', '' ),
		);
	}

	/**
	 * Get player regions
	 */
	private function get_regions() {
		$this->regions = array(
			'de' => __( 'Germany', 'sportspress-tv' ),
			'es' => __( 'Spain', 'sportspress-tv' ),
			'fr' => __( 'France', 'sportspress-tv' ),
			'gb' => __( 'UK', 'sportspress-tv' ),
			'it' => __( 'Italy', 'sportspress-tv' ),
			'jp' => __( 'Japan', 'sportspress-tv' ),
			'pt' => __( 'Portugal', 'sportspress-tv' ),
			'us' => __( 'USA', 'sportspress-tv' ),
		);
		asort( $this->regions );
	}

	/**
	 * Get player channels
	 */
	private function get_channels() {
		foreach( $this->regions as $id => $name ) {
			$json_data = file_get_contents( SPORTSPRESS_TV_DIR . 'channels/' . $id . '.json' );
			$this->channels[$id] = (array) json_decode( $json_data, true );
		}
	}

	/**
	 * Get player behavior settings
	 */
	private function get_behaviors() {
		$this->behaviors = array(
			'auto' => __( 'Autoplay', 'sportspress-tv' ),
			'scroll' => __( 'Scroll Initiated Play', 'sportspress-tv' ),
		);
	}

	/**
	 * Init plugin when WordPress Initialises.
	 */
	public function init() {
		// Set up localisation
		$this->load_plugin_textdomain();

		// Register shortcode
		$this->register_shortcode();
	}

	/**
	 * Load Localisation files.
	 *
	 * Note: the first-loaded translation file overrides any following ones if the same translation is present
	 */
	public function load_plugin_textdomain() {
		$locale = apply_filters( 'plugin_locale', get_locale(), 'sportspress-tv' );
		
		// Global + Frontend Locale
		load_plugin_textdomain( 'sportspress-tv', false, plugin_basename( dirname( __FILE__ ) . "/languages" ) );
	}

	/**
	 * Register shortcode
	 */
	public function register_shortcode() {
		add_shortcode( 'sportspress_tv', array( $this, 'shortcode' ) );
	}

	/**
	 * Output the SportsPress TV shortcode.
	 *
	 * @param array $atts
	 */
	public function shortcode( $atts ) {
		$atts = shortcode_atts( $this->defaults, $atts, 'sportspress-tv' );
		return self::iframe( $atts['uuid'], $atts['size'] );
	}

	/**
	 * iFrame embed code
	 */
	public function iframe( $uuid = null, $size = null, $behavior = null ) {
		if ( ! $uuid ) $uuid = $this->defaults['uuid'];
		if ( ! $size || ! array_key_exists( $size, $this->sizes ) ) $size = $this->defaults['size'];
		if ( ! $behavior ) $behavior = $this->defaults['behavior'];
		$width = $this->sizes[ $size ][0];
		$height = $this->sizes[ $size ][1];
		ob_start();
		?>
		<p class="sportspress-tv-wrapper">
			<iframe class="sportspress-tv-iframe" style="background:#000" width="<?php echo $width; ?>" height="<?php echo $height; ?>" <?php if ( 'scroll' == $behavior ) { ?>data-<?php } ?>src="http://sportspress.tv/embed/<?php echo $uuid; ?>" frameborder="0" allowfullscreen></iframe>
		</p>
		<?php
		return ob_get_clean();
	}

	/**
	 * Frontend Scripts.
	 */
	public function scripts() {
		wp_enqueue_script( 'jquery-waypoints', SPORTSPRESS_TV_URL . 'assets/js/waypoints.min.js', array( 'jquery' ), '2.0.5', true );
		wp_enqueue_script( 'sportspress-tv', SPORTSPRESS_TV_URL . 'assets/js/sportspress-tv.js', array( 'jquery', 'jquery-waypoints' ), SPORTSPRESS_TV_VERSION, true );
	}

	/**
	 * Enqueue styles
	 */
	public function admin_styles() {
		wp_enqueue_style( 'sportspress-tv-admin', SPORTSPRESS_TV_URL . 'assets/css/sportspress-tv-admin.css', array(), SPORTSPRESS_TV_VERSION );
	}


	/**
	 * Include widget
	 */
	public function include_widget() {
		include_once( 'includes/class-sportspress-tv-widget.php' );
	}

	/**
	 * Add a button for shortcodes to the WP editor.
	 */
	public function add_shortcode_button() {
		if ( ! current_user_can( 'edit_posts' ) && ! current_user_can( 'edit_pages' ) ) {
			return;
		}

		if ( 'true' == get_user_option( 'rich_editing' ) ) {
			add_filter( 'mce_external_plugins', array( $this, 'add_shortcode_tinymce_plugin' ) );
			add_filter( 'mce_buttons', array( $this, 'register_shortcode_button' ) );
		}
	}

	/**
	 * add_tinymce_lang function.
	 *
	 * @param array $arr
	 * @return array
	 */
	public function add_tinymce_lang( $arr ) {
	    $arr['sportspress_tv_button'] = SPORTSPRESS_TV_DIR . 'assets/js/editor-lang.php';
	    return $arr;
	}

	/**
	 * Register the shortcode button.
	 *
	 * @param array $buttons
	 * @return array
	 */
	public function register_shortcode_button( $buttons ) {
		array_push( $buttons, '|', 'sportspress_tv_button' );
		return $buttons;
	}

	/**
	 * Add the shortcode button to TinyMCE
	 *
	 * @param array $plugin_array
	 * @return array
	 */
	public function add_shortcode_tinymce_plugin( $plugin_array ) {
		$plugin_array['sportspress_tv_button'] = SPORTSPRESS_TV_URL . 'assets/js/editor.js';
		return $plugin_array;
	}

	/**
	 * Force TinyMCE to refresh.
	 *
	 * @param int $ver
	 * @return int
	 */
	public function refresh_mce( $ver ) {
		$ver += 3;
		return $ver;
	}

	/**
	 * Ajax options window.
	 */
	public function ajax() {
		?>
		<div class="wrap sportspress-tv-thickbox-content" id="sportspress-tv-thickbox">
			<form>
				<table class="sportspress-tv-settings form-table">
					<tbody>
						<tr>
							<th scope="row"><?php _e( 'Region:', 'sportspress-tv' ); ?></th>
							<td>
								<select name="region" class="sportspress-tv-region">
									<?php foreach ( $this->regions as $code => $name ) { ?>
										<option value="<?php echo $code; ?>" <?php selected( $code == $this->defaults['region'] ); ?>><?php echo $name; ?></option>
									<?php } ?>
								</select>
							</td>
						</tr>
						<tr>
							<th scope="row"><?php _e( 'Default Channel:', 'sportspress-tv' ); ?></th>
							<td>
								<?php foreach ( $this->channels as $channel_region => $categories ) { ?>
									<select name="uuid" class="sportspress-tv-uuid" data-region="<?php echo $channel_region; ?>"<?php if ( $this->defaults['region'] !== $channel_region ) { ?> style="display: none;" disabled="disabled"<?php } ?>>
									 	<?php foreach ( $categories as $category => $channels ) { ?>
											<optgroup label="<?php echo $category; ?>">
												<?php foreach ( $channels as $name => $value ) { ?>
													<option value="<?php echo $value; ?>" <?php selected( $value == $this->defaults['uuid'] ); ?>><?php echo $name; ?></option>
												<?php } ?>
											</optgroup>
										<?php } ?>
									</select>
								<?php } ?>
								<p class="description"><?php _e( 'Territory restrictions apply: some channels may not be available for streaming in your area.', 'sportspress-tv' ); ?></p>
							</td>
						</tr>
						<tr>
							<th scope="row"><?php _e( 'Player Size:', 'sportspress-tv' ); ?></th>
							<td>
								<select name="size">
									<?php foreach ( $this->presets as $size => $name ) { ?>
										<option value="<?php echo $size; ?>" data-width="<?php echo $this->sizes[ $size ][0]; ?>" data-height="<?php echo $this->sizes[ $size ][1]; ?>" <?php selected( $size == $this->defaults['size'] ); ?>><?php echo $name; ?></option>
									<?php } ?>
								</select>
							</td>
						</tr>
						<tr>
							<th scope="row"><?php _e( 'Player Preview:', 'sportspress-tv' ); ?></th>
							<td>
								<div class="sportspress-tv-preview"><?php $this->iframe(); ?></div>
							</td>
						</tr>
					</tbody>
				</table>
				<p class="submit">
					<input type="button" class="button-primary" value="<?php _e( 'Insert SportsPress TV', 'sportspress-tv' ); ?>" onclick="insert_sportspress_tv();" />
					<a class="button-secondary" onclick="tb_remove();" title="<?php _e( 'Cancel', 'sportspress-tv' ); ?>"><?php _e( 'Cancel', 'sportspress-tv' ); ?></a>
				</p>
			</form>
		</div>
		<?php
		$this->ajax_scripts();
		die();
	}

	/**
	 * Ajax scripts.
	 */
	public function ajax_scripts() {
		?>
		<script type="text/javascript">
		jQuery(document).ready(function($){
			// Chosen select
			$('.sportspress-tv-thickbox-content select').change( function() {
				$size = $('.sportspress-tv-thickbox-content [name=size]').find('option:selected');
				width = $size.data('width');
				height = $size.data('height');
				uuid = $('.sportspress-tv-thickbox-content [name=uuid]:enabled').val();
				$('.sportspress-tv-thickbox-content iframe').width(width).height(height).attr('src', 'http://sportspress.tv/embed/'+uuid );
				$.post( ajaxurl, {
					action:         "sportspress_tv_save_default_settings",
					uuid: 			uuid,
					size: 			$size.val(),
					nonce:          $("#sportspress-tv-config-nonce").val()
				});
			});
			$('.sportspress-tv-thickbox-content select').trigger('change');
		});

		function insert_sportspress_tv( type ) {
			var $div = jQuery('.sportspress-tv-thickbox-content');

			// Initialize shortcode arguments
			var args = {};

			// Add UUID if available and not 0
			uuid = $div.find('[name=uuid]:enabled').val();
			if ( uuid != 0 ) args.uuid = uuid;

			// Add size
			args.size = $div.find('[name=size]').val();

			// Generate the shortcode
			var shortcode = '[sportspress_tv';
			for ( var key in args ) {
				if ( args.hasOwnProperty( key ) ) {
					shortcode += ' ' + key + '="' + args[key] + '"';
				}
			}
			shortcode += ']';

			// Send the shortcode to the editor
			window.send_to_editor( shortcode );
		}
		</script>
		<?php
	}

	/**
	 * Admin scripts.
	 */
	public function admin_scripts() {
		wp_enqueue_script( 'sportspress-tv-admin', SPORTSPRESS_TV_URL . 'assets/js/sportspress-tv-admin.js', array( 'jquery' ), SPORTSPRESS_TV_VERSION, true );
	}

	/**
	 * Add plugin settings to menu.
	 */
	public function admin_menu() {
		add_options_page( __( 'SportsPress TV Settings', 'sportspress-tv' ), __( 'SportsPress TV', 'sportspress-tv' ), 'manage_options', 'sportspress-tv', array( $this, 'settings_page' ) );
	}

	/**
	 * Plugin settings page.
	 */
	public function settings_page() {
		if ( ! empty( $_POST ) ) {
			$this->save_settings();
			$this->get_defaults();
		}
		?>
		<div class="wrap sportspress-tv">
			<h2><?php _e( 'SportsPress TV Settings', 'sportspress-tv' ); ?></h2>
			<form method="post" id="mainform" enctype="multipart/form-data">
				<?php wp_nonce_field( 'sportspress-tv-settings' ); ?>
				<table class="form-table sportspress-tv-settings">
					<tbody>
						<tr>
							<th scope="row">
								<label for="region"><?php _e( 'Region', 'sportspress-tv' ); ?></label>
							</th>
							<td>
								<select name="region" class="sportspress-tv-region">
									<?php foreach ( $this->regions as $code => $name ) { ?>
										<option value="<?php echo $code; ?>" <?php selected( $code == $this->defaults['region'] ); ?>><?php echo $name; ?></option>
									<?php } ?>
								</select>
							</td>
						</tr>
						<tr>
							<th scope="row">
								<label for="uuid"><?php _e( 'Default Channel', 'sportspress-tv' ); ?></label>
							</th>
							<td>
								<?php foreach ( $this->channels as $channel_region => $categories ) { ?>
									<select name="uuid" class="sportspress-tv-uuid" data-region="<?php echo $channel_region; ?>"<?php if ( $this->defaults['region'] !== $channel_region ) { ?> style="display: none;" disabled="disabled"<?php } ?>>
									 	<?php foreach ( $categories as $category => $channels ) { ?>
											<optgroup label="<?php echo $category; ?>">
												<?php foreach ( $channels as $name => $value ) { ?>
													<option value="<?php echo $value; ?>" <?php selected( $value == $this->defaults['uuid'] ); ?>><?php echo $name; ?></option>
												<?php } ?>
											</optgroup>
										<?php } ?>
									</select>
								<?php } ?>
								<p class="description"><?php _e( 'Territory restrictions apply: some channels may not be available for streaming in your area.', 'sportspress-tv' ); ?></p>
							</td>
						</tr>
						<tr>
							<th scope="row">
								<label for="size"><?php _e( 'Player Size', 'sportspress-tv' ); ?></label>
							</th>
							<td>
								<select name="size">
									<?php foreach ( $this->presets as $size => $name ) { ?>
										<option value="<?php echo $size; ?>" data-width="<?php echo $this->sizes[ $size ][0]; ?>" data-height="<?php echo $this->sizes[ $size ][1]; ?>" <?php selected( $size == $this->defaults['size'] ); ?>><?php echo $name; ?></option>
									<?php } ?>
								</select>
							</td>
						</tr>
						<tr>
							<th scope="row">
								<?php _e( 'Behavior', 'sportspress-tv' ); ?>
							</th>
							<td>
								<fieldset class="sportspress-tv-settings-behavior">
									<legend class="screen-reader-text"><span><?php _e( 'Behavior', 'sportspress-tv' ); ?></span></legend>
									<?php foreach ( $this->behaviors as $value => $name ) { ?>
										<label>
											<input name="behavior" type="radio" value="<?php echo $value; ?>" <?php checked( $value == $this->defaults['behavior'] ); ?>>
											<?php echo $name; ?>
										</label>
									<?php } ?>
								</fieldset>
							</td>
						</tr>
					</tbody>
				</table>
				<p class="submit">
					<input type="submit" name="submit" id="submit" class="button button-primary" value="<?php _e( 'Save Changes', 'sportspress-tv' ); ?>">
				</p>
			</form>
		</div>
		<?php
	}

	/**
	 * Save plugin settings.
	 */
	public function save_settings() {
		if ( empty( $_POST['_wpnonce'] ) || ! wp_verify_nonce( $_POST['_wpnonce'], 'sportspress-tv-settings' ) )
			die( __( 'Action failed. Please refresh the page and retry.', 'sportspress-tv' ) );

		if ( isset( $_POST['region'] ) )
			update_option( 'sportspress_tv_default_region', $_POST['region'] );

		if ( isset( $_POST['uuid'] ) )
			update_option( 'sportspress_tv_default_uuid', $_POST['uuid'] );

		if ( isset( $_POST['size'] ) )
			update_option( 'sportspress_tv_default_size', $_POST['size'] );

		if ( isset( $_POST['behavior'] ) )
			update_option( 'sportspress_tv_default_behavior', $_POST['behavior'] );
	}
}

endif;

return SportsPress_TV::instance();
