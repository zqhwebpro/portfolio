<?php
/**
 * SportsPress TV Widget class.
 *
 * @class 		SportsPress_TV_Widget
 * @version     0.9
 * @package 	SportsPress_TV/Classes
 * @author 		ThemeBoy
 * @category 	Widgets
 */
class SportsPress_TV_Widget extends WP_Widget {

	function __construct() {
		$widget_ops = array( 'classname' => 'widget_sportspress_tv', 'description' => __( 'SportsPress TV widget.', 'sportspress_tv' ) );
		parent::__construct( 'sportspress_tv', __( 'SportsPress TV', 'sportspress-tv' ), $widget_ops );
	}

	function widget( $args, $instance ) {
		$sportspress_tv = SportsPress_TV::instance();

		extract( $args );
		$title = apply_filters( 'widget_title', empty( $instance['title'] ) ? '' : $instance['title'], $instance, $this->id_base );

		$uuid = empty( $instance['uuid'] ) ? null : $instance['uuid'];
		$behavior = empty( $instance['behavior'] ) ? null : $instance['behavior'];

		echo $before_widget;

		if ( $title )
			echo $before_title . $title . $after_title;

		echo $sportspress_tv->iframe( $uuid, 'fullwidth', $behavior );

		echo $after_widget;
	}

	function update( $new_instance, $old_instance ) {
		$instance = $old_instance;
		$instance['title'] = strip_tags($new_instance['title']);
		$instance['region'] = strip_tags($new_instance['region']);
		$instance['uuid'] = strip_tags($new_instance['uuid']);
		$instance['behavior'] = strip_tags($new_instance['behavior']);
		update_option( 'sportspress_tv_default_region', $instance['region'] );
		update_option( 'sportspress_tv_default_uuid', $instance['uuid'] );
		return $instance;
	}

	function form( $instance ) {
		$sportspress_tv = SportsPress_TV::instance();
		$instance = wp_parse_args( (array) $instance, array( 'title' => '', 'region' => $sportspress_tv->defaults['region'], 'uuid' => $sportspress_tv->defaults['uuid'], 'behavior' => $sportspress_tv->defaults['behavior'] ) );
		$title = strip_tags($instance['title']);
		$region = strip_tags($instance['region']);
		$uuid = strip_tags($instance['uuid']);
		$behavior = strip_tags($instance['behavior']);
		?>
		<div class="sportspress-tv-settings">
			<p><label for="<?php echo $this->get_field_id('title'); ?>"><?php _e( 'Title:', 'sportspress-tv' ); ?></label>
			<input class="widefat" id="<?php echo $this->get_field_id('title'); ?>" name="<?php echo $this->get_field_name('title'); ?>" type="text" value="<?php echo esc_attr($title); ?>" /></p>

			<p><label for="<?php echo $this->get_field_id('region'); ?>"><?php _e( 'Region:', 'sportspress-tv' ); ?></label>
			<select class="sportspress-tv-region widefat" id="<?php echo $this->get_field_id('region'); ?>" name="<?php echo $this->get_field_name('region'); ?>">
				<?php foreach ( $sportspress_tv->regions as $code => $name ) { ?>
					<option value="<?php echo $code; ?>" <?php selected( $code == $region ); ?>><?php echo $name; ?></option>
				<?php } ?>
			</select>
			</p>

			<p><label for="<?php echo $this->get_field_id('uuid'); ?>"><?php _e( 'Default Channel:', 'sportspress-tv' ); ?></label>
			<?php foreach ( $sportspress_tv->channels as $channel_region => $categories ) { ?>
				<select class="sportspress-tv-uuid widefat" id="<?php echo $this->get_field_id('uuid'); ?>" name="<?php echo $this->get_field_name('uuid'); ?>" data-region="<?php echo $channel_region; ?>"<?php if ( $region !== $channel_region ) { ?> style="display: none;" disabled="disabled"<?php } ?>>
				 	<?php foreach ( $categories as $category => $channels ) { ?>
						<optgroup label="<?php echo $category; ?>">
							<?php foreach ( $channels as $name => $value ) { ?>
								<option value="<?php echo $value; ?>" <?php selected( $value == $uuid ); ?>><?php echo $name; ?></option>
							<?php } ?>
						</optgroup>
					<?php } ?>
				</select>
			<?php } ?>
			<p class="description"><?php _e( 'Territory restrictions apply: some channels may not be available for streaming in your area.', 'sportspress-tv' ); ?></p>
			</p>

			<p><label for="<?php echo $this->get_field_id('behavior'); ?>"><?php _e( 'Behavior:', 'sportspress-tv' ); ?></label>
			<select class="widefat" id="<?php echo $this->get_field_id('behavior'); ?>" name="<?php echo $this->get_field_name('behavior'); ?>">
				<?php foreach ( $sportspress_tv->behaviors as $value => $name ) { ?>
					<option value="<?php echo $value; ?>" <?php selected( $value == $behavior ); ?>><?php echo $name; ?></option>
				<?php } ?>
			</select>
			</p>
		</div>
		<?php
	}
}

register_widget( 'SportsPress_TV_Widget' );
