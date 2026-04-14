/* SportsPress TV admin scripts */
( function ($) {
	$('body').on( 'change', '.sportspress-tv-region', function() {
		$(this).closest('.sportspress-tv-settings').find('.sportspress-tv-uuid').attr('disabled', true).hide();
		$(this).closest('.sportspress-tv-settings').find('.sportspress-tv-uuid[data-region="' + this.value + '"]').attr('disabled', false).show();
	});
})( jQuery );
