$(document).ready(function(){ // document ready
  $('#myform').bind('submit', function(event) { // function start myform to bind a submit to event
    $('[type=text]').each(function() { // start type=text for each property
      if(!$(this).val().length) {	// this occurs 1st of value length default check
	    event.preventDefault(); // the event to occur we prevent the form submission with a default
        $(this).css('border', '2px solid red'); // css style border red around form input boxes
      } // end this 2 css
    }); // end this 1 length
  }); // end .bind function
}); // end the document

