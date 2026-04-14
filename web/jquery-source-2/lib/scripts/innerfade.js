$(document).ready(function() { // document is ready
  $('#news ul').innerfade({ // the ul of the news id will innerfade
    animationtype: 'slide', // animation is set to slide
    speed: 750, // animation time is set
    timeout: 3000, // animation timeout is set
    type: 'random' // a random property random picks through ul lists
  }); // function over
}); // document over