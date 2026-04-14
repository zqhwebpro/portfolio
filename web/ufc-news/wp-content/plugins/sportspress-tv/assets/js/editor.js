/* global tinymce */
( function () {
	tinymce.PluginManager.add( 'sportspress_tv_button', function( editor, url ) {
		var ed = tinymce.activeEditor;
		editor.addButton( 'sportspress_tv_button', {
			title: ed.getLang( 'strings.insert' ),
			text: false,
			icon: 'sportspress-tv',
			onclick: function() {
				// triggers the thickbox
				var width = jQuery(window).width(), H = jQuery(window).height(), W = ( 720 < width ) ? 720 : width;
				W = W - 80;
				H = H - 84;
				tb_show( ed.getLang( 'strings.insert' ), 'admin-ajax.php?action=sportspress_tv&width=' + W + '&height=' + H );
			}
		});
	});
})();
