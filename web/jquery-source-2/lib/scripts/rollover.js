$(document).ready(function() { // BEGIN 'ZE FUNCTION!
  $('#fader').hover(function() { // setting hoer effect to an id
    $(this).find('img:eq(1)').stop(true,true).fadeIn(); // when first image is overed over fadeIn next.
  }, function() { // begin
    $(this).find('img:eq(1)').fadeOut(); // image fadeOut on hover
  }) // end hover
}); // END 'ZE FUNCTION!
