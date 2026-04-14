$(document).ready(function(){ // start the function
$( '#menu401 > li > ul' ) // on menu li ul properties to function
	.hide() // begin with inner information hidden
	.click(function( e ){ // on click
		e.stopPropagation(); // open menu
	}); // end function on menu li ul property
	
  $('#menu401 > li').toggle(function(){  // begin menu li toggle function
	  $(this) // on this happening
      .css('background-position', 'left -20px') // css bg-pos will look like this
      .find('ul').slideDown(); // find ul so that we can slide it down
  }, function(){ // close primary function, begin secondary function
  	$( this ) // on this happening
      .css('background-position', 'left top') // css bg-pos will now look as so
      .find('ul').slideUp(); // find ul so that we can slide it back up
  }); // end function on menu li
}); //end full function
