/* SportsPress TV scripts */
( function ($) {
	$( '.sportspress-tv-iframe' ).waypoint( {
  		offset: '100%',
  		handler: function() {
  			if ( undefined == $( this ).attr( 'src' ) ) {
  				$( this ).attr( 'src', $( this ).data( 'src' ) );
  			}
		}
	});

	$( window ).resize( function() {
		$( '.sportspress-tv-iframe' ).each( function() {
			$( this ).height( $( this ).width() * 9 / 16 + 198 );
		} );
	} ).trigger( 'resize' );
} ) ( jQuery );
