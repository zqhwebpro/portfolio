$(document).ready(function(){ // doc ready
$('#login form').hide(); // hide the login form
  $('#login a').toggle(function() { // login a has a toggle of function
    $(this) // this will run
      .addClass('active') // add a class of active to the element
      .next('form') // find next form element
      .animate({'height':'show'}, { // animate the height to show the content
        duration: 'slow', // animate it slowly
        easing: 'easeOutBounce' // animate it with an easeOutBounce
      }); // stop this function
  }, function() { // next function
    $(this) // this function if not other
      .removeClass('active') // remove the active class
      .next('form') // on next form element
      .slideUp(); // animate it with a slideUp
  }); // stop this, this
  $('#login form :submit').click(function() { // activate the submit element of the form with a click function
    $(this) // then this
      .parent() // the parent element
      .prev('a') // find immediate preceding sibling of each element with 'a'
      .click(); // click event listener
  }); // end #login form :submit
}); // end script
