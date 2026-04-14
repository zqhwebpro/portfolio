$(document).ready(function(){ // doc ready
  slideShow(); // intiate slideshow function call out
}); // end doc ready

function slideShow() { // call back up slideShow(); function and begin
  var current = $('#pups .show'); // check variables of #pups div id and .show class
  var next = current.next().length ? current.next() : current.siblings().first(); // run variable sequence from current to next
  
  current.hide().removeClass('show'); // remove .show class from one image
  next.fadeIn().addClass('show'); // fade in next image with .show class
  
  setTimeout(slideShow, 4000); // timer of slideshow set to 4000 milliseconds
} // end function slideShow