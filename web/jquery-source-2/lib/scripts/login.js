$(document).ready(function(){ // document is ready
$('#login form').hide(); // hide form within #login
  $('#login a').toggle(function() { // login link toggle initiation
    $(this) // this command 1
      .addClass('active') // class of active 
      .next('form') // next on form (parent)
      .animate({'height':'show'}, { // animate height to show
        duration: 'slow', // show it slowly
        easing: 'easeOutBounce' // ease the animation with an Out Bounce
      });// end this
  }, function() { // next function in command
    $(this) // this command 2
      .removeClass('active') // class of active is removed
      .next('form') // next on form
      .slideUp(); // slide animation up instead
  }); // end this 2
  $('#login form :submit').click(function() { // start login form of hover :submit
    $(this) // this in login form :submit function
      .parent() // becomes a parent device
      .prev('a') // preview the a links
      .click(); // on the click property
  }); // end function
}); // end entire document