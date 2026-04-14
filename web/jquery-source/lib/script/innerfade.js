$(document).ready(function() { // doc ready, function start
  $('#ufc ul').innerfade({ // on id of ufc ul call on .innerfade action
    animationtype: 'slide', // the animation type called on is slide
    speed: 'normal', // the speed of sliding is a normal pace
    timeout: 3000, // time between slides is set at 3000 milliseconds
    type: 'random' // the type of rotation will be random
  }); // end innerfade
}); // end document