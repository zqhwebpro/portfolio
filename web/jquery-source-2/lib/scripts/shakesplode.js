$(document).ready(function() { // document is ready
  $('#ptext202') // assign a class for the selecter
    .effect('shake', {times:3}, 300) // an effect of shake is added to shake 3 times in a time frame of 300
    .hide('explode', {}, 1000);  // next a hide is assigned to explode within a time frame of 1000
}); // end
