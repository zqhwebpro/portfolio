$(document).ready(function(){ // doc ready
  $('<div></div>') // call upon and create an empty div element
    .attr('id', 'overlay') // give it the attribute of id="overlay"
    .css('opacity', 0.65) // in css change the opacity property to 0.65 instead of 0
    .hover(function(){ // hover event listener function beings here
      $(this).addClass('active'); // this adds the class of active
    }, function() { // next function
      $(this).removeClass('active'); // this removes class of active
      setTimeout(function(){ // setTimeout function
        $('#overlay:not(.active)').slideUp(function(){ // when active = not it will slideUp
          $('a.dating-hover').removeClass('dating-hover'); // remove the dating-class on the hover
        }); // end setTimeout funtion
      }, 800); // slideUp speed of 800 milliseconds
    }).appendTo('body'); // appends the overlay to the body tag
    
  $('.dating a').mouseover(function(){ // on mouse over of the dating a id
    $(this).addClass('dating-hover'); // this will add class of dating-hover
    $('#overlay:not(:animated)') // function for when overlay is not animated
      .addClass('active') // add a class of active
      .html('<h1>She is into you dude!</h1><p><a href="#">Send a wink.</a>&nbsp;&nbsp;&nbsp;<a href="#">Email her now.</a></p>') // add this html to the overlay
      .slideDown(); // the overlay slidesDown here
  }); // close dating a function

}); // end doc ready