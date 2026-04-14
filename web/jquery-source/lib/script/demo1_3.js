$(document).ready(function(){ //ready function
  $('#demo3').animate(	//ready #demo3 and animate the next lines
    { //start
      height: '+=150px', //animate a height of + 150px
    }, //finish
    { //start
      duration: 'slow', //the duration time element is slow
      easing: 'easeInCubic', //and easing function is called upon and it eases in based off algorythms more at eastings.net
      complete: function() {alert('Want a PS Vita? Win a PS Vita!');}, //an alert pop-ups
      queue: false //a queue is false it will not play repeatedly
    } //closing statements
  );
});
