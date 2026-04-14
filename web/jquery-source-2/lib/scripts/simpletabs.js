$(document).ready(function(){ // document is ready
  $('#info p:not(:first)').hide(); // hide all p within selcted element but not first one
  
  $('#info-nav li').click(function(event) { //add click event to li's og selected element
    event.preventDefault(); // method stops the default action of element from happening
    $('#info p').hide();// hide all p tags
    $('#info-nav .current').removeClass("current"); // remove class
    $(this).addClass('current');// add class of 'current'
    
    var clicked = $(this).find('a:first').attr('href'); // set var name add attr to href
    $('#info ' + clicked).fadeIn('fast'); // add animation of fadeIn fast to the var and div
  }).eq(0).addClass('current'); // selector selects an element 
}); // end the function
