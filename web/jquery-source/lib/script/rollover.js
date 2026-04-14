$(document).ready(function() { // doc ready
  $('#fader').hover(function() { //on class of #fader call on a .hover function
    $(this).find('img:eq(1)').stop(true,true).fadeIn(); //find and image equal to (1) more, stop it true, true from looping, and begin a .fadeIn action
  }, function() { //finish one function and loads another this factor
    $(this).find('img:eq(1)').fadeOut(); //find that image and fade it back out
  })//end functions
});//end script