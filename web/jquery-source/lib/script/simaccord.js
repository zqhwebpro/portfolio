$(document).ready(function(){ // doc ready
  $('#accord ul > li ul') // id accord ul will find everying that is li ul
    .click(function(event){ // click event listener
      event.stopPropagation(); // run the stopPropogation to prevent parent element interference
    }) // end first click function
    .filter(':not(:first)') // filters everything that is not first in the sequence
    .hide(); // hide #accord ul > li ul after executing event listener
    
  $('#accord ul > li').click(function(){ // id accord ul will find everying that is li
    var selfClick = $(this).find('ul:first').is(':visible'); // set variable of selfClick that equates to a find and visible status of the first ul in it's sequence
    if(!selfClick) { // if statement instead of this
      $(this) // this will run on if
        .parent() // get parent of element in this statement 
        .find('> li ul:visible') // find the > li ul:visible
        .slideToggle(); // slide toggle the whole element
    } // end if
    
    $(this) // this is the other statement in the if field
      .find('ul:first') // find the first ul
      .stop(true, true) // stop it from what it is doing
      .slideToggle(); // run a slideToggle
  }); // end #accord ul > li
}); // end script
