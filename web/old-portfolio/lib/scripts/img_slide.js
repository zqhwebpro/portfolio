$(document).ready(function(){ 
  slideShow(); 
}); 

function slideShow() { 
  var current = $('#img_slider .show'); 
  var next = current.next().length ? current.next() : current.siblings().first();
  
  current.hide().removeClass('show'); 
  next.fadeIn().addClass('show');
  
  setTimeout(slideShow, 3000); 
} 