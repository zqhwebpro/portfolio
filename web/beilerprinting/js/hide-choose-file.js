jQuery(function($) {
  $('input[type="file"]').change(function() {
    if ($(this).val()) {
	    error = false;

      var filename = $(this).val();

			$(this).closest('.file-upload').find('.file-name').html(filename);

      if (error) {
        parent.addClass('error').prepend.after('<div class="alert alert-error">' + error + '</div>');
      }
    }
  });
});
